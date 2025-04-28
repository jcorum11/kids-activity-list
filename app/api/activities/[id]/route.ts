import { NextRequest, NextResponse } from "next/server";
import { updateActivity, deleteActivity } from "@/lib/queries";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updatedActivity = await updateActivity({
      id: parseInt(params.id),
      ...body,
    });
    if (!updatedActivity) {
      return NextResponse.json(
        { error: "Activity not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedActivity);
  } catch (error) {
    console.error("Error updating activity:", error);
    return NextResponse.json(
      { error: "Failed to update activity" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteActivity(parseInt(params.id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting activity:", error);
    return NextResponse.json(
      { error: "Failed to delete activity" },
      { status: 500 }
    );
  }
}
