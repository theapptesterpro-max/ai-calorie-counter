
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  // FIX: Added helperText prop to support hints under the input field.
  helperText?: string;
  wrapperClassName?: string;
}

const Input: React.FC<InputProps> = ({ label, id, error, helperText, wrapperClassName, className, ...props }) => {
  return (
    <div className={wrapperClassName}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors duration-200 ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-slate-300 dark:border-slate-600 focus:ring-green-500'
        } bg-white dark:bg-slate-800 ${className}`}
        {...props}
      />
      {/* FIX: Render helper text when provided and there is no error. */}
      {helperText && !error && <p className="mt-1 text-sm text-slate-500">{helperText}</p>}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
