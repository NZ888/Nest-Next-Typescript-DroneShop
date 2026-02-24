import {IProduct} from "@/types/product";
import styles from "./IntroProductSection.module.css";
import Image from "next/image";
import SolidButton from "@/components/ui/SolidBtn/SolidButton";
import Link from "next/link";
import {PAGES} from "@/config/pages.config";
import CartBtn from "@/components/product/IntroProductSection/CartBtn";

type IntroProductSectionProps = Pick<IProduct, "name" | "slug" | "price" | "mainImage" | "oldPrice" | "shortDesc">

export default async function IntroProductSection(product: IntroProductSectionProps){
    return (
    <div className={styles.container}>
        <h2>
            {product.name}
        </h2>
        <div className={styles.shortDesc}>
            <p>
                {product.shortDesc}
            </p>
        </div>
        <div className={styles.imageWrapper}>
            <Image src={product.mainImage} width={955} height={955} alt={"drone"} draggable={false} />
        </div>
        <div className={styles.promo}>
            <div style={{width:'70%'}} >
                <div className={styles.order}>
                    <div className={styles.orderInfo}>
                        <Image src={product.mainImage} width={50} height={50} alt={"drone"} draggable={false} />
                        <div className={styles.info}>
                            <p>
                                {product.name}
                            </p>
                            <div className={styles.priceInfo}>
                                {product.oldPrice &&(
                                    <p style={{ fontWeight: "500", fontSize: "14px", textDecoration:"line-through" }}>
                                        {product.oldPrice}
                                    </p>
                                )}
                                <h3 style={{fontWeight: "500", fontSize: "14px", color:"#B62D11FF"}}>
                                    {product.price}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ordersBtns}>
                        <CartBtn/>
                        <SolidButton>
                            <Link style={{textDecoration: "none", color:"white"}} href={PAGES.STORE()}>ЗАМОВИТИ </Link>
                        </SolidButton>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.bgCurve}></div>
    </div>
    )
}