import React, { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { UploadCloud, Loader } from "lucide-react"

interface ImageUploadProps {
    onUpload: (url: string) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
    const [uploading, setUploading] = useState(false)

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const supabase = createClient()
        const file = event.target.files?.[0]
        if (!file) return

        setUploading(true)
        const fileName = `${Date.now()}_${file.name}`

        const { data, error } = await supabase.storage.from("parking-images").upload(fileName, file)
        setUploading(false)

        if (error) {
            console.error("Image upload error:", error.message)
        } else {
            const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/parking-images/${data.path}`
            onUpload(url)
        }
    }

    return (
        <div className="flex flex-col space-y-4">
            <label
                htmlFor="file-upload"
                className={`flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary rounded-lg shadow-lg cursor-pointer ${
                    uploading ? "opacity-70 cursor-not-allowed" : "hover:bg-primary-dark"
                }`}
            >
                {uploading ? (
                    <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" /> Uploading...
                    </>
                ) : (
                    <>
                        <UploadCloud className="w-5 h-5 mr-2" /> Upload Image
                    </>
                )}
            </label>
            <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} disabled={uploading} />
        </div>
    )
}

export default ImageUpload
