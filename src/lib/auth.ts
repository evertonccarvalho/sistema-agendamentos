import { PrismaAdapter } from "@auth/prisma-adapter";
import type { AuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./prisma";

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
		session({ session, user }) {
			session.user = { ...session.user, id: user.id } as {
				id: string;
				name: string;
				email: string;
			};
			return session;
		},
	},
	pages: {
		signIn: "/login",
		newUser: "/register",
		signOut: "/",
	},
	secret: process.env.NEXT_AUTH_SECRET,
};
