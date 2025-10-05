import { forwardRef, type HTMLAttributes, type FC } from 'react';
import { cn } from '@/utils/helpers';
import { cva, type VariantProps } from 'class-variance-authority';

const avatar = cva('rounded-full flex items-center justify-center overflow-hidden', {
  variants: {
    variant: {
      default: 'bg-slate-500 text-white',
      primary: 'bg-blue-500 text-white',
      success: 'bg-green-500 text-white',
      warning: 'bg-orange-500 text-white',
      danger: 'bg-red-500 text-white',
    },
    size: {
      sm: 'h-[32px] w-[32px] text-sm',
      md: 'h-[48px] w-[48px] text-base',
      lg: 'h-[64px] w-[64px] text-lg',
      xl: 'h-[200px] w-[200px] text-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm',
  },
});

export type AvatarVariants = 'primary' | 'success' | 'warning' | 'danger';

export interface AvatarProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatar> {
      
    }

export const Avatar: FC<AvatarProps> = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ children, className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(avatar({ variant, size }), className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';
