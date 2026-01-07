import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  required = false,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="w-full relative">
      <input
        name={name}
        type={isPassword ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-md p-2 bg-white/90 focus:outline-none focus:ring-2 focus:ring-brand-gold ${error ? 'border-red-500' : 'border-gray-300'} ${className} ${isPassword ? 'pr-10' : ''}`}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
      {error ? (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default Input;