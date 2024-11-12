import {useQuery} from "@tanstack/react-query";
import {createClient} from "@/utils/supabase/client";

async function getProfilePicture() : Promise<string | undefined> {
    const supabase = createClient()
    const {data} = await supabase.auth.getSession();
    const session = data.session
    return session?.user?.user_metadata.avatar_url;
}

export const useProfilePicture = () => {
    const result = useQuery({
        queryKey: ['profilePicture'],
        queryFn: getProfilePicture
    })
    return result.data;
}