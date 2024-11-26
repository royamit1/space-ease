import { NextResponse } from "next/server"
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const next = searchParams.get("next") ?? "/"

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            const isLocalEnv = process.env.NODE_ENV === "development"
            const baseUrl = isLocalEnv ? "http://localhost:3000" : "https://space-ease.vercel.app"
            return NextResponse.redirect(`${baseUrl}${next}`)
        }
    }

    // Redirect to error page
    const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://space-ease.vercel.app"
    return NextResponse.redirect(`${baseUrl}/auth/auth-code-error`)
}
