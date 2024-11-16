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
            <form className="flex flex-col h-full">
                {/* Title */}
                <div className="p-4">
                    <GradualSpacing
                        className="text-lg font-bold -tracking-widest text-black dark:text-white md:text-2xl"
                        text="Create A Parking Spot"
                        delayMultiple={0.03}/>
                </div>

                {/* Form Content */}
                <div className="flex-grow flex flex-col space-y-5 ps-6 pe-6 shadow-md bg-background">
                    {step === 1 && (
                        <>
                            <FormField
                                control={form.control}
                                name="address"
                                render={({field}) => (
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

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="availableFrom"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-medium text-foreground">Available
                                                From</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <CalendarIcon
                                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
                                                    />
                                                    <Input {...field} className="pl-10 py-2"/>
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
                                            <FormLabel className="text-base font-medium text-foreground">Available
                                                Until</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <CalendarIcon
                                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
                                                    />
                                                    <Input {...field} className="pl-10 py-2"/>
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
                                        <FormLabel className="text-base font-medium text-foreground">Price (per
                                            hour)</FormLabel>
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
                                    <FormLabel className="text-base font-medium text-foreground">Description</FormLabel>
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
                    <div className="flex-grow"/>

                    {/* Navigation Buttons */}
                    <div className="flex space-x-3 p-6 bg-background">
                        {step > 1 && (
                            <Button type="button" onClick={prevStep} className="w-full">
                                Previous
                            </Button>
                        )}
                        {step < 2 && (
                            <Button type="button" onClick={nextStep} className="w-full">
                                Next
                            </Button>
                        )}
                        {step === 2 && (
                            <Button type="button" onClick={() => setIsDialogOpen(true)} className="w-full">
                                Create Parking Spot
                            </Button>
                        )}
                    </div>
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