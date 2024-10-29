import React from "react";
import { Button } from "../ui/button";
import { SwitchTheme } from "./SwitchTheme";

const Navbar = () => {
	return (
		<div className="w-full flex justify-between items-center bg-slate-600 px-20">
			<div className="flex items-center">LOGO</div>
			<div className="flex items-center">
				<Button variant="outline">LOGIN</Button>
				<SwitchTheme />
			</div>
		</div>
	);
};

export default Navbar;
