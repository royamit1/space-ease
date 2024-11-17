import React, {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {parkingFormSchema, ParkingFormSchema} from "@/schemas/parking-form-schema";
import {useParkingMutation} from "@/hooks/useParkingSpots";
import {Textarea} from "@/components/ui/textarea";
import {CalendarIcon} from "@radix-ui/react-icons";
import {DollarSignIcon, MapPinIcon} from "lucide-react";
import {CreateParkingDialog} from "@/components/create-parking-dialog";
import GradualSpacing from "@/components/ui/gradual-spacing";
import {Separator} from "@/components/ui/separator";
import { SmartDatetimeInput } from "@/components/ui/smart-datetime-input";

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
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        }
    };

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };

    const handleConfirm = () => {
        console.log("Parking spot created!");
        setIsDialogOpen(false);
        form.handleSubmit(onSubmit)();
    };

    return (
        <Form {...form}>
            <form>
                {/* Title */}
                <div className="p-3">
                    <GradualSpacing
                        className="text-lg font-bold -tracking-widest text-black dark:text-white md:text-2xl"
                        text="Create A Parking Spot"
                        delayMultiple={0.03}
                    />
                </div>
                <Separator />

                {/* Form Content */}
                <div className="flex flex-col w-full h-full space-y-3 ps-8 pe-8 pt-5 shadow-md bg-background">
                    {/* Address Field */}
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-medium text-foreground">Address</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <MapPinIcon
                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary"
                                        />
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

                    {/* Available From and Until Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="availableFrom"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium text-foreground">Available From</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <CalendarIcon
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
                                            />
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
                                    <FormLabel className="text-base font-medium text-foreground">Available Until</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <CalendarIcon
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
                                            />
                                            <Input {...field} className="pl-10 py-2" />

                                            {/*<SmartDatetimeInput*/}
                                            {/*    name="datetime"*/}
                                            {/*    value={field.value ? new Date(field.value) : new Date()} // Default to current date if value is missing*/}
                                            {/*    onChange={(date) => {*/}
                                            {/*        if (date) field.onChange(date.toISOString());*/}
                                            {/*    }}*/}
                                            {/*    placeholder="e.g. tomorrow at 3pm"*/}
                                            {/*    className="py-2"*/}
                                            {/*/>*/}
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Price Field */}
                    <FormField
                        control={form.control}
                        name="price"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-base font-medium text-foreground">Price (per hour)</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <DollarSignIcon
                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary"
                                        />
                                        <Input
                                            {...field}
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="pl-10 py-2"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Description Field */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-medium text-foreground">Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Describe your parking spot..."
                                        className="min-h-[100px] py-2"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                {/* Submit Button */}
                <div className="flex-grow"/>

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
    );
}