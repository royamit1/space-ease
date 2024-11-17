'use client';

import React, {useRef} from "react";
import {motion, PanInfo} from "framer-motion";
import {useFooterState} from "@/hooks/useFooterState";

const initialHeight = {
    collapsed: "auto",
    open: "50vh",
    full: "100vh",
}

export const Footer: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [footerSize, setFooterState] = useFooterState((state) => state.size);
    const constraintsRef = useRef(null);

    // Handle drag event and change state when drag ends
    const handleDragEnd = (_: any, info: PanInfo) => {
        const yOffset = info.offset.y;
        const isUp = yOffset < -50;
        const isDown = yOffset > 50;

        if (footerSize === "collapsed" && isUp) {
            setFooterState({size: "open"});
        } else if (footerSize === "open") {
            if (isUp) setFooterState({size: "full"});
            else if (isDown) setFooterState({size: "collapsed"});
        } else if (footerSize === "full" && isDown) {
            setFooterState({size: "collapsed"});
        }
    }

    return (
        <div ref={constraintsRef} className="fixed bottom-0 w-full p-3 my-3 z-10">
            <motion.div
                drag="y"
                dragConstraints={constraintsRef}
                onDragEnd={handleDragEnd}
                transition={{type: 'spring', stiffness: 200, damping: 20}}
                className="bg-background min-h-12 rounded-3xl flex flex-col items-center justify-start overflow-hidden"
                style={{maxHeight: "calc(100vh - 7rem)"}}
                animate={{height: initialHeight[footerSize]}}
            >
                <div className="h-12">
                    <div className="h-1.5 p-0.5 w-24 md:w-48 xl:w-96 m-3 rounded-full cursor-grab bg-gray-200 dark:bg-gray-700"/>
                </div>
                <motion.div animate={{height: footerSize === "collapsed" ? "0" : "auto"}} className="flex-grow overflow-hidden w-full">
                    {children}
                </motion.div>
            </motion.div>
        </div>
    );
}