import { forwardRef, type HTMLAttributes, type FC } from "react"
import { cn } from "@/utils/helpers";
import { cva, type VariantProps } from "class-variance-authority";

const chip = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors w-fit",
  {
    variants: {
      variant: {
        default: "bg-slate-300 text-white hover:bg-slate-300/90",
        primary: "bg-blue-300 text-blue-500 hover:bg-blue-300/90",
        success: "bg-green-300 text-green-500 hover:bg-green-300/80",
        warning: "bg-orange-200 text-orange-500 hover:bg-orange-200/80",
        danger: "bg-red-300 text-red-500 hover:bg-red-300/80",
      },
      rounded: {
        basic: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-2xl",
        full: "rounded-full"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-7 px-3 text-sm",
        md: "h-9 px-5 text-lg",
        lg: "h-13 px-12 text-lg",
        full: "h-16 px-14 w-full text-2xl"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
      rounded: "md"
    }
  }
);

export interface ChipProps extends HTMLAttributes<HTMLSpanElement>, 
VariantProps<typeof chip> {}


export const Chip: FC<ChipProps> = forwardRef<HTMLButtonElement, ChipProps>
(({ children, className, variant, size, rounded, ...props }, ref) => {
  
  return (
      <span 
          className={cn(chip({ variant, size, rounded, className }))}
          {...props} 
          ref={ref}
      >
      { children }
      </span>
  )
})
