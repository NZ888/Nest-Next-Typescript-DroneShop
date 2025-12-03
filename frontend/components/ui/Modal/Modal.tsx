import React, { ReactNode } from "react";
import styles from "./Modal.module.css";
import { Portal } from "@/components/ui/Portal/Portal";
import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, setIsOpen}) => {
  return (
      <Portal>
        <AnimatePresence mode="wait">
          {isOpen && (
              <motion.div
                  key="modal-overlay"
                  className={styles.container}
                  onMouseDown={() => setIsOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
              >
                <motion.div
                    key="modal-content"
                    className={styles.modal}
                    onMouseDown={(e) => e.stopPropagation()}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                  <div className={styles.modalClose}>
                    <svg
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsOpen(false)}
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                    >
                      <path
                          d="M6 4.66688L10.6669 0L12 1.33312L7.33312 6L12 10.6669L10.6669 12L6 7.33312L1.33312 12L0 10.6669L4.66688 6L0 1.33312L1.33312 0L6 4.66688Z"
                          fill="#0C122A"
                      />
                    </svg>
                  </div>

                  {children}
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>
      </Portal>
  );
};

export default Modal;
