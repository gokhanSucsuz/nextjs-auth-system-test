"use client";
import { SignInForm } from "@/components/shared/SignInForm";
import React from "react";
const SignIn = () => {
	return (
		<div className="flex min-h-[calc(100vh-60px)] bg-red-300 flex-col items-center justify-center  max-width-[1200px] gap-20">
			<h1>SignIn</h1>

			<SignInForm />
		</div>
	);
};

export default SignIn;
