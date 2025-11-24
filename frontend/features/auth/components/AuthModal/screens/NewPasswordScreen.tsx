"use client";

import React from "react";
import { motion } from "framer-motion";
import GhostButton from "@/components/ui/GhostBtn/GhostButton";
import SolidButton from "@/components/ui/SolidBtn/SolidButton";
import { NewPasswordScreenProps } from "../types";

const transition = { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] as any };

export const NewPasswordScreen: React.FC<NewPasswordScreenProps> = ({form, onSubmit, goToLogin, classNames}) => {
    const {handleSubmit, register, formState: { errors }} = form;

    return (
        <motion.div
            key="newPassword"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={transition}
        >
            <div className={classNames.titleContainer}>
                <h3 className={classNames.active}>Введіть новий пароль</h3>
            </div>

            <form className={classNames.container} onSubmit={handleSubmit(onSubmit)}>
                <div className={classNames.formItem}>
                    <p>Новий пароль</p>
                    <input
                        type="password"
                        {...register("newPassword", {
                            required: "Введіть новий пароль",
                        })}
                    />
                    {errors.newPassword?.message && (
                        <span className={classNames.error}>
              {String(errors.newPassword.message)}
            </span>
                    )}
                </div>

                <div className={classNames.btns}>
                    <GhostButton onClick={goToLogin}>Скасувати</GhostButton>
                    <SolidButton type="submit">Підтвердити</SolidButton>
                </div>
            </form>
        </motion.div>
    );
};
