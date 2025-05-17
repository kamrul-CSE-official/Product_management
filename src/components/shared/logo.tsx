import React from "react";
import { BoxIcon } from "lucide-react";
import { cn } from "@/lib/utils"; // If you're using the `cn` utility from shadcn

type LogoSize = "sm" | "md" | "lg" | "xl";

interface LogoProps {
  size?: LogoSize;
  className?: string;
  sol?: boolean;
}

const sizeStyles: Record<LogoSize, { icon: string; title: string; subtitle: string }> = {
  sm: {
    icon: "w-5 h-5",
    title: "text-lg",
    subtitle: "text-xs",
  },
  md: {
    icon: "w-6 h-6",
    title: "text-xl",
    subtitle: "text-sm",
  },
  lg: {
    icon: "w-8 h-8",
    title: "text-2xl",
    subtitle: "text-base",
  },
  xl: {
    icon: "w-10 h-10",
    title: "text-3xl",
    subtitle: "text-lg",
  },
};

const Logo: React.FC<LogoProps> = ({ size = "md", className, sol= true }) => {
  const styles = sizeStyles[size];

  return (
    <div className={cn("flex flex-row items-start space-y-1", className)}>
      <BoxIcon className={cn(styles.icon, "text-foreground")} />
      <h1 className={cn(styles.title, "font-bold text-foreground")}>
        Product Management
      </h1>
      {sol && <p className={cn(styles.subtitle, "text-muted-foreground")}>
        Best product management tool for your team
      </p>}
    </div>
  );
};

export default Logo;
