"use client";

import React from 'react';
import styles from "./FeedbackForm.module.css"
import { useForm } from "react-hook-form";
import {IFeedback} from "@/features/feedback/types/feedback";
import {useSendFeedbackMutation} from "@/features/feedback/hooks/useFeedbackMutation";
import { useWatch } from "react-hook-form";
import SolidButton from "@/components/ui/SolidBtn/SolidButton";

type FeedbackFormProps = object
type FeedbackFormData = Omit<IFeedback, "createdAt">;

const FeedbackForm: React.FC<FeedbackFormProps> = ({  }) => {

    const feedbackForm = useForm<FeedbackFormData>({mode: "onChange"});
    const {register, handleSubmit, formState: {errors}, control, reset} = feedbackForm;
    const feedbackMutation = useSendFeedbackMutation()
    const message = useWatch({
        control,
        name: "message",
    });

    const handleFeedback = (data: FeedbackFormData) =>{
        feedbackMutation.mutate(data, {
            onError: (err: Error)=> {

            },
            onSuccess: () => {
                reset()
            },
        })
    }

  return (
      <>
        <form id="feedback-form" className={styles.form} onSubmit={handleSubmit(handleFeedback)}>
            <div className={styles.formItem}>
                <p>Імʼя</p>
                <input
                    type="text"
                    {...register("name", {
                        required: "Введіть імʼя",
                    })}
                    maxLength={25}
                    placeholder="Ваше Імʼя"
                />
                {errors.name?.message && (
                    <span className={styles.error}>{String(errors.name.message)}</span>
                )}
            </div>
            <div className={styles.formItem}>
                <p>Телефон</p>
                <input
                    type="text"
                    {...register("phone", {
                        required: "Введіть телефон",
                        pattern: {
                            value: /^\+380\d{9}$/,
                            message: "Формат повинен бути: +380XXXXXXXXX"
                        }
                    })}
                    placeholder="+380"
                />
                {errors.phone?.message && (
                    <span className={styles.error}>{String(errors.phone.message)}</span>
                )}
            </div>
            <div className={styles.formItem}>
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
                    placeholder="Ваш e-mail"
                />
                {errors.email?.message && (
                    <span className={styles.error}>{String(errors.email.message)}</span>
                )}
            </div>
            <div className={styles.formItem}>
                <p>Повідомлення</p>
                <textarea
                    placeholder='Ваше повідомлення'
                    maxLength={1000}
                    {...register("message", {
                        required: "Введіть повідомлення",
                        maxLength: {
                            value: 999,
                            message: "Максимум 1000 символів",
                        },
                    })}
                />
                <p>{message?.length || 0} / 1000</p>
                {errors.message?.message && (
                    <span className={styles.error}>{String(errors.message.message)}</span>
                )}
            </div>
        </form>
          <SolidButton type="submit" form="feedback-form" className={styles.btn}>
              Надіслати
          </SolidButton>
      </>
  );
};

export default FeedbackForm;
