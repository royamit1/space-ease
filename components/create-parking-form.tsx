import React, {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {createParkingSpot} from "@/app/actions";
import { SmartDatetimeInput } from "@/components/smart-date-time";
import {parkingFormSchema, ParkingFormSchema} from "@/schemas/parking-form-schema";

interface CreateParkingFormProps {
    step: number;
}

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

    const onSubmit = async (data: ParkingFormSchema) => {
        await createParkingSpot(data);
        // close
    }

    const nextStep = () => {
        // Only proceed to the next step if we're not on the last step
        if (step < 2) {
            setStep((prev) => Math.min(prev + 1, 3)); // Assuming 3 steps
        } else {
            // If we are on the last step, manually handle submission if needed
            form.handleSubmit(onSubmit)(); // Call the handleSubmit directly to trigger onSubmit
        }
    };


    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col px-6 gap-4">
                {/* Step 1: Address, Availability, Price */}
                {step === 1 && (
                    <>
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            ref={addressInputRef}
                                            placeholder="Search for an address"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                            <FormField
                                control={form.control}
                                name="availableFrom"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Available From</FormLabel>
                                        <FormControl>
                                            <SmartDatetimeInput
                                                value={new Date(field.value)} // Correctly bind the value
                                                onValueChange={(date) => field.onChange(date.toISOString())} // Convert Date back to string
                                                placeholder="Select date and time"
                                            />
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
                                        <FormLabel>Available Until</FormLabel>
                                        <FormControl>
                                            <SmartDatetimeInput
                                                value={new Date(field.value)} // Correctly bind the value
                                                onValueChange={(date) => field.onChange(date.toISOString())} // Convert Date back to string
                                                placeholder="Select date and time"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                    </>
                )}

                {/* Step 2: Description */}
                {step === 2 && (
                    <>
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}


                {/* Navigation Buttons */}
                <div className="flex justify-between mt-4">
                    {step > 1 && (
                        <Button type="button" onClick={prevStep}>
                            Previous
                        </Button>
                    )}
                    <Button type="button" onClick={nextStep} className={step < 2 ? "" : "w-full"}>
                        {step < 2 ? "Next" : "Create Parking Spot"}
                    </Button>
                </div>

            </form>
        </Form>

    );
}