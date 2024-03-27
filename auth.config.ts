import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { getUserByEmail } from "@/services/user";
import { LoginSchema } from "@/lib/schemas";
import type { NextAuthConfig } from "next-auth"
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password
          );

          if (passwordsMatch) return user;
        }

        return null;
      },
    })

  ],
  // secret: process.env.NEXT_AUTH_SECRET,

} satisfies NextAuthConfig