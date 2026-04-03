import React from 'react';
import {TCartItem} from "@/types/cart";
import styles from "./CartItem.module.css"
import Image from "next/image";
import {PAGES} from "@/config/pages.config";
import Link from "next/link";
import {svgToJsx} from "@/lib/helpers";
import {makeSelectItemQuantity} from "@/store/redux-toolkit/selectors/CartSelector";
import {useAppSelector} from "@/store/redux-toolkit/hooks";
interface CartItemProps {
  item: TCartItem
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const {id, price, oldPrice, slug, name, mainImage} = item.product;
    const itemQuantity: number = useAppSelector(makeSelectItemQuantity(id))
    console.log(itemQuantity)
  return (
    <div className={styles.container}>
        <div className={styles.infoContainer}>
            <div className={styles.imageContainer}>
                <Image src={mainImage} width={108} height={86} alt={name} />
            </div>
            <div className={styles.descriptionContainer}>
                <p className={styles.title}>
                    <Link className={styles.a} href={PAGES.PRODUCT(slug)}>{name}</Link>
                </p>
                {oldPrice
                    ?(
                        <div style={{display: "flex", gap: "12px"}}>
                            <p className={styles.oldPrice}>{oldPrice}</p>
                            <p className={styles.price}>{price}</p>
                        </div>
                    )
                    : <p className={styles.price}>{price}</p>
                }

            </div>
        </div>
        <div className={styles.interactiveContainer}>
            <div className={styles.counterContainer}>
                <div className={styles.changeCountBtn}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.33325 7.33333L8.66658 7.33301L12.6666 7.33333V8.66667H8.66658H7.33325H3.33325V7.33333H7.33325Z" fill="#3D4155" style={{ fill: "#3D4155",  fillOpacity: "1" }} />
                    </svg>
                </div>
                <div className={styles.counterText}>
                    <p>{itemQuantity}</p>
                </div>
                <div className={styles.changeCountBtn}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.33325 7.33337V3.33337H8.66658V7.33337H12.6666V8.66671H8.66658V12.6667H7.33325V8.66671H3.33325V7.33337H7.33325Z" fill="#3D4155" style={{ fill: "#3D4155",  fillOpacity: "1" }} />
                    </svg>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CartItem;
