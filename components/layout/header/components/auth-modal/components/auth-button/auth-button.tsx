import { AuthItem } from "./utils/auth-items";
import { Button } from "@/components/ui/button";

export default function AuthButton({ authItem }: { authItem: AuthItem }) {
  return (
    <Button
      variant={"outline"}
      size={"lg"}
      className="cursor-pointer font-normal"
      onClick={authItem.onClick}
    >
      <authItem.icon />
      Continue with {authItem.label}
    </Button>
  );
}
