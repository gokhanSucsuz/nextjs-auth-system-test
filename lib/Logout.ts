"use server";
import { cookies } from "next/headers";
import { lucia } from "./lucia";

export const Logout = async () => {
	const sessionCookie = await lucia.createBlankSessionCookie();
	(await cookies()).set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);

	return {
		success: true,
		message: "Logged out successfully",
		status: 200,
		redirect: "/signin"
	};
};
