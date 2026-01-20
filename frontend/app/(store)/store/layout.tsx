import type { ReactNode } from 'react'
import styles from "./store.module.css"
export default function StoreLayout({children}: {children: ReactNode }) {
    return (
        <section className={styles.container}>
            {children}
        </section>
    )
}