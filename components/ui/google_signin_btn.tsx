import { createClient } from "@/utils/supabase/client"
import GoogleButton from "react-google-button"

export default function LoginButton() {
    const handleLogin = async () => {
        const supabase = createClient()
        console.log("redirect: \n", window.location.origin)
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
        if (error) {
            console.error("Error signing in:", error.message)
        } else if (data.url) {
            window.location.href = data.url
        } else {
            console.log("Successfully logged in!")
        }
    }

    return <GoogleButton type="dark" onClick={handleLogin}></GoogleButton>
}
