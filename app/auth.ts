import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db/db";
import {
  accounts,
  authenticators,
  sessions,
  users,
  verificationTokens,
} from "@/lib/db/schemas/users";
import { eq } from "drizzle-orm";
import userSchema from "@/lib/zod/user";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
    authenticatorsTable: authenticators,
  }),
  session: {
    strategy: "jwt",
  },
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const validatedCredentials = userSchema.parse(credentials);

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, validatedCredentials.email))
          .limit(1);

        if (!user?.password) return null;

        const passwordMatch = await bcrypt.compare(
          validatedCredentials.password,
          user.password
        );

        return passwordMatch ? user : null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const userId = user?.id ?? token.id;

      if (!userId || typeof userId !== "string") return token;

      const [dbUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (!dbUser) return token;

      token.id = dbUser.id;
      token.email = dbUser.email;
      token.name = dbUser.name;
      token.image = dbUser.image;

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.image = token.image as string;
      return session;
    },
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user, account }) {
      if (account && account.provider && user.email) {
        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email))
          .limit(1);

        if (existingUser.length > 0 && existingUser[0].id !== user.id) {
          return "/";
        }
      }
      return true;
    },
  },
});
