import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const badgeVariants = cva(
  "inline-flex items-center rounded border px-2 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-none focus:ring-none transition-smooth",
  {
    variants: {
      variant: {
        default:
          "border-primary text-primary hover:text-text-foreground hover:bg-primary cursor-pointer",
        secondary: "",
        destructive: "",
        outline:
          "shadow border-text text-text hover:text-primary hover:border-primary cursor-pointer",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "div";
  return <Comp className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
