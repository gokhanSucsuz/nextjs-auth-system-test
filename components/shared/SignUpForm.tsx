"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { signup } from "@/actions/auth/signup";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

export const signupSchema = z
	.object({
		email: z.string().email(),
		username: z.string().min(5, {
			message: "Username must be at least 5 characters."
		}),
		password: z.string().min(5, {
			message: "Password must be at least 5 characters."
		}),
		confirmPassword: z.string()
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"]
	});

export function SignUpForm() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			email: "",
			username: "",
			password: "",
			confirmPassword: ""
		}
	});

	function onSubmit(values: z.infer<typeof signupSchema>) {
		setLoading(true);
		signup(values)
			.then(res => {
				if (res.success) {
					toast.success(res.message);
					router.push("/");
				} else {
					toast.warning(res.message);
				}
			})
			.catch(err => toast.warning(err.message))
			.finally(() => setLoading(false));
	}
	return (
		<Form {...form}>
			<div className="flex w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 items-center justify-center bg-slate-100 p-4 rounded-lg gap-2 dark:text-white dark:bg-black">
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full flex flex-col"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) =>
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="email"
										{...field}
										autoComplete="email"
									/>
								</FormControl>

								<FormMessage />
							</FormItem>}
					/>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) =>
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="shadcn"
										{...field}
										autoComplete="username"
									/>
								</FormControl>

								<FormMessage />
							</FormItem>}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) =>
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="**************"
										{...field}
										autoComplete="new-password"
									/>
								</FormControl>

								<FormMessage />
							</FormItem>}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) =>
							<FormItem>
								<FormLabel>confirmPassword</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="**************"
										{...field}
										autoComplete="new-password"
									/>
								</FormControl>

								<FormMessage />
							</FormItem>}
					/>
					<Button
						type="submit"
						className={cn({
							"opacity-40 pointer-events-none": form.getValues().email === ""
						})}
					>
						Sign up
						{loading && <Loader />}
					</Button>

					<Link
						href={"/signin"}
						className="flex w-full items-center justify-center gap-4 group"
					>
						Have an account?{" "}
						<span className="group-hover:underline"> Sign in</span>
					</Link>
				</form>
			</div>
		</Form>
	);
}
