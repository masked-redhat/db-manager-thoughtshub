import { AuthTokenProvider } from "@/contexts/AuthTokenContext";
import { TransferProvider } from "@/contexts/TransferCcontext";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <TransferProvider>
      <AuthTokenProvider>{children}</AuthTokenProvider>
    </TransferProvider>
  );
}
