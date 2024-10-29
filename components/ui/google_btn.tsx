"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Adjust the path to your supabase client

export default function GoogleSignInButton() {
    const [loading, setLoading] = useState(false);

    const signInWithGoogle = async () => {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`, // Redirect to your callback route
            },
        });

        if (error) {
            console.error('Error signing in:', error.message);
        } else if (data.url) {
            window.location.href = data.url; // Redirect to the OAuth provider's login page
        }
    };

    return (
        <button
            onClick={signInWithGoogle}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center"
            disabled={loading}
        >
            {loading ? (
                <span>Signing in with Google...</span>
            ) : (
                <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="24px"
                        height="24px"
                        className="mr-2"
                    >
                        <path
                            fill="#4285F4"
                            d="M46.62,24.74c0-1.63-0.14-3.22-0.39-4.74H24v9.11h12.72c-0.55,2.91-2.2,5.37-4.67,7.03v5.85h7.55 C44.3,38.1,46.62,31.91,46.62,24.74z"
                        />
                        <path
                            fill="#34A853"
                            d="M24,48c6.3,0,11.58-2.09,15.44-5.68l-7.55-5.85c-2.09,1.4-4.74,2.23-7.89,2.23 c-6.06,0-11.18-4.09-13.01-9.58H2.29v5.98C6.15,43.78,14.52,48,24,48z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M10.99,28.12C10.56,26.72,10.31,25.2,10.31,23.63c0-1.57,0.25-3.09,0.68-4.49v-6.07H2.29 c-1.44,2.91-2.29,6.18-2.29,9.56s0.85,6.65,2.29,9.56L10.99,28.12z"
                        />
                        <path
                            fill="#EA4335"
                            d="M24,9.53c3.38,0,6.41,1.16,8.79,3.44l6.52-6.52C34.57,2.91,29.85,1,24,1C14.52,1,6.15,5.22,2.29,13.04 l8.7,6.07C12.82,13.62,17.94,9.53,24,9.53z"
                        />
                    </svg>
                    Sign in with Google
                </>
            )}
        </button>
    );
}
