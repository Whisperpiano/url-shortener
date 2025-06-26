import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useAuthModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.has("login")) {
      setIsOpen(true);
      setShowRegister(false);
    } else if (params.has("register")) {
      setIsOpen(true);
      setShowRegister(true);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (isOpen && params.has("error")) {
      toast.error("This email is already linked to another account.", {
        duration: 5000,
        cancel: true,
      });
    }

    if (isOpen) {
      if (showRegister) {
        params.delete("login");

        const paramString = params.toString();
        const newUrl =
          window.location.pathname +
          (paramString ? `?${paramString}&register` : "?register");

        window.history.replaceState({}, "", newUrl);
      } else {
        params.delete("register");

        const paramString = params.toString();
        const newUrl =
          window.location.pathname +
          (paramString ? `?${paramString}&login` : "?login");

        window.history.replaceState({}, "", newUrl);
      }
    } else {
      params.delete("login");
      params.delete("register");
      const newUrl =
        window.location.pathname +
        (params.toString() ? `?${params.toString()}` : "");

      window.history.replaceState({}, "", newUrl);
    }
  }, [isOpen, showRegister]);

  return {
    isOpen,
    setIsOpen,
    showRegister,
    setShowRegister,
    isSubmitting,
    setIsSubmitting,
  };
};
