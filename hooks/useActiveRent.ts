import {useQuery} from "@tanstack/react-query";
import {getActiveRent} from "@/app/actions";


const useActiveRent = () => {
    return useQuery({
        queryKey: ['activeRent'],
        queryFn: getActiveRent,
    });
}
