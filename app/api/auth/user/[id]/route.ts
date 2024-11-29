import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(req: Request, { params }: { params: { id: string } }) {
    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

    const { id } = params

    if (!id) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Fetch the user by ID from Supabase Auth
    const { data, error } = await supabase.auth.admin.getUserById(id)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(data)
}
