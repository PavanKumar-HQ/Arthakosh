"use client";

import { formatCurrency } from "@/lib/constants";
import { Card } from "@/components/ui/card";

interface ResultCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  isCurrency?: boolean;
  highlight?: boolean;
  subtitle?: string;
  className?: string;
}

export function ResultCard({
  label,
  value,
  prefix,
  suffix,
  isCurrency = true,
  highlight = false,
  subtitle,
  className = "",
}: ResultCardProps) {
  const displayValue = isCurrency ? formatCurrency(value) : value.toLocaleString("en-IN");

  return (
    <Card
      className={`p-4 ${
        highlight
          ? "border-emerald/30 bg-emerald/5 dark:bg-emerald/5"
          : ""
      } ${className}`}
    >
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
        {label}
      </p>
      <p
        className={`text-2xl font-bold font-tabular tracking-tight ${
          highlight ? "text-emerald" : "text-foreground"
        }`}
      >
        {prefix}
        {displayValue}
        {suffix}
      </p>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      )}
    </Card>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  description,
  icon,
  trend,
  trendValue,
  className = "",
}: StatCardProps) {
  return (
    <Card className={`p-5 ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {icon && (
          <div className="text-muted-foreground">{icon}</div>
        )}
      </div>
      <p className="text-2xl font-bold font-tabular tracking-tight">
        {value}
      </p>
      {(description || trendValue) && (
        <div className="flex items-center gap-2 mt-2">
          {trend && trendValue && (
            <span
              className={`text-xs font-medium ${
                trend === "up"
                  ? "text-emerald"
                  : trend === "down"
                  ? "text-rose"
                  : "text-muted-foreground"
              }`}
            >
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}{" "}
              {trendValue}
            </span>
          )}
          {description && (
            <span className="text-xs text-muted-foreground">
              {description}
            </span>
          )}
        </div>
      )}
    </Card>
  );
}
