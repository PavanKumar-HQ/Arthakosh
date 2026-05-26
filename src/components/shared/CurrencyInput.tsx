"use client";

import { useId } from "react";
import { formatCurrency } from "@/lib/constants";

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  id?: string;
}

export function CurrencyInput({
  value,
  onChange,
  label,
  min = 0,
  max = 100000000,
  step = 1000,
  className = "",
  id: propId,
}: CurrencyInputProps) {
  const autoId = useId();
  const id = propId || autoId;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const num = parseInt(raw, 10);
    if (!isNaN(num) && num >= min && num <= max) {
      onChange(num);
    } else if (raw === "") {
      onChange(0);
    }
  };

  const displayValue = value > 0 ? value.toLocaleString("en-IN") : "";

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-foreground mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
          ₹
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          placeholder="0"
          className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm font-tabular focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring transition-colors"
        />
      </div>
      {value > 0 && (
        <p className="mt-1 text-xs text-muted-foreground">
          {formatCurrency(value)}
        </p>
      )}
    </div>
  );
}
