import React from "react";
import styles from "../Register.module.css";

type SelectFieldProps = {
  icon: React.ReactNode;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
};

export function SelectField({
  icon,
  name,
  value,
  onChange,
  children,
}: SelectFieldProps) {
  return (
    <div className={styles.inputContainer}>
      <span className={styles.iconLeft}>{icon}</span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className={`${styles.inputBase} ${styles.selectBase}`}
      >
        {children}
      </select>
    </div>
  );
}