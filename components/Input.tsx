import React, { InputHTMLAttributes, forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
  rightElement?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon: Icon, error, rightElement, className = '', ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        <label className="text-sm font-medium text-slate-700 block ml-1">
          {label}
        </label>
        <div className="relative group">
          {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors pointer-events-none">
              <Icon size={18} />
            </div>
          )}
          
          <input
            ref={ref}
            className={`
              w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl 
              focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 block 
              p-3 transition-all duration-200 outline-none
              ${Icon ? 'pl-10' : 'pl-3'}
              ${rightElement ? 'pr-10' : 'pr-3'}
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
              ${className}
            `}
            {...props}
          />

          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-xs text-red-500 font-medium ml-1 animate-pulse">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;