"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Logout } from "@/lib/Logout";
import { redirect, useRouter } from "next/navigation";
import Loader from "./Loader";
import { toast } from "sonner";

const LogoutButton = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const handleLogout = async () => {
		setLoading(true);
		await Logout()
			.then(res => {
				if (res.success) {
					toast.success(res.message);
					router.push("/signin");
				}
			})
			.catch(err => toast.warning(err.message))
			.finally(() => setLoading(false));
	};
	return (
		<div>
			<Button variant={"destructive"} onClick={() => handleLogout()}>
				Logout
				{loading && <Loader />}
			</Button>
		</div>
	);
};

export default LogoutButton;
