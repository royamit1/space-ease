import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import db from "@/lib/db"

export async function GET(req: NextRequest) {
    const supabase = createClient()
    try {
        const { data, error } = await supabase.auth.getUser()

        if (error || !data || !data.user) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
        }

        const activeRent = await db.activeRent.findUnique({
            where: { userId: data.user.id },
        })

        if (!activeRent) {
            return NextResponse.json({ activeRent }, { status: 200 })
        }

        return NextResponse.json({ activeRent }, { status: 200 })
    } catch (err: any) {
        console.error(err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
