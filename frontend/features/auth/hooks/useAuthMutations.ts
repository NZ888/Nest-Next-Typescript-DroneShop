import { useMutation } from "@tanstack/react-query";
import { sendResetCode, verifyResetCode, resetPassword, login } from "../services/auth.service"

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
    return useMutation({
        mutationFn: (data: { email: string; password: string }) => login(data.email, data.password),
    })
}