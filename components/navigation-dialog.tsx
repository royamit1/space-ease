import React from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavigationDialogProps {
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
    onNavigate: (app: "google" | "waze") => void
}

export const NavigationDialog: React.FC<NavigationDialogProps> = ({ isOpen, onOpenChange, onNavigate }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => onOpenChange(true)}
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-3 shadow-md hover:shadow-lg transition-shadow duration-300 p-3 rounded-lg bg-primary text-primary-foreground"
                >
                    <MapPin className="w-6 h-6" />
                    <span className="text-lg">Navigate</span>
                </Button>
            </DialogTrigger>

            {/* Dialog Content */}
            <DialogContent className="w-[90vw] max-w-[425px] sm:w-[80vw] sm:max-w-[500px] md:w-[70vw] md:max-w-[600px] lg:w-[60vw] lg:max-w-[700px] xl:w-[50vw] xl:max-w-[800px] rounded-3xl bg-card shadow-2xl border-0 min-w-[250px]">
                <DialogHeader className="text-center space-y-6">
                    <div className="mx-auto bg-secondary rounded-full p-4 w-20 h-20 flex items-center justify-center">
                        <MapPin className="w-10 h-10 text-primary" />
                    </div>
                    <DialogTitle className="text-3xl font-semibold text-card-foreground">
                        Select Navigation App
                    </DialogTitle>
                    <DialogDescription className="text-lg text-muted-foreground">
                        Choose your preferred navigation app to get directions to this parking spot.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex flex-col gap-5 pt-4 justify-center">
                    <Button
                        type="button"
                        onClick={() => onNavigate("google")}
                        className="w-full p-4 rounded-lg bg-primary text-primary-foreground text-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        Google Maps
                    </Button>
                    <Button
                        type="button"
                        onClick={() => onNavigate("waze")}
                        className="w-full p-4 rounded-lg bg-primary text-primary-foreground text-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        Waze
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
