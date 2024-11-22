import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"

export default function LogoutButton() {
    const handleLogout = async () => {
        const supabase = createClient()
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error("Error logging out:", error)
        } else {
            console.log("Successfully logged out")
            window.location.reload() // Optional: Refresh to reflect the logout state
        }
    }

    return (
        <Button onClick={handleLogout} className="w-full">
            Logout
        </Button>
    )
}
