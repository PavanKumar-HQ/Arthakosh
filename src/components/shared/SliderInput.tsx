"use client";

import { useId } from "react";

interface SliderInputProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  label?: string;
  valueLabel?: string;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function SliderInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  valueLabel,
  suffix = "",
  prefix = "",
  className = "",
}: SliderInputProps) {
  const id = useId();
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={className}>
      {(label || valueLabel) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <label
              htmlFor={id}
              className="text-sm font-medium text-foreground"
            >
              {label}
            </label>
          )}
          <span className="text-sm font-semibold font-tabular text-foreground">
            {prefix}
            {valueLabel || value.toLocaleString("en-IN")}
            {suffix}
          </span>
        </div>
      )}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-secondary rounded-full appearance-none cursor-pointer accent-foreground
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-foreground
          [&::-webkit-slider-thumb]:shadow-sm
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:transition-transform
          [&::-webkit-slider-thumb]:duration-150
          [&::-webkit-slider-thumb]:hover:scale-110
          [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-foreground
          [&::-moz-range-thumb]:border-0
          [&::-moz-range-thumb]:cursor-pointer"
        style={{
          background: `linear-gradient(to right, var(--foreground) 0%, var(--foreground) ${percentage}%, var(--secondary) ${percentage}%, var(--secondary) 100%)`,
        }}
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-muted-foreground">
          {prefix}{min.toLocaleString("en-IN")}{suffix}
        </span>
        <span className="text-xs text-muted-foreground">
          {prefix}{max.toLocaleString("en-IN")}{suffix}
        </span>
      </div>
    </div>
  );
}
