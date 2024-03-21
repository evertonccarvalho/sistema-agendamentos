import type { User } from "@prisma/client";
declare module "next-auth" {

	interface Session extends DefaultSession {
		user?: User;
	}
}
