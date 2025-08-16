import React, { useState, useRef, forwardRef, useEffect } from 'react';
import type { InputFieldProps, InputFieldState } from './InputField.types';

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  // Core props
  value = '',
  onChange,
  
  // Content props
  label,
  placeholder,
  helperText,
  errorMessage,
  
  // State props
  disabled = false,
  invalid = false,
  loading = false,
  
  // Styling props
  variant = 'outlined',
  size = 'md',
  
  // Optional features
  clearable = false,
  passwordToggle = false,
  
  // Input type and attributes
  type = 'text',
  name,
  id,
  autoComplete,
  
  // Custom styling
  className = '',
  
  ...restProps
}, ref) => {
  const [state, setState] = useState<InputFieldState>({
    isFocused: false,
    hasValue: !!value,
    showPassword: type === 'password' ? false : true,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const combinedRef = (node: HTMLInputElement) => {
    inputRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  // Update hasValue when value changes
  useEffect(() => {
    setState(prev => ({ ...prev, hasValue: !!value }));
  }, [value]);

  // Size classes with comprehensive sizing - Make differences more dramatic
  const sizeClasses = {
    sm: {
      input: 'px-2 py-1 text-xs h-8 min-h-[32px] leading-tight',
      label: 'text-xs mb-1 font-medium',
      helper: 'text-xs mt-1',
      error: 'text-xs mt-1',
      icon: 'w-3 h-3',
      button: 'p-0.5',
      spacing: 'space-y-1'
    },
    md: {
      input: 'px-4 py-3 text-base h-12 min-h-[48px] leading-normal',
      label: 'text-base mb-2 font-semibold',
      helper: 'text-sm mt-1',
      error: 'text-sm mt-1',
      icon: 'w-4 h-4',
      button: 'p-1.5',
      spacing: 'space-y-2'
    },
    lg: {
      input: 'px-6 py-5 text-xl h-16 min-h-[64px] leading-relaxed',
      label: 'text-xl mb-3 font-bold',
      helper: 'text-lg mt-2',
      error: 'text-lg mt-2',
      icon: 'w-6 h-6',
      button: 'p-2',
      spacing: 'space-y-3'
    }
  };

  // Variant classes with dark theme support and enhanced styling
  const variantClasses = {
    filled: 'bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-400 shadow-sm',
    outlined: 'bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 focus:border-blue-500 dark:focus:border-blue-400 shadow-sm',
    ghost: 'bg-transparent border-2 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-700 focus:bg-gray-50 dark:focus:bg-gray-800 focus:border-gray-300 dark:focus:border-gray-600',
  };

  // State classes
  const stateClasses = {
    disabled: 'opacity-50 cursor-not-allowed',
    invalid: 'border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400',
    loading: 'opacity-75',
  };

  // Get current size configuration
  const currentSize = sizeClasses[size as keyof typeof sizeClasses];

  // Base input classes with dark theme support
  const baseInputClasses = `
    w-full rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20
    placeholder:text-gray-400 dark:placeholder:text-gray-500
    text-gray-900 dark:text-gray-100
    ${currentSize.input}
    ${variantClasses[variant as keyof typeof variantClasses]}
    ${disabled ? stateClasses.disabled : ''}
    ${invalid ? stateClasses.invalid : ''}
    ${loading ? stateClasses.loading : ''}
  `;

  // Handle value changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setState((prev: InputFieldState) => ({ ...prev, hasValue: !!newValue }));
    onChange?.(e);
  };

  // Handle clear button
  const handleClear = () => {
    setState((prev: InputFieldState) => ({ ...prev, hasValue: false }));
    // Trigger onChange with empty value
    const event = {
      target: { value: '', name: name || '' }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(event);
  };

  // Handle password toggle
  const togglePassword = () => {
    setState((prev: InputFieldState) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  // Determine input type
  const inputType = type === 'password' && state.showPassword ? 'text' : type;

  return (
    <div className={`${currentSize.spacing} ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id || name}
          className={`
            block font-medium text-gray-700 dark:text-gray-300
            ${currentSize.label}
            ${disabled ? 'opacity-50' : ''}
          `}
        >
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Input Field */}
        <input
          ref={combinedRef}
          type={inputType}
          id={id || name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          autoComplete={autoComplete}
          className={`
            ${baseInputClasses}
            ${(clearable && state.hasValue) || passwordToggle ? 'pr-12' : ''}
            ${(clearable && state.hasValue) && passwordToggle ? 'pr-20' : ''}
          `}
          {...restProps}
        />

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className={`animate-spin rounded-full border-2 border-gray-300 dark:border-gray-600 border-t-blue-500 dark:border-t-blue-400 ${currentSize.icon}`}></div>
          </div>
        )}

        {/* Clear Button */}
        {clearable && state.hasValue && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute top-1/2 -translate-y-1/2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors ${
              passwordToggle ? 'right-12' : 'right-3'
            } ${currentSize.button}`}
            aria-label="Clear input"
          >
            <svg className={`text-gray-400 dark:text-gray-500 ${currentSize.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Password Toggle */}
        {passwordToggle && type === 'password' && !loading && (
          <button
            type="button"
            onClick={togglePassword}
            className={`absolute right-3 top-1/2 -translate-y-1/2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors ${currentSize.button}`}
            aria-label={state.showPassword ? 'Hide password' : 'Show password'}
          >
            {state.showPassword ? (
              <svg className={`text-gray-400 dark:text-gray-500 ${currentSize.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className={`text-gray-400 dark:text-gray-500 ${currentSize.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Helper Text */}
      {helperText && !errorMessage && (
        <p className={`text-gray-500 dark:text-gray-400 ${currentSize.helper}`}>
          {helperText}
        </p>
      )}

      {/* Error Message */}
      {errorMessage && (
        <p className={`text-red-600 dark:text-red-400 ${currentSize.error}`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;
