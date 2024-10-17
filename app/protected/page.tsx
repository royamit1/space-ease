import {redirect} from "next/navigation";

export default async function ProtectedPage() {
    return redirect("/");
}
