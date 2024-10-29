"use server";
import prisma from "@/lib/prisma";
import { signupSchema } from "../../components/shared/SignUpForm";
import { z } from "zod";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";

export const signup = async (data: z.infer<typeof signupSchema>) => {
	try {
		const existingUser = await prisma.user.findUnique({
			where: {
				email: data.email
			}
		});
		if (existingUser) {
			return { success: false, message: "User already exists", status: 400 };
		}
		const hashedPassword = await new Argon2id().hash(data.password);
		const createdUser = await prisma.user.create({
			data: {
				email: data.email,
				username: data.username,
				hashedPassword
			}
		});
		const session = await lucia.createSession(createdUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		(await cookies()).set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);
		return {
			success: true,
			message: "User created successfully",
			status: 201
		};
	} catch (error) {
		console.log(error);
		return {
			success: false,
			message: "Server error",
			status: 500
		};
	}
};
