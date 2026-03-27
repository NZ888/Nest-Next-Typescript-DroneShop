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
        <p>1</p>
    </Modal>
  );
};

export default CartModal;
