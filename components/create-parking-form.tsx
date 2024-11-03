import React, {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {parkingFormSchema, ParkingFormSchema} from "@/schemas/parking-form-schema";
import { useParkingMutation } from "@/hooks/useParkingSpots";
import {Textarea} from "@/components/ui/textarea";
import {CalendarIcon} from "@radix-ui/react-icons";
import {DollarSignIcon, MapPinIcon} from "lucide-react";

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
    const [step, setStep] = useState(1);
    const addressInputRef = useRef<HTMLInputElement>(null);
    const parkingMutation = useParkingMutation();


    useEffect(() => {
        if (typeof window !== "undefined" && window.google) {
            const autocomplete = new window.google.maps.places.Autocomplete(
                addressInputRef.current as HTMLInputElement,
                {types: ["address"]}
            );

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();

                // Ensure place and geometry are defined
                if (place.geometry && place.geometry.location) {
                    const latitude = place.geometry.location.lat();
                    const longitude = place.geometry.location.lng();
                    form.setValue("latitude", latitude);
                    form.setValue("longitude", longitude);
                }

                // Always set the address, even if geometry is missing
                form.setValue("address", place.formatted_address || "");
            });
        }
    }, [form]);

    const onSubmit = (data: ParkingFormSchema) => {
        parkingMutation.mutate(data);
    }

    const nextStep = () => {
        if (step < 2) {
            setStep((prev) => Math.min(prev + 1, 3));
        } else {
            form.handleSubmit(onSubmit)();
        }
    };

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };

    return (
        <Form {...form}>
            <form className="max-w-lg mx-auto space-y-4 ps-4 pe-4 shadow-sm rounded-md bg-white">
                <h2 className="text-xl font-semibold text-center">
                    {step === 1 ? "Parking Spot Details" : "Additional Information"}
                </h2>

                {step === 1 && (
                    <>
                        <FormField
                            control={form.control}
                            name="address"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">Address</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <MapPinIcon
                                                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                                            <Input
                                                {...field}
                                                ref={addressInputRef}
                                                placeholder="Search for an address"
                                                className="pl-9 py-2"
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="availableFrom"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium">Available From</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <CalendarIcon
                                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                                                <Input {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="availableUntil"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium">Available Until</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <CalendarIcon
                                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                                                <Input {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="price"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">Price (per hour)</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <DollarSignIcon
                                                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                                            <Input {...field} type="number" step="0.01" min="0" className="pl-9 py-2"/>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </>
                )}

                {step === 2 && (
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-base font-medium">Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Describe your parking spot..."
                                        className="min-h-[100px] py-2"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                )}

                {/* Navigation Buttons */}
                <div className="mt-4 space-y-3">
                    {/* Previous Button */}
                    {step > 1 && (
                        <Button
                            type="button"
                            onClick={prevStep}
                            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
                        >
                            Previous
                        </Button>
                    )}

                    {/* Next Button */}
                    {step < 2 && (
                        <Button
                            type="button"
                            onClick={nextStep}
                            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
                        >
                            Next
                        </Button>
                    )}

                    {/* Create Button */}
                    {step === 2 && (
                        <Button
                            type="button"
                            onClick={nextStep}
                            className="w-full bg-green-600 text-white py-2 rounded-md font-bold hover:bg-green-700 transition"
                        >
                            Create Parking Spot
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
}