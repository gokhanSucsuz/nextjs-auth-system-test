"use client";
import React from "react";
import { Button } from "../ui/button";
import { SwitchTheme } from "./SwitchTheme";
import { useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";

const Navbar = ({ user }: { user: boolean | null }) => {
	const router = useRouter();
	return (
		<div className="w-full flex justify-between p-2 items-center bg-slate-600 px-20">
			<div className="flex items-center text-white">LOGO</div>
			{user === false || user === null
				? <div className="flex items-center gap-3">
						<Button
							variant="outline"
							onClick={() => {
								router.push("/signin");
							}}
						>
							Login
						</Button>
						<Button
							variant="outline"
							onClick={() => {
								router.push("/signup");
							}}
						>
							Register
						</Button>
						<SwitchTheme />
					</div>
				: <div className="flex items-center gap-3">
						<LogoutButton />
						<SwitchTheme />
					</div>}
		</div>
	);
};

export default Navbar;
