import MySlider from "@/components/shared/MySlider";
import ResizeableComp from "@/components/shared/ResizeableComp";
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";

export default async function Home() {
	const user = await getUser();
	if (!user || !("username" in user)) {
		redirect("/signin");
	}

	return (
		<div className="flex flex-col gap-2 p-2 items-center justify-between">
			<h1 className="text-xl">
				Welcome {user.username}
			</h1>

			<div className="flex justify-center items-center w-[100%] max-h-[calc(100vh-250px)] gap-2 p-2">
				<MySlider />
			</div>
		</div>
	);
}
