import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import { db } from './prisma';
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(db) as Adapter,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Credentials",
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' }
			},
			async authorize(credentials, req) {
				const response = await fetch('http://localhost:3000/login', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password
					})
				})

				const user = await response.json()

				if (user && response.ok) {
					return user
				}

				return null
			}

		})
	],
	callbacks: {
		async session({ session, user }) {
			session.user = { ...session.user, id: user.id } as {
				id: string;
				name: string;
				email: string;
			};
			return session;
		},
	},
	pages: {
		signIn: '/login',
		newUser: '/register',
		signOut: '/',
	},
	secret: process.env.NEXT_AUTH_SECRET,
};
