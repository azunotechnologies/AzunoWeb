import React from 'react';
import { Label } from '../../ui/label';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  description?: string;
}

export function FormField({
  label,
  error,
  required,
  children,
  description,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={label} className="flex items-center gap-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      {description && (
        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
      )}
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
