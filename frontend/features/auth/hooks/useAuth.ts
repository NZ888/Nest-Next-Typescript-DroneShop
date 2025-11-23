import { useMe } from "../hooks/useAuthMutations";

export const useAuth = () => {
    const { data: user, isLoading, isError } = useMe();

    return {
        user,
        isLoading,
        isError,
        isAuthenticated: !!user,
    };
};
