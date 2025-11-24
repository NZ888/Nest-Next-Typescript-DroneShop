"use client";

import React from "react";
import { motion } from "framer-motion";
import GhostButton from "@/components/ui/GhostBtn/GhostButton";
import SolidButton from "@/components/ui/SolidBtn/SolidButton";
import { ResetScreenProps } from "../types";

const transition = { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] as any };

export const ResetScreen: React.FC<ResetScreenProps> = ({form, onSubmit, goToLogin, classNames}) => {
    const {handleSubmit, register, formState: { errors }} = form;

    return (
        <motion.div
            key="reset"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={transition}
        >
            <div className={classNames.titleContainer}>
                <h3 className={classNames.active}>Скидання пароля</h3>
            </div>

            <form className={classNames.container} onSubmit={handleSubmit(onSubmit)}>
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

                <div className={classNames.btns}>
                    <GhostButton onClick={goToLogin}>Назад</GhostButton>
                    <SolidButton type="submit">Надіслати</SolidButton>
                </div>
            </form>
        </motion.div>
    );
};
