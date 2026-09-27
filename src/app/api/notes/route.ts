import { NextRequest, NextResponse } from "next/server";
import Note from "../../../models/Notes";
import { getUserIdFromRequest } from "../../../lib/auth";
import { connectDB } from "../../../lib/db";

const GET = async (req: NextRequest) => {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        { message: "User not authorized" },
        { status: 401 },
      );
    }
    await connectDB();
    const notes = await Note.find({ userId });
    return NextResponse.json(
      { notes, message: "Notes retrieved Successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};

const POST = async (req: NextRequest) => {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        { message: "User not authorized" },
        { status: 401 },
      );
    }
    await connectDB();
    const body = await req.json();
    const {
      title,
      content,
      color,
      isPinned,
      isArchived,
      lastEdited,
      isTrashed,
    } = body;

    const note = new Note({
      userId,
      title,
      content,
      color,
      isPinned,
      isArchived,
      lastEdited,
      isTrashed,
    });
    const savedNote = await note.save();
    return NextResponse.json({
      error: false,
      message: "Note saved",
      note: savedNote,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Interval server error" },
      { status: 500 },
    );
  }
};

export { POST, GET };
