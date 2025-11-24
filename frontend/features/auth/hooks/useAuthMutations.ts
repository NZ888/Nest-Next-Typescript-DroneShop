import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    sendResetCode,
    verifyResetCode,
    resetPassword,
    login,
    getMe,
    logout,
    sendEmailConfirmCode, verifyEmailConfirmCode, register
} from "../services/auth.service"

export const useSendResetCode = () => {
    return useMutation({
        mutationFn: (data: { email: string }) => sendResetCode(data.email),
    });
};

export const useVerifyResetCode = () => {
    return useMutation({
        mutationFn: (data: { email: string; code: string }) =>
            verifyResetCode(data.email, data.code),
    });
};

export const useResetPassword = () => {
    return useMutation({
        mutationFn: (data: { resetToken: string; newPassword: string }) =>
            resetPassword(data.resetToken, data.newPassword),
    });
};

export const useLogin = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (data: { email: string; password: string }) =>
            login(data.email, data.password),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ["me"] });
        },
    });
};

export const useLogout = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: () => logout(),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ["me"] });
        },
    });
};

export const useMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: getMe,
    });
};

export const useSendEmailConfirmCode = () => {
    return useMutation({
        mutationFn: (data: { email: string }) => sendEmailConfirmCode(data.email),
    });
};

export const useVerifyEmailConfirmCode = () => {
    return useMutation({
        mutationFn: (data: { email: string; code: string }) =>
            verifyEmailConfirmCode(data.email, data.code),
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: (data: { name: string; email: string; password: string; confirmToken: string }) =>
            register(data.email, data.password, data.name, data.confirmToken),
    });
};
