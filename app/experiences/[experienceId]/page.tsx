import { whopSdk } from "@/lib/whop-sdk";
import { headers } from "next/headers";

export default async function ExperiencePage({
	params,
}: {
	params: { experienceId: string };
}) {
	const headersList = await headers();
	const { experienceId } = params;

	const { userId } = await whopSdk.verifyUserToken(headersList);

	const result = await whopSdk.access.checkIfUserHasAccessToExperience({
		userId,
		experienceId,
	});

	const user = await whopSdk.users.getUser({ userId });
	const experience = await whopSdk.experiences.getExperience({ experienceId });

	const { accessLevel } = result;

	return (
		<div className="flex flex-col items-center justify-start min-h-screen px-8 py-12 space-y-8">
			<h1 className="text-xl text-center">
				Hi <strong>{user.name}</strong>, you{" "}
				<strong>{result.hasAccess ? "have" : "do not have"} access</strong> to
				this experience. Your access level to this whop is:{" "}
				<strong>{accessLevel}</strong>. <br />
				<br />
				Your user ID is <strong>{userId}</strong> and your username is{" "}
				<strong>@{user.username}</strong>.<br />
				<br />
				You are viewing the experience: <strong>{experience.name}</strong>
			</h1>

			<iframe
				src="https://dev.fun/p/087323c5b2fa45f82276"
				title="Embedded Experience"
				width="100%"
				height="600"
				style={{ border: "1px solid #ccc", borderRadius: "8px" }}
				allowFullScreen
			/>
		</div>
	);
}