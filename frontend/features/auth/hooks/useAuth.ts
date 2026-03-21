// import { useMe } from "../hooks/useAuthMutations";
import {useGetMeQuery} from "@/store/redux-toolkit/slices/auth/auth.slice";

export const useAuth = () => {
    const { data: user, isLoading, isError } = useGetMeQuery();
    return {
        user,
        isLoading,
        isError,
        isAuthenticated: !!user,
    };
};
