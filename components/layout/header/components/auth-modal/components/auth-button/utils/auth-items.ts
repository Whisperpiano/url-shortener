import { login } from "@/lib/actions/auth/login";
import { IconType } from "react-icons/lib";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export interface AuthItem {
  label: string;
  icon: IconType;
  onClick: () => void;
}

export const authItems: AuthItem[] = [
  {
    label: "Google",
    icon: FcGoogle,
    onClick: () => login("google"),
  },
  {
    label: "GitHub",
    icon: FaGithub,
    onClick: () => login("github"),
  },
];
