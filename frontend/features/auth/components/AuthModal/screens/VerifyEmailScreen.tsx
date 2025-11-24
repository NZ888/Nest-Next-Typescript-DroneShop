"use client";

import React from "react";
import { motion } from "framer-motion";
import GhostButton from "@/components/ui/GhostBtn/GhostButton";
import SolidButton from "@/components/ui/SolidBtn/SolidButton";
import {VerifyEmailScreenProps} from "../types";

const transition = { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] as any };

export const VerifyEmailScreen: React.FC<VerifyEmailScreenProps> = ({form, onSubmit, goToRegister, classNames,}) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = form;

    return (
        <motion.div
            key="verify"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={transition}
        >
            <div className={classNames.titleContainer}>
                <h3 className={classNames.active}>Підтвердження</h3>
            </div>

            <form className={classNames.container} onSubmit={handleSubmit(onSubmit)}>
                <div className={classNames.formItem}>
                    <p>Код з email</p>
                    <input
                        type="text"
                        {...register("code", {
                            required: "Введіть код",
                        })}
                    />
                    {errors.code?.message && (
                        <span className={classNames.error}>{String(errors.code.message)}</span>
                    )}
                </div>

                <div className={classNames.btns}>
                    <GhostButton onClick={goToRegister}>Назад</GhostButton>
                    <SolidButton type="submit">Підтвердити</SolidButton>
                </div>
            </form>
        </motion.div>
    );
};
