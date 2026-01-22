import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./StorePage.module.css"
import {API} from "@/config/api";
import {handleResponse} from "@/lib/helpers";

export default async function StorePage(){
    const res: Response = await fetch(API.routes.products.allProducts(0, 16), {
        next: {revalidate: 3600}
    })
    const products = handleResponse(res)
    return (
        <>
            <Header/>
            <div className={styles.productGrid}>

            </div>
            <Footer/>
        </>
    )
}