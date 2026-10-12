import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Volt never carries white text — it sits at ~1.3:1 against white. Every
 * accent-filled variant pairs volt with navy ink instead.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-[background-color,color,border-color,transform] duration-200 ease-[var(--ease-out-expo)] disabled:pointer-events-none disabled:opacity-45 active:translate-y-px [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--accent)] text-[var(--accent-fg)] hover:bg-[var(--accent-hover)]",
        solid:
          "bg-navy-900 text-white hover:bg-navy-800",
        outline:
          "border border-navy-900/20 bg-transparent text-navy-900 hover:border-navy-900 hover:bg-navy-900 hover:text-white",
        outlineLight:
          "border border-white/25 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy-900",
        ghost:
          "bg-transparent text-navy-900 hover:bg-navy-900/6",
        ghostLight:
          "bg-transparent text-white/80 hover:bg-white/10 hover:text-white",
      },
      size: {
        sm: "h-9 px-4 text-[13px] [&_svg]:size-4",
        md: "h-11 px-6 text-sm [&_svg]:size-4",
        lg: "h-14 px-8 text-[15px] [&_svg]:size-[18px]",
        icon: "size-10 [&_svg]:size-[18px]",
      },
      shape: {
        pill: "rounded-full",
        square: "rounded-[2px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md", shape: "pill" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, shape, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, shape }), className)} {...props} />;
}

export { buttonVariants };
