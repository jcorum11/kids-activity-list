import { NextResponse } from "next/server";
import { getRandomActivity } from "@/lib/queries";

export async function GET() {
  try {
    const activity = await getRandomActivity();
    if (!activity) {
      return NextResponse.json(
        { error: "No activities found" },
        { status: 404 }
      );
    }
    return NextResponse.json(activity);
  } catch (error) {
    console.error("Error fetching random activity:", error);
    return NextResponse.json(
      { error: "Failed to fetch random activity" },
      { status: 500 }
    );
  }
}
