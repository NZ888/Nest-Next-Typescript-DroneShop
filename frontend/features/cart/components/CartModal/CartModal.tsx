import Modal from "@/components/ui/Modal/Modal";
import styles from "./CartModal.module.css"
import React from 'react';

interface CartModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, setIsOpen }: CartModalProps) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={"Кошик"}>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis delectus deleniti dignissimos dolor earum incidunt magnam maiores modi, natus neque nesciunt officia, optio quos reiciendis reprehenderit sed similique ut vero.</p>
    </Modal>
  );
};

export default CartModal;
