"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Modal from "@/components/ui/Modal/Modal";
import styles from "./RegisterModal.module.css";
import { ILoginFormValues } from "@/types/login";
import { IRegisterFormValues } from "@/types/register";
import GhostButton from "@/components/ui/GhostBtn/GhostButton";
import SolidButton from "@/components/ui/SolidBtn/SolidButton";
import { AnimatePresence, motion } from "framer-motion";
import { circOut } from "framer-motion";
import {useSendResetCode, useResetPassword, useVerifyResetCode} from "@/features/auth/hooks/useAuthMutations"
interface RegisterModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const transition = {
    duration: 0.25,
    ease: circOut,
};


const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, setIsOpen }) => {
    const [screen, setScreen] = React.useState<"login" | "register" | "reset" | "verify">("login");

    const goToLogin = () => setScreen("login");
    const goToRegister = () => setScreen("register");
    const goToReset = () => setScreen("reset");
    const goToVerify = () => setScreen("verify");

    const loginForm = useForm<ILoginFormValues>({ mode: "onChange" });
    const registerForm = useForm<IRegisterFormValues>({ mode: "onChange" });


    const [email, setEmail] = React.useState("");
    const [code, setCode] = React.useState("");
    const [resetToken, setResetToken] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");

    const resetPassword = useResetPassword();
    const verifyResetCode = useVerifyResetCode();
    const sendResetCode = useSendResetCode();

    const onLoginSubmit = (data: ILoginFormValues) => {
        console.log("LOGIN:", data);
    };

    const onRegisterSubmit = (data: IRegisterFormValues) => {
        console.log("REGISTER:", data);
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <AnimatePresence mode="wait">
                {/* RESET */}
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

                        <form className={styles.container} onSubmit={(e)=>{
                            e.preventDefault();
                            goToVerify()
                        }}>
                            <div className={styles.formItem}>
                                <p>Email</p>
                                <input type="email" placeholder="Введіть email" />
                            </div>

                            <div className={styles.btns}>
                                <GhostButton onClick={goToLogin}>Назад</GhostButton>
                                <SolidButton type="submit">Надіслати</SolidButton>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* LOGIN */}
                {screen === "login" && (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={transition}
                    >
                        <div className={styles.titleContainer}>
                            <h3 onClick={goToLogin} className={styles.active}>
                                Авторизація
                            </h3>
                            <span>/</span>
                            <h3 onClick={goToRegister} className={styles.inactive}>
                                Реєстрація
                            </h3>
                        </div>

                        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className={styles.container}>
                            <div className={styles.formItem}>
                                <p>Email</p>
                                <input
                                    type="email"
                                    placeholder="Введіть email"
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
                                    placeholder="Введіть пароль"
                                    {...loginForm.register("password", { required: "Введіть пароль" })}
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
                                <GhostButton onClick={() => setIsOpen(false)}>Скасувати</GhostButton>
                                <SolidButton type={"submit"}>Увійти</SolidButton>
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
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log("verify code submitted");

                            }}
                        >
                            <div className={styles.formItem}>
                                <p>Код з email</p>
                                <input type="text" placeholder="Введіть код" />
                            </div>

                            <div className={styles.btns}>
                                <GhostButton onClick={goToReset}>
                                    Назад
                                </GhostButton>

                                <SolidButton type="submit">
                                    Підтвердити
                                </SolidButton>
                            </div>
                        </form>
                    </motion.div>
                )}


                {/* REGISTER */}
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
                            <h3 onClick={goToRegister} className={styles.active}>
                                Реєстрація
                            </h3>
                        </div>

                        <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className={styles.container}>
                            <div className={styles.formItem}>
                                <p>Імʼя</p>
                                <input
                                    type="text"
                                    placeholder="Введіть імʼя"
                                    {...registerForm.register("name", { required: "Введіть імʼя" })}
                                />
                                {registerForm.formState.errors.name && (
                                    <span className={styles.error}>
                                        {registerForm.formState.errors.name.message}
                                    </span>
                                )}
                            </div>

                            <div className={styles.formItem}>
                                <p>Email</p>
                                <input
                                    type="email"
                                    placeholder="Введіть email"
                                    {...registerForm.register("email", {
                                        required: "Введіть email",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Некоректний email",
                                        },
                                    })}
                                />
                                {registerForm.formState.errors.email && (
                                    <span className={styles.error}>
                                        {registerForm.formState.errors.email.message}
                                    </span>
                                )}
                            </div>

                            <div className={styles.formItem}>
                                <p>Пароль</p>
                                <input
                                    type="password"
                                    placeholder="Введіть пароль"
                                    {...registerForm.register("password", { required: "Введіть пароль" })}
                                />
                                {registerForm.formState.errors.password && (
                                    <span className={styles.error}>
                                        {registerForm.formState.errors.password.message}
                                    </span>
                                )}
                            </div>

                            <div className={styles.formItem}>
                                <p>Підтвердження пароля</p>
                                <input
                                    type="password"
                                    placeholder="Повторіть пароль"
                                    {...registerForm.register("confirmPassword", {
                                        required: "Повторіть пароль",
                                    })}
                                />
                                {registerForm.formState.errors.confirmPassword && (
                                    <span className={styles.error}>
                                        {registerForm.formState.errors.confirmPassword.message}
                                    </span>
                                )}
                            </div>

                            <div className={styles.forgotPass}>
                                <p onClick={goToLogin}>Вже є акаунт? Увійти</p>
                            </div>

                            <div className={styles.btns}>
                                <GhostButton onClick={() => setIsOpen(false)}>Скасувати</GhostButton>
                                <SolidButton type={"submit"}>Зареєструватися</SolidButton>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </Modal>
    );
};

export default RegisterModal;
