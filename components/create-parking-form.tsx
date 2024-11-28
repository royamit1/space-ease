import React, { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { parkingFormSchema, ParkingFormSchema } from "@/schemas/parking-form-schema"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon } from "@radix-ui/react-icons"
import { DollarSignIcon, MapPinIcon } from "lucide-react"
import { CreateParkingDialog } from "@/components/create-parking-dialog"
import { Separator } from "@/components/ui/separator"
import ImageUpload from "./ui/image-upload"
import Image from "next/image"
import { useFooterStore } from "@/hooks/useFooterState"
import GradualSpacing from "@/components/ui/gradual-spacing"
import { createParkingSpot } from "@/hooks/useCreateParking"
import { useQueryClient } from "@tanstack/react-query"

export const CreateParkingForm: React.FC = () => {
    const queryClient = useQueryClient()
    const footerStore = useFooterStore()
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

    const addressInputRef = useRef<HTMLInputElement>(null)
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

    const onSubmit = async (data: ParkingFormSchema) => {
        await createParkingSpot({ ...data, imageUrls })
        await queryClient.invalidateQueries({ queryKey: ["parkingSpots"] })
    }

    const handleConfirm = () => {
        setIsDialogOpen(false)
        form.handleSubmit(onSubmit)()
        footerStore.setState({ mode: { mode: "search" }, size: "collapsed" })
    }

    return (
        <Form {...form}>
            <form>
                <div className="flex flex-col h-full">
                    <div className="p-3">
                        <GradualSpacing
                            className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight"
                            text="Create A Parking Spot"
                            delayMultiple={0.03}
                        />
                    </div>

                    <Separator className="my-2" />

                    <div className="flex flex-col overflow-y-auto p-3 mx-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price (per hour)</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <DollarSignIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                                                <Input
                                                    {...field}
                                                    value={field.value ?? ""}
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    placeholder="Enter price per hour"
                                                    className="pl-10 py-2"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <div className="space-y-2">
                                <FormLabel>Upload Images</FormLabel>
                                <ImageUpload onUpload={handleImageUpload} />
                                <div className="flex flex-wrap gap-4 mt-4">
                                    {imageUrls.map((url, index) => (
                                        <Image
                                            key={index}
                                            src={url}
                                            alt="Uploaded"
                                            className="object-cover rounded-lg border shadow-md"
                                            height={80}
                                            width={80}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow" />
                    <div className="p-6">
                        <Button
                            type="button"
                            onClick={() => setIsDialogOpen(true)}
                            className="w-full py-3 text-lg font-semibold rounded-lg"
                        >
                            Create Parking Spot
                        </Button>
                    </div>
                </div>
                <CreateParkingDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} onConfirm={handleConfirm} />
            </form>
        </Form>
    )
}
