"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence } from "framer-motion";

import Modal from "@/components/ui/Modal/Modal";
import styles from "./AuthModal.module.css";

import {
    useSendResetCode,
    useResetPassword,
    useVerifyResetCode,
    useLogin,
    useSendEmailConfirmCode,
    useVerifyEmailConfirmCode, useRegister,
} from "@/features/auth/hooks/useAuthMutations";

import {
    AuthScreen,
    LoginFormValues,
    RegisterFormValues,
    ResetFormValues,
    VerifyFormValues,
    NewPasswordFormValues,
    RegisterModalProps,
    VerifyEmailFormValues,
    EmailVerifyFormValues, IRegisterData,
} from "./types";

import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { ResetScreen } from "./screens/ResetScreen";
import { VerifyScreen } from "./screens/VerifyScreen";
import { NewPasswordScreen } from "./screens/NewPasswordScreen";
import { VerifyEmailScreen } from "./screens/VerifyEmailScreen";
import {EmailConfirmScreen} from "@/features/auth/components/AuthModal/screens/EmailConfirmScreen";

export default function AuthModal({ isOpen, setIsOpen }: RegisterModalProps) {
    const [screen, setScreen] = React.useState<AuthScreen>("login");

    const goToLogin = () => setScreen("login");
    const goToRegister = () => setScreen("register");
    const goToReset = () => setScreen("reset");
    const goToVerify = () => setScreen("verify");
    const goToNewPassword = () => setScreen("newPassword");
    const goToEmailConfirm = () => setScreen("emailConfirm");
    const goToVerifyEmail = () => setScreen("verifyEmail");

    // forms
    const loginForm = useForm<LoginFormValues>({ mode: "onChange" });
    const registerForm = useForm<RegisterFormValues>({ mode: "onChange" });
    const resetForm = useForm<ResetFormValues>({ mode: "onChange" });
    const verifyForm = useForm<VerifyFormValues>({ mode: "onChange" });
    const newPassForm = useForm<NewPasswordFormValues>({ mode: "onChange" });
    const verifyEmailForm = useForm<VerifyEmailFormValues>({ mode: "onChange" });
    const confirmEmailForm = useForm<EmailVerifyFormValues>({mode: "onChange"})
    // mutations
    const loginMutation = useLogin();
    const sendResetCode = useSendResetCode();
    const verifyResetCode = useVerifyResetCode();
    const resetPasswordMutation = useResetPassword();
    const sendEmailConfirmCode = useSendEmailConfirmCode();
    const verifyEmailConfirmCode = useVerifyEmailConfirmCode();
    const registerMutation = useRegister()

    const [emailForReset, setEmailForReset] = React.useState("");
    const [emailForConfirm, setEmailForConfirm] = React.useState("");
    const [resetToken, setResetToken] = React.useState("");
    const [confirmToken, setConfirmToken] = React.useState("");
    const [registerData, setRegisterData] = React.useState<IRegisterData>({
        name:"",
        password:"",
        email:"",
        confirmToken:""
    });



    const closeModal = () => setIsOpen(false);

    // LOGIN
    const handleLogin = (data: LoginFormValues) => {
        loginMutation.mutate(data, {
            onError: (err: Error) => {
                loginForm.setError("password", { message: err.message });
            },
            onSuccess: () => {
                closeModal();
            },
        });
    };

    // RESET PASSWORD — SEND CODE
    const handleSendReset = (data: ResetFormValues) => {
        setEmailForReset(data.email);

        sendResetCode.mutate(data, {
            onSuccess: () => goToVerify(),
            onError: (err: Error) => {
                resetForm.setError("email", { message: err.message });
            },
        });
    };

    // VERIFY RESET CODE
    const handleVerify = (data: VerifyFormValues) => {
        verifyResetCode.mutate(
            { email: emailForReset, code: data.code },
            {
                onSuccess: (res) => {
                    setResetToken(res.resetToken);
                    goToNewPassword();
                },
                onError: (err: Error) => {
                    verifyForm.setError("code", { message: err.message });
                },
            }
        );
    };

    // SEND EMAIL CONFIRM CODE
    const handleSendConfirmToken = (data: EmailVerifyFormValues) => {
        setEmailForConfirm(data.email);

        sendEmailConfirmCode.mutate(
            { email: data.email },
            {
                onSuccess: () => goToVerifyEmail(),
                onError: (err: Error) => {
                    registerForm.setError("email", { message: err.message });
                },
            }
        );
    };

    // VERIFY EMAIL CONFIRM CODE
    const handleVerifyEmail = (data: VerifyEmailFormValues) => {
        verifyEmailConfirmCode.mutate(
            { email: emailForConfirm, code: data.code },
            {
                onSuccess: (res) => {
                    setConfirmToken(res.confirmToken);

                    registerMutation.mutate(
                        {
                            ...registerData,
                            confirmToken: res.confirmToken
                        },
                        {
                            onSuccess: () => {
                                confirmEmailForm.reset();
                                verifyEmailConfirmCode.reset();
                                registerForm.reset();
                                goToLogin()
                            },
                            onError: (err) => {
                                registerForm.setError("email", { message: err.message });
                            }
                        }
                    );
                },
            }
        );
    };


    // NEW PASSWORD
    const handleNewPassword = (data: NewPasswordFormValues) => {
        resetPasswordMutation.mutate(
            { resetToken, newPassword: data.newPassword },
            {
                onSuccess: () => goToLogin(),
                onError: (err: Error) => {
                    newPassForm.setError("newPassword", { message: err.message });
                },
            }
        );
    };

    // REGISTER
    const handleRegister = (data: RegisterFormValues) => {

        if (data.password !== data.confirmPassword) {
            registerForm.setError("confirmPassword", {
                message: "Паролі не співпадають",
            });
            return;
        }
        goToEmailConfirm();
        setEmailForConfirm(data.email);
        setRegisterData({
            name: data.name,
            password: data.password,
            email: data.email,
        })
    };



    const classNames = {
        titleContainer: styles.titleContainer,
        active: styles.active,
        inactive: styles.inactive,
        container: styles.container,
        formItem: styles.formItem,
        error: styles.error,
        btns: styles.btns,
        forgotPass: styles.forgotPass,
        wrapper: "",
    };


    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <AnimatePresence mode="wait">
                {screen === "login" && (
                    <LoginScreen
                        form={loginForm}
                        onSubmit={handleLogin}
                        goToReset={goToReset}
                        goToRegister={goToRegister}
                        closeModal={closeModal}
                        classNames={classNames}
                    />
                )}

                {screen === "register" && (
                    <RegisterScreen
                        form={registerForm}
                        onSubmit={handleRegister}
                        goToLogin={goToLogin}
                        classNames={classNames}
                    />
                )}

                {screen === "reset" && (
                    <ResetScreen
                        form={resetForm}
                        onSubmit={handleSendReset}
                        goToLogin={goToLogin}
                        classNames={classNames}
                    />
                )}

                {screen === "verify" && (
                    <VerifyScreen
                        form={verifyForm}
                        onSubmit={handleVerify}
                        goToReset={goToReset}
                        classNames={classNames}
                    />
                )}

                {screen === "verifyEmail" && (
                    <VerifyEmailScreen
                        form={verifyEmailForm}
                        onSubmit={handleVerifyEmail}
                        goToRegister={goToRegister}
                        classNames={classNames}
                    />
                )}
                {screen === 'emailConfirm' && (
                    <EmailConfirmScreen
                        form={confirmEmailForm}
                        onSubmit={handleSendConfirmToken}
                        goToLogin={goToLogin}
                        classNames={classNames}
                    />
                )}

                {screen === "newPassword" && (
                    <NewPasswordScreen
                        form={newPassForm}
                        onSubmit={handleNewPassword}
                        goToLogin={goToLogin}
                        classNames={classNames}
                    />
                )}
            </AnimatePresence>
        </Modal>
    );
}
