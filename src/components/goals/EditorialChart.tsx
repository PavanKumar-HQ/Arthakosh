"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { formatCurrency } from "@/lib/constants";
import { GoalProjection } from "@/types";

interface EditorialChartProps {
  data: GoalProjection[];
  color: string;
  height?: number;
}

export function EditorialChart({ data, color, height = 280 }: EditorialChartProps) {
  // Sample data to make chart cleaner for long timelines
  const step = Math.max(1, Math.floor(data.length / 24));
  const chartData = data.filter((_, i) => i % step === 0 || i === data.length - 1);

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--muted-foreground)" stopOpacity={0.1} />
              <stop offset="95%" stopColor="var(--muted-foreground)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
          
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            tickFormatter={(value: number) => {
              if (value === 0) return "Now";
              return value >= 12 ? `${Math.round(value / 12)}y` : `${value}m`;
            }}
            dy={10}
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            tickFormatter={(value: number) => {
              if (value === 0) return "0";
              return value >= 100000 
                ? `₹${(value / 100000).toFixed(value % 100000 === 0 ? 0 : 1)}L` 
                : `₹${(value / 1000).toFixed(0)}K`;
            }}
            width={50}
          />
          
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "var(--card)", 
              border: "1px solid var(--border)",
              borderRadius: "12px",
              boxShadow: "0 4px 20px -4px rgba(0,0,0,0.1)",
              fontSize: "12px",
              padding: "12px"
            }}
            formatter={(value: any, name: any) => {
              let label = String(name || "");
              if (name === "projected") label = "Projected Value";
              if (name === "invested") label = "Total Invested";
              if (name === "inflationAdjusted") label = "Inflation-Adjusted Target";
              return [formatCurrency(Number(value)), label];
            }}
            labelFormatter={(label: any) => `Month ${label}`}
            itemSorter={(item: any) => (item.name === "projected" ? -1 : 1)}
          />

          {/* Inflation-Adjusted Target Line */}
          <Area 
            type="monotone" 
            dataKey="inflationAdjusted" 
            stroke="var(--destructive)" 
            strokeWidth={1.5} 
            strokeDasharray="4 4" 
            fill="none" 
            activeDot={false}
          />

          {/* Invested Area */}
          <Area 
            type="monotone" 
            dataKey="invested" 
            stroke="var(--muted-foreground)" 
            strokeWidth={1.5} 
            fill="url(#colorInvested)" 
            activeDot={false}
          />

          {/* Projected Area */}
          <Area 
            type="monotone" 
            dataKey="projected" 
            stroke={color} 
            strokeWidth={2.5} 
            fill="url(#colorProjected)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
