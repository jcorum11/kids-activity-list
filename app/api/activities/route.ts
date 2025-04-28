import { NextResponse } from "next/server";
import { getAllActivities, addActivity } from "@/lib/queries";

export async function GET() {
  try {
    const activities = await getAllActivities();
    return NextResponse.json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const activity = await addActivity(body);
    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    console.error("Error adding activity:", error);
    return NextResponse.json(
      { error: "Failed to add activity" },
      { status: 500 }
    );
  }
}
