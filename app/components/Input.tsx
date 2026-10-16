import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-1 text-gray-200 font-medium text-sm">
      <span>{label}</span>
      <input
        className={`h-10 rounded border border-gray-700 bg-gray-900 text-gray-300 placeholder-gray-400 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 ${className ?? ''}`}
        {...props}
      />
    </label>
  );
}