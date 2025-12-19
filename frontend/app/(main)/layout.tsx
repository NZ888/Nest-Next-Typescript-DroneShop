import type { ReactNode } from 'react'
import styles from "./main.module.css"

export default function AboutLayout({children}: {children: ReactNode }) {
    return (
        <section className={styles.container}>
            {children}
        </section>
    )
}
