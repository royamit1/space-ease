import React, {useEffect, useRef, useState} from "react";
import {motion, PanInfo} from "framer-motion";

export type FooterState = "collapsed" | "open" | "full"

const initialHeight = {
    collapsed: "auto",
    open: "60vh",
    full: "100vh",
}

// Motion component for the footer.
interface Created {
    header?: React.ReactNode;
    children?: React.ReactNode;
    state?: FooterState;
    onStateChange?: (newState: FooterState) => void;
}

export const Footer: React.FC<Created> = ({children, header, state: externalState, onStateChange}) => {
    const [state, setState] = useState<FooterState>(externalState || 'collapsed')
    const constraintsRef = useRef(null)

    // Update state when external state is provided.
    useEffect(() => {
        if (externalState) {
            setState(externalState)
        }
    }, [externalState])

    // Create a drag constraints object to limit the drag area.
    const handleStateChange = (newState: FooterState) => {
        setState(newState)
        if (onStateChange) {
            onStateChange(newState)
        }
    }

    // Handle drag event and change state when drag ends.
    const handleDragEnd = (_: any, info: PanInfo) => {
        const yOffset = info.offset.y
        const isUp = yOffset < -50;
        const isDown = yOffset > 50;

        if (state === 'collapsed' && isUp) {
            handleStateChange('open')
        } else if (state === 'open') {
            if (isUp) {
                handleStateChange('full')
            } else if (isDown) {
                handleStateChange('collapsed')
            }
        } else if (state === 'full' && isDown) {
            handleStateChange('collapsed')
        }
    }

    // Render the footer component with header, children, and state.
    return <div ref={constraintsRef} className="fixed bottom-0 w-full p-3 my-3 z-10">
        <motion.div
            drag="y"
            dragConstraints={constraintsRef}
            onDragEnd={handleDragEnd}
            transition={{type: 'spring', stiffness: 200, damping: 20}} // Smooth animation
            className="bg-background min-h-12 rounded-3xl flex flex-col items-center justify-start overflow-hidden"
            style={{ maxHeight: "calc(100vh - 7rem)" }}
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