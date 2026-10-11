import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { variants } from '../../lib/variants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const baseStyles = `
  inline-flex items-center justify-center gap-2 font-bold tracking-wide
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2
  transition-colors duration-200
`;

const variantStyles = {
  primary: 'bg-caramel text-foam hover:bg-[#92541f] shadow-warm',
  secondary: 'bg-almond text-ink hover:bg-latte/50 border border-latte/30',
  ghost: 'bg-transparent text-ink hover:bg-almond/50',
  outline: 'bg-transparent border-2 border-caramel text-caramel hover:bg-caramel hover:text-foam',
  icon: 'p-2 rounded-full bg-almond/50 hover:bg-almond text-ink',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const iconSizeStyles = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const { prefersReducedMotion } = useReducedMotion();
    const isIconOnly = variant === 'icon' && !children;

    const buttonVariants = prefersReducedMotion
      ? {}
      : variant === 'ghost'
      ? variants.buttonGhost
      : variants.buttonPrimary;

    const combinedClassName = `
      ${baseStyles}
      ${variantStyles[variant]}
      ${isIconOnly ? iconSizeStyles[size] : sizeStyles[size]}
      ${fullWidth ? 'w-full' : ''}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      ${className}
    `.trim();

    return (
      <motion.button
        ref={ref}
        disabled={disabled || loading}
        variants={buttonVariants}
        className={combinedClassName}
        {...props}
      >
        {loading && (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            aria-hidden="true"
          />
        )}
        {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span className={loading ? 'opacity-0' : ''}>{children}</span>
        {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;