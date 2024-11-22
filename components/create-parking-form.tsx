import React, { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { parkingFormSchema, ParkingFormSchema } from "@/schemas/parking-form-schema"
import { useParkingMutation } from "@/hooks/useParkingSpots"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon } from "@radix-ui/react-icons"
import { DollarSignIcon, MapPinIcon } from "lucide-react"
import { CreateParkingDialog } from "@/components/create-parking-dialog"
import GradualSpacing from "@/components/ui/gradual-spacing"
import { Separator } from "@/components/ui/separator"
import ImageUpload from "./ui/image-upload"
import Image from "next/image"

export const CreateParkingForm: React.FC = () => {
    const form = useForm<ParkingFormSchema>({
        resolver: zodResolver(parkingFormSchema),
        defaultValues: {
            longitude: 0,
            latitude: 0,
            availableFrom: new Date().toISOString(),
            availableUntil: new Date().toISOString(),
            price: 10,
            description: "",
            address: "",
        },
    })

    const [step, setStep] = useState(1)
    const addressInputRef = useRef<HTMLInputElement>(null)
    const parkingMutation = useParkingMutation()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [imageUrls, setImageUrls] = useState<string[]>([])

    useEffect(() => {
        if (typeof window !== "undefined" && window.google) {
            const autocomplete = new window.google.maps.places.Autocomplete(
                addressInputRef.current as HTMLInputElement,
                { types: ["address"] },
            )

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace()
                if (place.geometry && place.geometry.location) {
                    form.setValue("latitude", place.geometry.location.lat())
                    form.setValue("longitude", place.geometry.location.lng())
                }
                form.setValue("address", place.formatted_address || "")
            })
        }
    }, [form])

    const handleImageUpload = (url: string) => {
        setImageUrls((prev) => [...prev, url])
    }

    const onSubmit = (data: ParkingFormSchema) => {
        parkingMutation.mutate({ ...data, imageUrls })
    }

    const handleConfirm = () => {
        setIsDialogOpen(false)
        form.handleSubmit(onSubmit)()
    }

    return (
        <Form {...form}>
            <form>
                <div className="p-3">
                    <GradualSpacing
                        className="text-lg font-bold -tracking-widest text-black dark:text-white md:text-2xl"
                        text="Create A Parking Spot"
                        delayMultiple={0.03}
                    />
                </div>

                <Separator />

                <div className="flex flex-col w-full space-y-3 ps-8 pe-8 pt-5 shadow-md bg-background">
                    {/* Address Field */}
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <MapPinIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary" />
                                        <Input
                                            {...field}
                                            ref={addressInputRef}
                                            placeholder="Search for an address"
                                            className="pl-10 py-2"
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Available From and Until */}
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="availableFrom"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Available From</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                                            <Input {...field} className="pl-10 py-2" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="availableUntil"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Available Until</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                                            <Input {...field} className="pl-10 py-2" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Price Field */}
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price (per hour)</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <DollarSignIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary" />
                                        <Input {...field} type="number" step="0.01" min="0" className="pl-10 py-2" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Description and Image Upload */}
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Describe your parking spot..."
                                            className="min-h-[80px]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <h4 className="text-lg font-semibold">Upload Images</h4>
                            <ImageUpload onUpload={handleImageUpload} />
                            <div className="flex flex-wrap gap-4 mt-4">
                                {imageUrls.map((url, index) => (
                                    <Image
                                        key={index}
                                        src={url}
                                        alt="Uploaded"
                                        className="object-cover rounded"
                                        height={60}
                                        width={60}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 pt-6 bg-background">
                    <Button type="button" onClick={() => setIsDialogOpen(true)} className="w-full">
                        Create Parking Spot
                    </Button>
                    <CreateParkingDialog
                        isOpen={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                        onConfirm={handleConfirm}
                    />
                </div>
            </form>
        </Form>
    )
}
