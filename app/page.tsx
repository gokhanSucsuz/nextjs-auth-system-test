import LogoutButton from "@/components/shared/LogoutButton";
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";

export default async function Home() {
	const user = await getUser();
	if (!user || !("username" in user)) {
		redirect("/signin");
	}

	return (
		<div className="flex">
			<h1>
				Welcome {user.username}
			</h1>
			<LogoutButton />
		</div>
	);
}
