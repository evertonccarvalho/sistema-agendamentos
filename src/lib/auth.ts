import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/prisma";
import { getUserById } from "@/actions/users/user";
import { getAccountByUserId } from "@/actions/users/account";
import type { Adapter } from "next-auth/adapters";
import authConfig from "@/lib/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification

      if (account?.provider !== "credentials") return true;

      if (typeof user.id !== 'string') {
        throw new Error('User ID is not defined or not a string');
      }

      const existingUser = await getUserById(user.id);


      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      return true;
    },
    // biome-ignore lint/suspicious/useAwait: <explanation>
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }



      if (session.user) {
        session.user.name = token.name ?? session.user.name;
        session.user.email = token.email ?? session.user.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;

      return token;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,

  adapter: PrismaAdapter(db) as Adapter,
  session: { strategy: "jwt" },
  ...authConfig,
});
