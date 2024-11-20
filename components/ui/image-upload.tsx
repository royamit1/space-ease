import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

interface ImageUploadProps {
    onUpload: (url: string) => void; // Callback to pass the uploaded image URL
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const fileName = `${Date.now()}_${file.name}`;

        const { data, error } = await supabase.storage.from("parking-images").upload(fileName, file);
        setUploading(false);

        if (error) {
            console.error("Image upload error:", error.message);
        } else {
            const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/parking-images/${data.path}`;
            onUpload(url); // Pass the URL back to the parent
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} disabled={uploading} />
            {uploading && <p>Uploading...</p>}
        </div>
    );
};

export default ImageUpload;
