import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "next-themes"
import "./globals.css"
import OneTapComponent from "@/components/google-onetap"
import { Analytics } from "@vercel/analytics/react"
import { Providers } from "./providers"

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Next.js and Supabase Starter Kit",
    description: "The fastest way to build apps with Next.js and Supabase",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={GeistSans.className} suppressHydrationWarning>
            <body className="bg-background text-foreground">
                <OneTapComponent />
                <Providers>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <main className="min-h-screen flex flex-col items-center justify-center">{children}</main>
                    </ThemeProvider>
                </Providers>
                <Analytics />
            </body>
        </html>
    )
}
