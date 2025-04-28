import { NextRequest, NextResponse } from "next/server";
import { updateActivity, deleteActivity } from "@/lib/queries";

type Props = {
  params: {
    id: string;
  };
};

export async function PUT(request: NextRequest, context: Props) {
  try {
    const body = await request.json();
    const updatedActivity = await updateActivity({
      id: parseInt(context.params.id),
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

export async function DELETE(request: NextRequest, context: Props) {
  try {
    await deleteActivity(parseInt(context.params.id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting activity:", error);
    return NextResponse.json(
      { error: "Failed to delete activity" },
      { status: 500 }
    );
  }
}
