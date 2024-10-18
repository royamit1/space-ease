import React, {useEffect, useRef, useState} from "react";
import {motion, PanInfo} from "framer-motion";

export type FooterState = "collapsed" | "open" | "full"

const initialHeight = {
    collapsed: "auto",
    open: "60vh",
    full: "90vh",
}

interface Created {
    header?: React.ReactNode;
    children?: React.ReactNode;
    state?: FooterState;
}

export const Footer: React.FC<Created> = ({children, header, state: externalState}) => {
    const [state, setState] = useState<FooterState>(externalState || 'collapsed')
    const constraintsRef = useRef(null)

    useEffect(() => {
        if (externalState) {
            setState(externalState)
        }
    }, [externalState])

    const handleDragEnd = (_: any, info: PanInfo) => {
        const yOffset = info.offset.y
        const isUp = yOffset < -50;
        const isDown = yOffset > 50;

        if (state === 'collapsed' && isUp) {
            setState('open')
        } else if (state === 'open') {
            if (isUp) {
                setState('full')
            } else if (isDown) {
                setState('collapsed')
            }
        } else if (state === 'full' && isDown) {
            setState('collapsed')
        }
    }

    return <div ref={constraintsRef} className="fixed bottom-0 w-full m-3">
        <motion.div
            drag="y"
            dragConstraints={constraintsRef}
            onDragEnd={handleDragEnd}
            transition={{type: 'spring', stiffness: 200, damping: 20}} // Smooth animation
            className="bg-background min-h-12 rounded-3xl flex flex-col items-center justify-start overflow-hidden"
            animate={{height: initialHeight[state]}}
        >
            <div
                className="h-1.5 w-24 md:w-48 xl:w-96 m-3 rounded-full cursor-grab active:cursor-grabbing bg-muted"
                aria-label="Drag handle"
                role="slider"
            />
            {header}
            {state !== "collapsed" && children}
        </motion.div>
    </div>;
}