import { createClient } from "@/utils/supabase/server";

const supabase = createClient();
const getSession = async () => {
    const {
        data: {
            session
        }, error
    }
        = await supabase.auth.getSession();

    return {session, error}
}

export { getSession }