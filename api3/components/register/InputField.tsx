import React from "react";
import styles from "../styles/Register.module.css";

type InputFieldProps = {
  icon: React.ReactNode;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

export function InputField({
  icon,
  name,
  value,
  placeholder,
  onChange,
  type = "text",
}: InputFieldProps) {
  return (
    <div className={styles.inputContainer}>
      <span className={styles.iconLeft}>{icon}</span>

      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`${styles.inputBase} ${value ? styles.filled : ''}`}
      />
    </div>
  );
}