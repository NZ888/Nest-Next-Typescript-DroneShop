import React from 'react';
import styles from "./CatalogItem.module.css"
import Image from "next/image";
import Link from "next/link";
import {PAGES} from "@/config/pages.config";
interface CatalogItemProps {
  title: string;
  price: number;
  oldPrice?: number;
  slug: string;
  imageUrl: string;
}

const CatalogItem: React.FC<CatalogItemProps> = ({ title, price, oldPrice, slug, imageUrl }) => {
  return (
    <div className={styles.item}>
        <div className={styles.imageWrapper}>
            <Image src={imageUrl} alt={title} width={161} height={100} />
        </div>
        <div className={styles.textInfo}>
            <Link className={styles.a} href={PAGES.PRODUCT(slug)}>
                <h3>{title}</h3>
            </Link>
        </div>
        <div className={styles.price}>
            {oldPrice ? (
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap:"16px"}}>
                    <p className={styles.priceDefault}>{oldPrice}</p>
                    <p className={styles.priceSale}>{price}</p>
                </div>
            ) : (
                <div className={styles.priceWithoutSale}><p>{price}</p></div>
            )}
        </div>
    </div>
  );
};

export default CatalogItem;
