"use client";

import React from "react";
import { SignUpForm } from "@/components/shared/SignUpForm";
const SignIn = () => {
	return (
		<div className="flex min-h-[calc(100vh-60px)] bg-red-300 flex-col items-center justify-center  max-width-[1200px] gap-20">
			<h1>SignUp</h1>

			<SignUpForm />
		</div>
	);
};

export default SignIn;
