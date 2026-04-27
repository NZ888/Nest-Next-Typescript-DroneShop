import React from 'react';
import {useForm} from "react-hook-form";
import {IUserInfo} from "@/features/dashboard/types/account";
import styles from "./ChangeAccountInfoForm.module.css"
type ChangeAccountInfoFormProps = object

const ChangeAccountInfoForm: React.FC<ChangeAccountInfoFormProps> = ({  }) => {
    const changeAccountInfoForm = useForm<IUserInfo>({mode: "onChange"});
    const {register, handleSubmit, formState: {errors}, control, reset} = changeAccountInfoForm;
    return (
    <form>
        <div className={styles.formItem}>
            <p>Прізвище</p>
            <input
                type="text"
                {...register("surename", {
                    required: "Введіть Прізвище",
                })}
                maxLength={25}
                placeholder="Ваше Прізвище"
            />
            {errors.surename?.message && (
                <span className={styles.error}>{String(errors.surename.message)}</span>
            )}
        </div>
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
            <p>По батькові</p>
            <input
                type="text"
                {...register("middleName", {

                })}
                maxLength={25}
                placeholder="По батькові"
            />
            {errors.middleName?.message && (
                <span className={styles.error}>{String(errors.middleName.message)}</span>
            )}
        </div>
        <div className={styles.formItem}>
            <p>Дата народження</p>
            <input
                type="date"
                {...register("dateOfBirth", {

                })}
                maxLength={25}
                placeholder="Дата народження"
            />
            {errors.dateOfBirth?.message && (
                <span className={styles.error}>{String(errors.dateOfBirth.message)}</span>
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
    </form>
  );
};

export default ChangeAccountInfoForm;
