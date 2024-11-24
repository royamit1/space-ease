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
            price: undefined,
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
            <form className="flex flex-col h-screen">
                {/* Fixed Header */}
                <div className="p-6 shadow-md">
                    <h1 className="text-xl sm:text-2xl font-bold text-center tracking-wide">Create A Parking Spot</h1>
                </div>

                <Separator className="my-4" />

                {/* Scrollable Form Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* First Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                                            <Input
                                                {...field}
                                                ref={addressInputRef}
                                                placeholder="Search for an address"
                                                className="pl-10 py-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price (per hour)</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <DollarSignIcon className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                                            <Input
                                                {...field}
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                placeholder="Enter price per hour"
                                                className="pl-10 py-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Second Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="availableFrom"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Available From</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                                            <Input
                                                {...field}
                                                type="datetime-local"
                                                className="pl-10 py-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                            />
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
                                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                                            <Input
                                                {...field}
                                                type="datetime-local"
                                                className="pl-10 py-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Third Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                            className="min-h-[120px] rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div>
                            <FormLabel>Upload Images</FormLabel>
                            <ImageUpload onUpload={handleImageUpload} />
                            <div className="flex flex-wrap gap-4 mt-4">
                                {imageUrls.map((url, index) => (
                                    <Image
                                        key={index}
                                        src={url}
                                        alt="Uploaded"
                                        className="object-cover rounded-lg border border-gray-300 shadow-md"
                                        height={80}
                                        width={80}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fixed Submit Button */}
                <div className="p-6 shadow-md">
                    <Button
                        type="button"
                        onClick={() => setIsDialogOpen(true)}
                        className="w-full py-3 text-lg font-semibold rounded-lg focus:ring-2 focus:ring-gray-500"
                    >
                        Create Parking Spot
                    </Button>
                </div>

                {/* Dialog */}
                <CreateParkingDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} onConfirm={handleConfirm} />
            </form>
        </Form>
    )
}
