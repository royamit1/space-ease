import React from "react"
import { Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

interface SpaceEaseIconProps {
    size?: number
    className?: string
    animated?: boolean
}

export function SpaceEaseIcon({ size = 40, className, animated = true }: SpaceEaseIconProps) {
    return (
        <div
            className={cn("relative inline-flex items-center justify-center", animated && "group", className)}
            style={{ width: size, height: size }}
        >
            {/* Galaxy background effect */}
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 rounded-full overflow-hidden",
                    "border border-indigo-400/30",
                    animated && "group-hover:border-indigo-400/50 transition-colors duration-300",
                    "scale-75", // Make the background circle smaller
                )}
            >
                {/* Galaxy swirl effect */}
                <div
                    className={cn(
                        "absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]",
                        "from-transparent via-indigo-500/20 to-transparent",
                        "opacity-50",
                        animated && "animate-[spin_20s_linear_infinite]",
                    )}
                    style={{
                        backgroundSize: `${size * 3}px ${size * 3}px`,
                        backgroundPosition: "center",
                    }}
                />

                {/* New starfield effect */}
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "absolute bg-white rounded-full",
                                animated && "animate-[pulse_2s_ease-in-out_infinite]",
                            )}
                            style={{
                                width: `${Math.random() * 2 + 1}px`,
                                height: `${Math.random() * 2 + 1}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${i * 100}ms`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Main rocket icon */}
            <Rocket
                className={cn(
                    "relative z-10 text-white transform", // Rotated 45 degrees to the right
                    "transition-all duration-300",
                )}
                size={size * 0.5}
                strokeWidth={2.5}
            />
        </div>
    )
}
