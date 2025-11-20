import React, {ReactNode} from 'react';
import styles from "./Modal.module.css"
import {Portal} from "@/components/ui/Portal/Portal";
import {svgToJsx} from "@/lib/helpers";
interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
console.log(svgToJsx(`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 4.66688L10.6669 0L12 1.33312L7.33312 6L12 10.6669L10.6669 12L6 7.33312L1.33312 12L0 10.6669L4.66688 6L0 1.33312L1.33312 0L6 4.66688Z" fill="#0C122A" style="fill:#0C122A;fill:color(display-p3 0.0471 0.0706 0.1647);fill-opacity:1;" />
</svg>`))
const Modal: React.FC<ModalProps> = ({ children, isOpen, setIsOpen } : ModalProps) => {
  return (
      <>
          {isOpen && (
              <Portal>
                  <div className={styles.container} onMouseDown={() => setIsOpen(false)}>
                      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
                          <div className={styles.modalClose}>
                              <svg style={{cursor:"pointer"}} onClick={() => setIsOpen(false)} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M6 4.66688L10.6669 0L12 1.33312L7.33312 6L12 10.6669L10.6669 12L6 7.33312L1.33312 12L0 10.6669L4.66688 6L0 1.33312L1.33312 0L6 4.66688Z" fill="#0C122A" style={{ fill: "#0C122A", fillOpacity: "1" }} />
                              </svg>
                          </div>
                          {children}
                      </div>
                  </div>
              </Portal>
          )}
      </>
  );
};

export default Modal;
