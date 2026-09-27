import { NextRequest, NextResponse } from "next/server";
import Note from "../../../../models/Notes";
import { getUserIdFromRequest } from "../../../../lib/auth";
import { connectDB } from "../../../../lib/db";

const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        { message: "User not Auuthorized" },
        { status: 401 },
      );
    }
    const id = await params;
    await connectDB();
    const body = req.json();
    const updatedNote = await Note.findOneAndUpdate({ _id: id, userId }, body, {
      new: true,
    });
    if (!updatedNote) {
      return NextResponse.json(
        { message: "Unable to update note" },
        { status: 404 },
      );
    }
    return NextResponse.json({
      updatedNote,
      message: "Note updated successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};

const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        { message: "User not Auuthorized" },
        { status: 401 },
      );
    }
    const id = await params;
    await connectDB();
    const deletedNote = Note.findOneAndDelete({ _id: id, userId });
    if (!deletedNote) {
      return NextResponse.json(
        { message: "Unable to delete the note" },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};

export default { PUT, DELETE };
