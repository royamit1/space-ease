import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const supabase = createClient()
        const { data, error } = await supabase.auth.getUser()

        if (error) {
            console.error("Error fetching user:", error)
            return NextResponse.json(
                { message: "Failed to fetch user", error: error.message },
                { status: 401 }, // Unauthorized
            )
        }

        return NextResponse.json(data.user, { status: 200 })
    } catch (error: any) {
        console.error("Internal server error while fetching user:", error)
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
    }
}
