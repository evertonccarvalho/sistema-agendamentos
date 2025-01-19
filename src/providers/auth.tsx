import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

const AuthProvider = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <>
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  );
};

export default AuthProvider;
