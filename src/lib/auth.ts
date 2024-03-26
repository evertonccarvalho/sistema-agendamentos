import { PrismaAdapter } from "@auth/prisma-adapter";
import type { AuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./prisma";
import { getUserById } from "@/services/user";

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(db) as Adapter,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "email", type: "text" },
				password: { label: "password", type: "password" },
			},
			async authorize(credentials, req) {
				const response = await fetch("http://localhost:3000/login", {
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password,
					}),
				});

				const user = await response.json();

				if (user && response.ok) {
					return user;
				}

				return null;
			},
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			// Allow OAuth without email verification
			if (account?.provider !== "credentials") return true;

			const existingUser = await getUserById(user.id);

			// Prevent sign in without email verification
			if (!existingUser?.emailVerified) return false;

			// if (existingUser.isTwoFactorEnabled) {
			//   const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

			//   if (!twoFactorConfirmation) return false;

			//   // Delete two factor confirmation for next sign in
			//   await db.twoFactorConfirmation.delete({
			//     where: { id: twoFactorConfirmation.id }
			//   });
			// }

			return true;
		},
		session({ session, user }) {
			session.user = { ...session.user, id: user.id } as {
				id: string;
				name: string | null;
				email: string | null;
				emailVerified: Date | null;
				image: string | null;
			};
			return session;
		},
	},
	pages: {
		signIn: "/login",
		newUser: "/register",
		signOut: "/",
		error: '/error'
	},
	secret: process.env.NEXT_AUTH_SECRET,
};
