import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {createParkingSpot} from "@/app/actions";
import {parkingFormSchema, ParkingFormSchema} from "@/schemas/parking-form-schema";

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
        },
    })

    const onSubmit = (data: ParkingFormSchema) => createParkingSpot(data)

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
                control={form.control}
                name="address"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormDescription>
                            The parking spot closest address
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}/>
            <div className="flex flex-row gap-4">
                <FormField
                    control={form.control}
                    name="longitude"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                                <Input {...field} type="number"/>
                            </FormControl>
                            <FormDescription>
                                (will be selected from the map)
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>

                    )}/>
                <FormField
                    control={form.control}
                    name="latitude"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                                <Input {...field} type="number"/>
                            </FormControl>
                            <FormDescription>
                                (will be selected from the map)
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>

                    )}/>
            </div>

            <div className="flex flex-row gap-4">
                <FormField
                    control={form.control}
                    name="availableFrom"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Available From</FormLabel>
                            <FormControl>
                                {/* @ts-ignore */}
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                <FormField
                    control={form.control}
                    name="availableUntil"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Available Until</FormLabel>
                            <FormControl>
                                {/* @ts-ignore */}
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
            </div>

            <FormField
                control={form.control}
                name="price"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
            <FormField
                control={form.control}
                name="description"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
            <Button type="submit" className="w-full">Create Parking Spot</Button>
        </form>
    </Form>
}