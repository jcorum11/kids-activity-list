import { getAllActivities } from "@/lib/queries";
import { Activity } from "@/lib/types";
import ActivityList from "./components/ActivityList";

export default async function Home() {
  const activities: Activity[] = await getAllActivities();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Kids Activity Picker
        </h1>

        <ActivityList initialActivities={activities} />
      </div>
    </main>
  );
}
