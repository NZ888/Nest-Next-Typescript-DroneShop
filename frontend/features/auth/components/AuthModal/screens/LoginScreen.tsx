"use client";

import React from "react";
import { motion } from "framer-motion";
import GhostButton from "@/components/ui/GhostBtn/GhostButton";
import SolidButton from "@/components/ui/SolidBtn/SolidButton";
import { LoginScreenProps } from "../types";

const transition = { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] as any };

export const LoginScreen: React.FC<LoginScreenProps> = ({form, onSubmit, goToReset, goToRegister, closeModal, classNames,}) => {
    const {handleSubmit, register, formState: { errors }} = form;

    return (
        <motion.div
            key="login"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={transition}
            className={classNames.wrapper}
        >
            <div className={classNames.titleContainer}>
                <h3 className={classNames.active}>Авторизація</h3>
                <span>/</span>
                <h3 onClick={goToRegister} className={classNames.inactive}>
                    Реєстрація
                </h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={classNames.container}>
                <div className={classNames.formItem}>
                    <p>Email</p>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Введіть email",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Некоректний email",
                            },
                        })}
                    />
                    {errors.email?.message && (
                        <span className={classNames.error}>{String(errors.email.message)}</span>
                    )}
                </div>

                <div className={classNames.formItem}>
                    <p>Пароль</p>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Введіть пароль",
                        })}
                    />
                    {errors.password?.message && (
                        <span className={classNames.error}>{String(errors.password.message)}</span>
                    )}
                </div>

                <div className={classNames.forgotPass}>
                    <p onClick={goToReset}>Забули пароль?</p>
                </div>

                <div className={classNames.btns}>
                    <GhostButton onClick={closeModal}>Скасувати</GhostButton>
                    <SolidButton type="submit">Увійти</SolidButton>
                </div>
            </form>
        </motion.div>
    );
};
