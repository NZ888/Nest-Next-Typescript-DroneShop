import React from 'react';
import styles from './SolidButton.module.css'
interface SolidButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}


const SolidButton: React.FC<SolidButtonProps> = ({ children, onClick, disabled = false, type = "button", className = "" }) => {
  return (
      <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`${styles.solidButton} ${className}`}
      >
        {children}
      </button>
  );
};

export default SolidButton;
