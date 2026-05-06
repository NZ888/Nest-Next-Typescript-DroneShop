"use client"
import styles from "./DashboardLayout.module.css"
import {IUser} from "@/types/user";
import {useState} from "react";
import ContactsDashboard from "@/components/dashboard/ContactsDashboard/ContactsDashboard";
import {logout} from "@/features/auth/services/auth.service";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "@/store/redux-toolkit/hooks";
import {authApi} from "@/store/redux-toolkit/slices/auth/auth.slice";

interface DashboardLayoutProps {
    user: IUser | undefined
}
const sections = {
    contactInfo: 'contactInfo',
    orders: 'orders',
    addresses: 'addresses',
    logout: 'logout'
} as const

type Sections = (typeof sections)[keyof typeof sections]

export default function DashboardLayout({user}: DashboardLayoutProps) {
    const [section, setSection] = useState<Sections>("contactInfo")
    const router = useRouter()
    const dispatch = useAppDispatch()
    const handleLogout = async ()=>{
        await logout()
        dispatch(authApi.util.resetApiState())
        router.push("/")
        router.refresh()
        console.log(user)
    }

    return (
        <div className={styles.layout}>
            <div className={styles.panel}>
                <h2>Особистий <br/> Кабінет</h2>
                <div className={styles.sectionSelect}>
                    <div data-section={sections.contactInfo} onClick={()=>{setSection("contactInfo")}}><p style={section === "contactInfo" ? {color: "#0c122a"} : {cursor:"pointer"}}>Контактні дані</p></div>
                    <div data-section={sections.orders} onClick={()=>{setSection("orders")}}><p style={section === "orders" ? {color: "#0c122a"} : {cursor:"pointer"}} >мої замовлення</p></div>
                    <div data-section={sections.addresses} onClick={()=>{setSection("addresses")}}><p style={section === "addresses" ? {color: "#0c122a"} : {cursor:"pointer"}}>адреса доставки</p></div>
                    <div className={styles.line}></div>
                    <div data-section={sections.logout} onClick={()=>{handleLogout()}}><p style={section === "logout" ? {color: "#0c122a"} : {cursor:"pointer"}}>вийти</p></div>
                </div>

            </div>
            <section className={styles.section}>
                {
                    section === "contactInfo" && (
                        <ContactsDashboard userId={user?.uuid}/>
                    )
                }
                {
                    section === "orders" && (
                        <h1>orders</h1>
                    )
                }
            </section>
        </div>
    )
}