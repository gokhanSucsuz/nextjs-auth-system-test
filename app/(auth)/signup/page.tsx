"use client";

import React from "react";
import { SignUpForm } from "@/components/shared/SignUpForm";
const SignIn = () => {
	return <div className="flex min-h-[calc(100vh-76px)] bg-slate-300 dark:bg-slate-800 flex-col items-center justify-center  max-width-[1200px] gap-20 px-2">
			<SignUpForm />
		</div>;
};

export default SignIn;
