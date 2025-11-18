"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import styles from "../styles/Register.module.css";

type SelectFieldProps = {
  icon: React.ReactNode;
  name: string;
  value: string;
  options: string[];
  placeholder?: string;
  onChange: (value: string, name: string) => void;
};

export function SelectField({
  icon,
  name,
  value,
  options,
  placeholder = "Selecione",
  onChange,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className={styles.select_wrapper} ref={dropdownRef}>
      <div className={`${styles.select_display} ${value ? 'filled' : ''}`} onClick={() => setOpen(!open)}>
        <div className={styles.select_icon}>{icon}</div>

        <span className={value ? "" : styles.placeholder}>
          {value || placeholder}
        </span>

        <ChevronDown className={open ? styles.select_arrow_open : styles.select_arrow} />
      </div>

      {open && (
        <div className={styles.select_dropdown}>
          {options.map((opt) => (
            <div
              key={opt}
              className={styles.select_option}
              onClick={() => {
                onChange(opt, name);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}