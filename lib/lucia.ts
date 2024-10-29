import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "./prisma";
import { Lucia } from "lucia";
import { cookies } from "next/headers";

const adapter = new PrismaAdapter(prisma.session, prisma.user);
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		name: "nextjs-lucia-auth-cookie",
		expires: true,
		attributes: {
			secure: process.env.NODE_ENV === "production"
		}
	}
});

export const getUser = async () => {
	const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value;
	if (!sessionId) return null;
	const { session, user } = await lucia.validateSession(sessionId)
	try {
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			(await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
		}
		
		if (session?.fresh) {
			const deletedSessions = await prisma.session.deleteMany({
				where: {
					userId: session.userId
				}
			})
			console.log(deletedSessions)
			const newSession = await lucia.createSession(session.userId, {})
			const sessionCookie = lucia.createSessionCookie(newSession.id);
			(await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
		}
		

	} catch (error) {
		return {
			success: false,
			message: (error as Error).message,
			status: 500
		}
	}

	const existingUser = await prisma.user.findUnique({
		where: {
			id: user?.id,

			
		}, select: {
			email: true,
			username: true,
			id:true
		}
	})
	return existingUser;
	
};
