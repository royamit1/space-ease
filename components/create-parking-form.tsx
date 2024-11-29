import React, { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { parkingFormSchema, ParkingFormSchema } from "@/schemas/parking-form-schema"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon } from "@radix-ui/react-icons"
import { DollarSignIcon, Info, MapPinIcon } from "lucide-react"
import { CreateParkingDialog } from "@/components/create-parking-dialog"
import { Separator } from "@/components/ui/separator"
import ImageUpload from "./ui/image-upload"
import Image from "next/image"
import { useFooterStore } from "@/hooks/useFooterState"
import { createParkingSpot } from "@/hooks/useCreateParking"
import { useQueryClient } from "@tanstack/react-query"
import { DatePicker } from "@nextui-org/react"
import { now, today, getLocalTimeZone } from "@internationalized/date"

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
                    <h1 className="text-center text-3xl font-semibold first:mt-0 p-2">Create a Parking Spot</h1>

                    <Separator />

                    <div className="flex flex-col overflow-y-auto p-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
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
                                        <FormControl>
                                            <div className="relative">
                                                <DollarSignIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary" />
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="availableFrom"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <DatePicker
                                                label="Available From"
                                                variant="bordered"
                                                hideTimeZone
                                                showMonthAndYearPickers
                                                defaultValue={now(getLocalTimeZone())}
                                                minValue={today(getLocalTimeZone())}
                                                onChange={(value) => field.onChange(value.toDate().toISOString())}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="availableUntil"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <DatePicker
                                                label="Available Until"
                                                variant="bordered"
                                                hideTimeZone
                                                showMonthAndYearPickers
                                                defaultValue={now(getLocalTimeZone())}
                                                minValue={today(getLocalTimeZone())}
                                                maxValue={today(getLocalTimeZone()).add({ days: 30 })}
                                                onChange={(value) => field.onChange(value.toDate().toISOString())}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <Info className="absolute left-2 top-5 -translate-y-1/2 text-primary" />
                                                <Textarea
                                                    {...field}
                                                    placeholder="Describe your parking spot..."
                                                    className="pl-10"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <ImageUpload onUpload={handleImageUpload} />
                            <div className="flex flex-wrap">
                                {imageUrls.map((url, index) => (
                                    <Image
                                        key={index}
                                        src={url}
                                        alt="Uploaded"
                                        width={300}
                                        height={300}
                                        className="mx-auto w-36 h-36 lg:w-48 xl:w-64 lg:h-48 xl:h-64 object-cover"
                                    />
                                ))}
                            </div>
                        </div>
                        <Button type="button" onClick={() => setIsDialogOpen(true)} className="w-full text-md">
                            Create Parking Spot
                        </Button>
                    </div>
                </div>
                <CreateParkingDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} onConfirm={handleConfirm} />
            </form>
        </Form>
    )
}
