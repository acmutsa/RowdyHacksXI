import ScheduleTimeline from "../dash/schedule/schedule-timeline";
import { getAllEvents } from "db/functions";
import { getClientTimeZone } from "@/lib/utils/client/shared";
import { getRequestContext } from "@cloudflare/next-on-pages";

export default async function Page() {
	const sched = await getAllEvents();
	const { cf } = getRequestContext();
	const userTimeZoneHeaderKey = cf.timezone;
	const userTimeZone = getClientTimeZone(userTimeZoneHeaderKey);
	return (
		<>
			<h1 className="w-7/8 mx-auto my-3 text-4xl font-black md:my-8 md:w-3/4 md:text-8xl">
				Schedule
			</h1>
			<ScheduleTimeline schedule={sched} timezone={userTimeZone} />
		</>
	);
}

export const runtime = "edge";
export const revalidate = 60;
