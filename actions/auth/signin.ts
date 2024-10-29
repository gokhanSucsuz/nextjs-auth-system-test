"use server";
import { z } from "zod";
import { signinSchema } from "../../components/shared/SignInForm";
import prisma from "@/lib/prisma";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";

export const signin = async (data: z.infer<typeof signinSchema>) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				email: data.email
			}
		});
		if (!user || !user.hashedPassword) {
			return {
				success: false,
				message: "User not found or wrong password",
				status: 400
			};
		}
		const valid = await new Argon2id().verify(
			user.hashedPassword,
			data.password
		);
		if (!valid) {
			return {
				success: false,
				message: "Invalid credentials",
				status: 400
			};
		}
		const session = await lucia.createSession(user.id, {});
		const sessionCookie = await lucia.createSessionCookie(session.id);
		(await cookies()).set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);
		return {
			success: true,
			message: "User logged in successfully",
			status: 200
		};
	} catch (error) {
		return {
			success: false,
			message: "Something went wrong",
			status: 500
		};
	}
};
