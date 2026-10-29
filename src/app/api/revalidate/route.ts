import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (
    process.env.SANITY_REVALIDATE_SECRET &&
    secret !== process.env.SANITY_REVALIDATE_SECRET
  ) {
    return NextResponse.json({ message: "Secreto inválido" }, { status: 401 });
  }

  revalidateTag("sanity-content", "max");
  revalidatePath("/");

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
  });
}