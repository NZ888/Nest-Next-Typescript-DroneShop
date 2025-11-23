"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Modal from "@/components/ui/Modal/Modal";
import styles from "./RegisterModal.module.css";
import GhostButton from "@/components/ui/GhostBtn/GhostButton";
import SolidButton from "@/components/ui/SolidBtn/SolidButton";
import { AnimatePresence, motion } from "framer-motion";
import { circOut } from "framer-motion";
import {
    useSendResetCode,
    useResetPassword,
    useVerifyResetCode,
    useLogin,
} from "@/features/auth/hooks/useAuthMutations";

interface RegisterModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const transition = { duration: 0.25, ease: circOut };

export default function RegisterModal({ isOpen, setIsOpen }: RegisterModalProps) {
    const [screen, setScreen] = React.useState<
        "login" | "register" | "reset" | "verify" | "newPassword"
    >("login");
    const goToLogin = () => setScreen("login");
    const goToRegister = () => setScreen("register");
    const goToReset = () => setScreen("reset");
    const goToVerify = () => setScreen("verify");
    const goToNewPassword = () => setScreen("newPassword");


    const loginForm = useForm<{ email: string; password: string }>({
        mode: "onChange",
    });

    const login = useLogin();

    const handleLogin = (data: { email: string; password: string }) => {
        login.mutate(data, {
            onError: (err) => {
                loginForm.setError("password", {
                    message: err.message,
                });
            },
            onSuccess: () => {
                setIsOpen(false);
            }
        });
    };


    const registerForm = useForm({
        mode: "onChange",
    });


    const resetForm = useForm<{ email: string }>({
        mode: "onChange",
    });

    const sendResetCode = useSendResetCode();

    const handleSendReset = (data: { email: string }) => {
        sendResetCode.mutate(data, {
            onSuccess: () => goToVerify(),
            onError: (err) => {
                resetForm.setError("email", { message: err.message });
            },
        });
    };


    const verifyForm = useForm<{ code: string }>({
        mode: "onChange",
    });

    const verifyResetCode = useVerifyResetCode();
    const [emailForReset, setEmailForReset] = React.useState("");
    const [resetToken, setResetToken] = React.useState("");

    const handleVerify = (data: { code: string }) => {
        verifyResetCode.mutate(
            { email: emailForReset, code: data.code },
            {
                onSuccess: (res) => {
                    setResetToken(res.resetToken);
                    goToNewPassword();
                },
                onError: (err) => {
                    verifyForm.setError("code", { message: err.message });
                },
            }
        );
    };

    const newPassForm = useForm<{ newPassword: string }>({
        mode: "onChange",
    });

    const resetPassword = useResetPassword();

    const handleNewPassword = (data: { newPassword: string }) => {
        resetPassword.mutate(
            { resetToken, newPassword: data.newPassword },
            {
                onSuccess: () => goToLogin(),
                onError: (err) => {
                    newPassForm.setError("newPassword", { message: err.message });
                },
            }
        );
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <AnimatePresence mode="wait">

                {screen === "newPassword" && (
                    <motion.div
                        key="newPassword"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={transition}
                    >
                        <div className={styles.titleContainer}>
                            <h3 className={styles.active}>Введіть новий пароль</h3>
                        </div>

                        <form
                            className={styles.container}
                            onSubmit={newPassForm.handleSubmit(handleNewPassword)}
                        >
                            <div className={styles.formItem}>
                                <p>Новий пароль</p>
                                <input
                                    type="password"
                                    {...newPassForm.register("newPassword", {
                                        required: "Введіть новий пароль",
                                    })}
                                />
                                {newPassForm.formState.errors.newPassword && (
                                    <span className={styles.error}>
                                        {newPassForm.formState.errors.newPassword.message}
                                    </span>
                                )}
                            </div>

                            <div className={styles.btns}>
                                <GhostButton onClick={goToLogin}>Скасувати</GhostButton>
                                <SolidButton type="submit">Підтвердити</SolidButton>
                            </div>
                        </form>
                    </motion.div>
                )}

                {screen === "reset" && (
                    <motion.div
                        key="reset"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={transition}
                    >
                        <div className={styles.titleContainer}>
                            <h3 className={styles.active}>Скидання пароля</h3>
                        </div>

                        <form
                            className={styles.container}
                            onSubmit={resetForm.handleSubmit((data) => {
                                setEmailForReset(data.email);
                                handleSendReset(data);
                            })}
                        >
                            <div className={styles.formItem}>
                                <p>Email</p>
                                <input
                                    type="email"
                                    {...resetForm.register("email", {
                                        required: "Введіть email",
                                        pattern: {
                                           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Некоректний email",
                                       },
                                    })}
                                />
                                {resetForm.formState.errors.email && (
                                    <span className={styles.error}>
                                        {resetForm.formState.errors.email.message}
                                    </span>
                                )}
                            </div>

                            <div className={styles.btns}>
                                <GhostButton onClick={goToLogin}>Назад</GhostButton>
                                <SolidButton type="submit">Надіслати</SolidButton>
                            </div>
                        </form>
                    </motion.div>
                )}


                {screen === "verify" && (
                    <motion.div
                        key="verify"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={transition}
                    >
                        <div className={styles.titleContainer}>
                            <h3 className={styles.active}>Підтвердження</h3>
                        </div>

                        <form
                            className={styles.container}
                            onSubmit={verifyForm.handleSubmit(handleVerify)}
                        >
                            <div className={styles.formItem}>
                                <p>Код з email</p>
                                <input
                                    type="text"
                                    {...verifyForm.register("code", {
                                        required: "Введіть код",
                                    })}
                                />
                                {verifyForm.formState.errors.code && (
                                    <span className={styles.error}>
                                        {verifyForm.formState.errors.code.message}
                                    </span>
                                )}
                            </div>

                            <div className={styles.btns}>
                                <GhostButton onClick={goToReset}>Назад</GhostButton>
                                <SolidButton type="submit">Підтвердити</SolidButton>
                            </div>
                        </form>
                    </motion.div>
                )}


                {screen === "login" && (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={transition}
                    >
                        <div className={styles.titleContainer}>
                            <h3 className={styles.active}>Авторизація</h3>
                            <span>/</span>
                            <h3 onClick={goToRegister} className={styles.inactive}>
                                Реєстрація
                            </h3>
                        </div>

                        <form
                            onSubmit={loginForm.handleSubmit(handleLogin)}
                            className={styles.container}
                        >
                            <div className={styles.formItem}>
                                <p>Email</p>
                                <input
                                    type="email"
                                    {...loginForm.register("email", {
                                        required: "Введіть email",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Некоректний email",
                                        },
                                    })}
                                />
                                {loginForm.formState.errors.email && (
                                    <span className={styles.error}>
                                        {loginForm.formState.errors.email.message}
                                    </span>
                                )}
                            </div>

                            <div className={styles.formItem}>
                                <p>Пароль</p>
                                <input
                                    type="password"
                                    {...loginForm.register("password", {
                                        required: "Введіть пароль",
                                    })}
                                />
                                {loginForm.formState.errors.password && (
                                    <span className={styles.error}>
                                        {loginForm.formState.errors.password.message}
                                    </span>
                                )}
                            </div>

                            <div className={styles.forgotPass}>
                                <p onClick={goToReset}>Забули пароль?</p>
                            </div>

                            <div className={styles.btns}>
                                <GhostButton onClick={() => setIsOpen(false)}>
                                    Скасувати
                                </GhostButton>
                                <SolidButton type="submit">Увійти</SolidButton>
                            </div>
                        </form>
                    </motion.div>
                )}

                {screen === "register" && (
                    <motion.div
                        key="register"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={transition}
                    >
                        <div className={styles.titleContainer}>
                            <h3 onClick={goToLogin} className={styles.inactive}>
                                Авторизація
                            </h3>
                            <span>/</span>
                            <h3 className={styles.active}>Реєстрація</h3>
                        </div>

                        <form
                            onSubmit={registerForm.handleSubmit((data) =>
                                console.log("REGISTER:", data)
                            )}
                            className={styles.container}
                        >
                            <div className={styles.formItem}>
                                <p>Імʼя</p>
                                <input
                                    type="text"
                                    {...registerForm.register("name", {
                                        required: "Введіть імʼя",
                                    })}
                                />
                                {registerForm.formState.errors.name?.message && (
                                    <span className={styles.error}>
                                        {String(registerForm.formState.errors.name.message)}
                                    </span>
                                )}
                            </div>

                            <div className={styles.formItem}>
                                <p>Email</p>
                                <input
                                    type="email"
                                    {...registerForm.register("email", {
                                        required: "Введіть email",
                                    })}
                                />
                                {registerForm.formState.errors.email?.message && (
                                    <span className={styles.error}>
                                        {String(registerForm.formState.errors.email.message)}
                                    </span>
                                )}
                            </div>

                            <div className={styles.formItem}>
                                <p>Пароль</p>
                                <input
                                    type="password"
                                    {...registerForm.register("password", {
                                        required: "Введіть пароль",
                                    })}
                                />
                                {registerForm.formState.errors.password?.message && (
                                    <span className={styles.error}>
                                        {String(registerForm.formState.errors.password.message)}
                                    </span>
                                )}
                            </div>

                            <div className={styles.formItem}>
                                <p>Підтвердження пароля</p>
                                <input
                                    type="password"
                                    {...registerForm.register("confirmPassword", {
                                        required: "Повторіть пароль",
                                    })}
                                />
                                {registerForm.formState.errors.confirmPassword?.message && (
                                    <span className={styles.error}>
                                        {String(registerForm.formState.errors.confirmPassword.message)}
                                    </span>
                                )}
                            </div>

                            <div className={styles.btns}>
                                <GhostButton onClick={goToLogin}>Скасувати</GhostButton>
                                <SolidButton type="submit">Зареєструватися</SolidButton>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </Modal>
    );
}
