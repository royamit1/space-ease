'use client';
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js"; // Import the User type from Supabase

const supabase = createClient();

const useUser = () => {
    const [user, setUser] = useState<User | null>(null); // Explicitly type user state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Ensure this code runs only in the browser
            const fetchUser = async () => {
                try {
                    const { data } = await supabase.auth.getUser();
                    const user: User | null = data.user;
                    setUser(user); // Set the user state
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                    setUser(null); // Fallback to null if there's an error
                } finally {
                    setLoading(false); // Stop the loading indicator
                }
            };

            fetchUser();
        }
    }, []);

    return { user, loading };
};

export default useUser;
