import type { ReactNode } from 'react'
import styles from "./contacts.module.css"
export default function ContactsLayout({children}: {children: ReactNode }) {
    return (
        <section className={styles.container}>
            {children}
        </section>
    )
}