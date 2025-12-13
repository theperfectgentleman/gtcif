import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
};

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'primary',
    size = 'medium',
    disabled = false,
    className = '',
    children,
  } = props;

  const baseStyles =
    'inline-flex items-center justify-center rounded font-semibold tracking-wide no-underline transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-brand-green text-white hover:opacity-95 focus:ring-brand-green',
    secondary: 'bg-brand-black text-white hover:opacity-90 focus:ring-brand-black',
    outline: 'border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black focus:ring-brand-gold',
  };
  const sizeStyles: Record<ButtonSize, string> = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`;

  if (typeof props.href === 'string') {
    return (
      <Link
        href={props.href}
        className={styles}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={styles}
      onClick={props.onClick}
      type={props.type ?? 'button'}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;