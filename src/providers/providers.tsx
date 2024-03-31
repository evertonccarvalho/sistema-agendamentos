import type React from "react";
import ThemeProvider from "./theme-provider";
import { Toaster } from "sonner";
import AuthProvider from "./auth";
import QueryProvider from "./QueryProvide";
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
				<QueryProvider>
					<AuthProvider>{children}</AuthProvider>
				</QueryProvider>
			</ThemeProvider>
		</>
	);
}
