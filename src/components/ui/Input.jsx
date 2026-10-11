import React, { forwardRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { variants } from '../../lib/variants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  counter?: number;
  maxLength?: number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      counter,
      maxLength,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const { prefersReducedMotion } = useReducedMotion();
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    useEffect(() => {
      setHasValue(props.value !== '' && props.value !== undefined);
    }, [props.value]);

    const floatingLabelVariants = prefersReducedMotion
      ? {}
      : {
          animate: isFocused || hasValue
            ? { y: -24, scale: 0.85, color: '#A8612E' }
            : { y: 0, scale: 1, color: '#1F1612' },
          transition: { type: 'spring', stiffness: 300, damping: 25 },
        };

    const containerVariants = prefersReducedMotion
      ? {}
      : {
          animate: error ? { x: [0, -6, 6, -6, 6, 0] } : {},
          transition: { duration: 0.4, ease: 'easeOut' },
        };

    const borderColor = error
      ? '#A8612E'
      : isFocused
      ? '#A8612E'
      : '#C9A27E';

    return (
      <motion.div
        variants={containerVariants}
        className={`relative w-full ${className}`}
      >
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none">
            {leftIcon}
          </div>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full bg-foam border-2 rounded-xl
              pl-10 pr-10 py-3 text-sm text-ink placeholder:text-ink/40
              focus:outline-none focus:ring-0
              transition-colors duration-200
              ${leftIcon ? 'pl-12' : ''}
              ${rightIcon || counter || maxLength ? 'pr-12' : ''}
              ${error ? 'border-red-500' : isFocused ? 'border-caramel' : 'border-latte/30'}
              ${label ? 'pt-5 pb-2' : ''}
              ${error ? 'hover:border-red-500' : ''}
            `}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            onChange={(e) => {
              setHasValue(e.target.value !== '');
              props.onChange?.(e);
            }}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />

          {label && (
            <motion.label
              htmlFor={inputId}
              variants={floatingLabelVariants}
              className="absolute left-3 pointer-events-none text-sm text-ink/60 transition-colors duration-200"
              style={{ top: label ? '1.25rem' : '50%', transform: label ? undefined : 'translateY(-50%)' }}
            >
              {label}
            </motion.label>
          )}

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none">
              {rightIcon}
            </div>
          )}

          {(counter !== undefined || maxLength) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-ink/40 font-mono">
              {counter !== undefined ? counter : props.value?.length || 0}
              {maxLength && <span> / {maxLength}</span>}
            </div>
          )}
        </div>

        {error && (
          <motion.p
            id={`${inputId}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' }}
            className="mt-1.5 text-xs text-red-600 font-medium"
            role="alert"
          >
            {error}
          </motion.p>
        )}

        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-ink/50">
            {hint}
          </p>
        )}
      </motion.div>
    );
  }
);

Input.displayName = 'Input';

export default Input;