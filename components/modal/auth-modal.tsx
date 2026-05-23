"use client";

import { useState } from "react";
import { LoginModal } from "./login-modal";
import { SignUpModal } from "./signup-modal";
import { useUIStore } from "@/stores/ui-store";

export function AuthModal() {
  const isOpen = useUIStore((state) => state.isAuthOpen);
  const close = useUIStore((state) => state.closeAuth);
  const [isLogin, setIsLogin] = useState(true);

  const toggleModal = () => {
    setIsLogin((prev) => !prev);
  };

  if (!isOpen) return null;

  return (
    <div className="transition-opacity duration-300 opacity-100">
      {isLogin ? (
        <LoginModal
          isOpen={isOpen}
          onClose={close}
          onSignUpClick={toggleModal}
        />
      ) : (
        <SignUpModal
          isOpen={isOpen}
          onClose={close}
          onLoginClick={toggleModal}
        />
      )}
    </div>
  );
}
