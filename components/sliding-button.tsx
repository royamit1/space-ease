'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface SlidingButtonProps {
    onComplete: () => void
    buttonText?: string
}

export default function SlidingButton({ onComplete, buttonText = "Book Now" }: SlidingButtonProps) {
    const [sliding, setSliding] = useState(false)
    const [progress, setProgress] = useState(0)
    const trackRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const handleMouseDown = () => {
        setSliding(true)
    }

    const handleMouseUp = () => {
        if (sliding && progress >= 100) {
            onComplete()
        }
        setSliding(false)
        setProgress(0)
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (sliding && trackRef.current && buttonRef.current) {
            const trackRect = trackRef.current.getBoundingClientRect()
            const buttonRect = buttonRef.current.getBoundingClientRect()
            const maxX = trackRect.width - buttonRect.width
            const currentX = e.clientX - trackRect.left - buttonRect.width / 2
            const newProgress = Math.min(100, Math.max(0, (currentX / maxX) * 100))
            setProgress(newProgress)
        }
    }

    const handleTouchMove = (e: TouchEvent) => {
        if (sliding && trackRef.current && buttonRef.current) {
            const trackRect = trackRef.current.getBoundingClientRect()
            const buttonRect = buttonRef.current.getBoundingClientRect()
            const touchX = e.touches[0].clientX
            const maxX = trackRect.width - buttonRect.width
            const currentX = touchX - trackRect.left - buttonRect.width / 2
            const newProgress = Math.min(100, Math.max(0, (currentX / maxX) * 100))
            setProgress(newProgress)
        }
    }

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('touchmove', handleTouchMove)
        document.addEventListener('touchend', handleMouseUp)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('touchmove', handleTouchMove)
            document.removeEventListener('touchend', handleMouseUp)
        }
    }, [sliding])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            onComplete()
        }
    }

    return (
        <div
            ref={trackRef}
            className="relative w-full h-12 bg-gray-200 rounded-full overflow-hidden"
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
        >
            <div
                className="absolute inset-y-0 left-0 bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
            />
            <Button
                ref={buttonRef}
                className="absolute inset-y-0 left-0 h-full px-4 rounded-full transition-all duration-300 ease-out flex items-center justify-between"
                style={{ transform: `translateX(${progress}%)` }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                onKeyDown={handleKeyDown}
                aria-label={buttonText}
            >
                <div
                    className="flex items-center space-x-2 transition-transform duration-300"
                    style={{ transform: `translateX(${Math.max(0, progress - 10)}%)` }}
                >
                    <span>{buttonText}</span>
                    <ArrowRight />
                </div>
            </Button>
        </div>
    )
}
