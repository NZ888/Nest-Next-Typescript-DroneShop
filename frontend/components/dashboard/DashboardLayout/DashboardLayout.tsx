"use client"
import styles from "./DashboardLayout.module.css"
import {IUser} from "@/types/user";
import {useState} from "react";
import ContactsDashboard from "@/components/dashboard/ContactsDashboard/ContactsDashboard";

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
    console.log(section)
    return (
        <div className={styles.layout}>
            <div className={styles.panel}>
                <h2>Особистий <br/> Кабінет</h2>
                <div className={styles.sectionSelect}>
                    <div data-section={sections.contactInfo} onClick={()=>{setSection("contactInfo")}}><p style={{cursor:"pointer"}}>Контактні дані</p></div>
                    <div data-section={sections.orders} onClick={()=>{setSection("orders")}}><p style={{cursor:"pointer"}}>мої замовлення</p></div>
                    <div data-section={sections.addresses} onClick={()=>{setSection("addresses")}}><p style={{cursor:"pointer"}}>адреса доставки</p></div>
                    <div className={styles.line}></div>
                    <div data-section={sections.logout} onClick={()=>{setSection("logout")}}><p style={{cursor:"pointer"}}>вийти</p></div>
                </div>

            </div>
            <section className={styles.section}>
                {
                    section === "contactInfo" && (
                        <ContactsDashboard/>
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