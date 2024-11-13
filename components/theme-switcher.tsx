"use client";

import {Sun, Moon, Laptop} from "lucide-react";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const {theme, setTheme} = useTheme();

    // Ensure the component is mounted before showing UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const ICON_SIZE = 18;

    return (
        <div className="flex justify-start">
            <ToggleGroup
                type="single"
                value={theme}
                onValueChange={(value) => {
                    if (value) setTheme(value);
                }}
                className="gap-2"
                aria-label="Theme Switcher"
            >
                <ToggleGroupItem value="light" aria-label="Light Theme">
                    <Sun
                        size={ICON_SIZE}
                        className={theme === "light" ? "text-primary" : "text-muted-foreground"}
                    />
                </ToggleGroupItem>

                <ToggleGroupItem value="dark" aria-label="Dark Theme">
                    <Moon
                        size={ICON_SIZE}
                        className={theme === "dark" ? "text-primary" : "text-muted-foreground"}
                    />
                </ToggleGroupItem>

                <ToggleGroupItem value="system" aria-label="System Theme">
                    <Laptop
                        size={ICON_SIZE}
                        className={theme === "system" ? "text-primary" : "text-muted-foreground"}
                    />
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    );
};

export {ThemeSwitcher};
