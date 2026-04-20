"use client"
import styles from "./DashboardLayout.module.css"
import {IUser} from "@/types/user";
import {useState} from "react";

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
                <div>
                    <div data-section={sections.contactInfo} onClick={()=>{setSection("contactInfo")}}><p>contactInfo</p></div>
                    <div data-section={sections.orders} onClick={()=>{setSection("orders")}}><p>orders</p></div>
                    <div data-section={sections.addresses} onClick={()=>{setSection("addresses")}}><p>addresses</p></div>
                    <div data-section={sections.logout} onClick={()=>{setSection("logout")}}><p>logout</p></div>
                </div>
            </div>
            <section className={styles.section}>

            </section>
        </div>
    )
}