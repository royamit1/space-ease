import {useQuery} from "@tanstack/react-query";
import {getActiveRent} from "@/app/actions";


export const useActiveRent = () => {
    return useQuery({
        queryKey: ['activeRent'],
        queryFn: () => getActiveRent(),
        refetchInterval: 10000,
    });
}
