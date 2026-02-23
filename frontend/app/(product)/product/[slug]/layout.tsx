import type { ReactNode } from 'react'
import styles from "./product.module.css"
export default function ProductLayout({children}: {children: ReactNode }) {
    return (
        <section className={styles.container}>
            {children}
        </section>
    )
}
