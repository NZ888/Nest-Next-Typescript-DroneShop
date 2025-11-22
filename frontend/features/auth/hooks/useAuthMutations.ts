import { useMutation } from "@tanstack/react-query";
import { sendResetCode, verifyResetCode, resetPassword } from "../services/auth.service"

export const useSendResetCode = () => {
    return useMutation({
        mutationFn: (email: string) => sendResetCode(email),
    })
}
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
