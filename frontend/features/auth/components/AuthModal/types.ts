import type { UseFormReturn } from "react-hook-form";
import type { ILoginFormValues } from "@/types/login";
import type { IRegisterFormValues } from "@/types/register";


export type AuthScreen =
    | "login"
    | "register"
    | "reset"
    | "verify"
    | "newPassword"
    | "emailConfirm"
    | "verifyEmail";


export interface RegisterModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}



export interface LoginFormValues extends ILoginFormValues {}

export interface RegisterFormValues extends IRegisterFormValues {}

export interface ResetFormValues {
    email: string;
}

export interface EmailVerifyFormValues {
    email: string;
}

export interface EmailConfirmFormValues {
    code: string;
}

export interface VerifyFormValues {
    code: string;
}

export interface VerifyEmailFormValues {
    code: string;
}

export interface NewPasswordFormValues {
    newPassword: string;
}


export interface AuthClassNames {
    wrapper?: string;
    titleContainer: string;
    active: string;
    inactive?: string;
    container: string;
    formItem: string;
    forgotPass?: string;
    error: string;
    btns: string;
}


export interface EmailConfirmScreenProps {
    form: UseFormReturn<EmailVerifyFormValues>;
    onSubmit: (data: EmailVerifyFormValues) => void;
    goToLogin: () => void;
    classNames: {
        titleContainer: string;
        active: string;
        container: string;
        formItem: string;
        error: string;
        btns: string;
    };
}

export interface LoginScreenProps {
    form: UseFormReturn<LoginFormValues>;
    onSubmit: (data: LoginFormValues) => void;
    goToReset: () => void;
    goToRegister: () => void;
    closeModal: () => void;
    classNames: AuthClassNames;
}

export interface RegisterScreenProps {
    form: UseFormReturn<RegisterFormValues>;
    onSubmit: (data: RegisterFormValues) => void;
    goToLogin: () => void;
    classNames: AuthClassNames;
}

export interface ResetScreenProps {
    form: UseFormReturn<ResetFormValues>;
    onSubmit: (data: ResetFormValues) => void;
    goToLogin: () => void;
    classNames: AuthClassNames;
}

export interface VerifyScreenProps {
    form: UseFormReturn<VerifyFormValues>;
    onSubmit: (data: VerifyFormValues) => void;
    goToReset: () => void;
    classNames: AuthClassNames;
}

export interface VerifyEmailScreenProps {
    form: UseFormReturn<VerifyEmailFormValues>;
    onSubmit: (data: VerifyEmailFormValues) => void;
    goToRegister: () => void;
    classNames: AuthClassNames;
}

export interface NewPasswordScreenProps {
    form: UseFormReturn<NewPasswordFormValues>;
    onSubmit: (data: NewPasswordFormValues) => void;
    goToLogin: () => void;
    classNames: AuthClassNames;
}
export interface IRegisterData{
    name: string;
    email: string;
    password: string;
    confirmToken?: string;
}