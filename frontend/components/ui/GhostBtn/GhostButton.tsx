import React from 'react';
import styles from "./GhostButton.module.css";

interface GhostButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
    className?: string;
}

const GhostButton: React.FC<GhostButtonProps> = ({ children, onClick, disabled = false, type = "button", className = "" }) => {
  return (
      <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`${styles.ghostButton} ${className}`}
      >
          {children}
      </button>
  );
};

export default GhostButton;
