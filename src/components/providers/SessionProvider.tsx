'use client';

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export function SessionProvider({
  children,
  session
}: {
  children: React.ReactNode;
  session: any;
}) {
  // If session is null or undefined, pass it directly
  if (!session) {
    return (
      <NextAuthSessionProvider session={null}>
        {children}
      </NextAuthSessionProvider>
    );
  }

  // Otherwise, safely serialize the session
  try {
    const safeSession = JSON.parse(JSON.stringify(session));
    return (
      <NextAuthSessionProvider session={safeSession}>
        {children}
      </NextAuthSessionProvider>
    );
  } catch (error) {
    console.error('Session serialization error:', error);
    return (
      <NextAuthSessionProvider session={null}>
        {children}
      </NextAuthSessionProvider>
    );
  }
} 