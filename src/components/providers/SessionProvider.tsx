'use client';

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export function SessionProvider({
  children,
  session
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <NextAuthSessionProvider session={JSON.parse(JSON.stringify(session))}>
      {children}
    </NextAuthSessionProvider>
  );
} 