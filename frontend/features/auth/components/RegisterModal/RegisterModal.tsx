import React from 'react';
import Modal from "@/components/ui/Modal/Modal";

interface RegisterModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    children?: React.ReactNode;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, setIsOpen }: RegisterModalProps)  => {
  return (
    <>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <h1>Hello register</h1>
        </Modal>
    </>
  );
};

export default RegisterModal;
