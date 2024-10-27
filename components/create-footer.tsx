// CreateFooter.tsx
import React, { useState } from "react";
import { CreateParkingForm } from "@/components/create-parking-form"; // Import your form component
import { Button } from "@/components/ui/button";

export const CreateFooter: React.FC = () => {
    return (
        <div className="create-footer">
            <CreateParkingForm />
        </div>
    );
};