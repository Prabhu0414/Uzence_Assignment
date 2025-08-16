export interface InputFieldProps {
  // Core props
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  // Content props
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  
  // State props
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  
  // Styling props
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  
  // Optional features
  clearable?: boolean;
  passwordToggle?: boolean;
  
  // Input type and attributes
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  name?: string;
  id?: string;
  autoComplete?: string;
  
  // Custom styling
  className?: string;
  
  // Additional HTML attributes
  [key: string]: any;
}

export interface InputFieldState {
  isFocused: boolean;
  hasValue: boolean;
  showPassword: boolean;
}
