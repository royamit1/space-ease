import React from "react"
import { AdvancedMarker } from "@vis.gl/react-google-maps"
import { motion } from "framer-motion"

interface AnimatedPinProps {
    position: { lat: number; lng: number }
    isSearch?: boolean
}

const CurrentLocationMarker: React.FC<AnimatedPinProps> = ({ position, isSearch }) => (
    <AdvancedMarker position={position}>
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
            <motion.div
                animate={isSearch ? { y: [0, -15, 0] } : {}}
                transition={{
                    duration: 0.6,
                    repeat: isSearch ? 3 : 0,
                    ease: "easeOut",
                }}
            >
                <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 0C5.37 0 0 5.37 0 12C0 21 12 36 12 36C12 36 24 21 24 12C24 5.37 18.63 0 12 0ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z"
                        fill={isSearch ? "#4285F4" : "#FF5722"}
                    />
                    <circle cx="12" cy="12" r="4" fill="white" />
                </svg>
            </motion.div>
        </motion.div>
    </AdvancedMarker>
)

export default CurrentLocationMarker
