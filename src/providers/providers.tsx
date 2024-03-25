"use client";
import type React from "react";
import ThemeProvider from "./theme-provider";
import { Toaster } from "sonner";
import AuthProvider from "./auth";
export default function Providers({
	// session,
	children,
}: {
	// session: SessionProviderProps['session'];
	children: React.ReactNode;
}) {
	return (
		<>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<Toaster />
				<AuthProvider>{children}</AuthProvider>
			</ThemeProvider>
		</>
	);
}
