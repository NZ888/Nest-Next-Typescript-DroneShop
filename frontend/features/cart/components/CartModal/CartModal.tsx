import Modal from "@/components/ui/Modal/Modal";
import styles from "./CartModal.module.css"
import React from 'react';
import {useAppSelector} from "@/store/redux-toolkit/hooks";
import {selectCartItems} from "@/store/redux-toolkit/selectors/CartSelector";
import {ICartState} from "@/types/cart";
import CartItem from "@/features/cart/components/CartItem/CartItem";

interface CartModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, setIsOpen }: CartModalProps) => {
    const items: ICartState = useAppSelector(selectCartItems)

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={"Кошик"}>
        <div className={styles.container}>
            {
                items.items.length <= 0
                    ? <p className={styles.alert}>Ваш кошик порожній.
                        Почніть вибирати товари, щоб вони з’явилися тут</p>
                    : items.items.map((item) => {
                        return (<CartItem key={item.product.id} item={item}/>)
                    })
            }
        </div>
    </Modal>
  );
};

export default CartModal;
