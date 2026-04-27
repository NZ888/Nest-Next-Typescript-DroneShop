import styles from "./ContactsDashboard.module.css"
import ChangeAccountInfoForm from "@/features/dashboard/components/ChangeAccountInfoForm/ChangeAccountInfoForm";

export default function ContactsDashboard() {
    return (
        <>
            <h1>Контактні дані</h1>
            <ChangeAccountInfoForm/>
        </>
    )
}