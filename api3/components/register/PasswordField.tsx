import React from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import styles from "../Register.module.css";

type PasswordFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
};

export function PasswordField({
  label,
  name,
  value,
  onChange,
  showPassword,
  setShowPassword,
}: PasswordFieldProps) {
  return (
    <div className={styles.inputContainer}>
      <Lock className={styles.iconLeft} size={20} />

      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={label}
        required
        className={styles.inputBase}
        autoComplete="new-password"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF7FE5]/70 hover:text-[#FF7FE5]"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}