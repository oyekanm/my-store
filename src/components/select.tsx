// components/PrelineSelect.jsx
'use client';
import { useEffect } from 'react';

type Props ={
    options:any, 
    defaultValue:any, 
    onChange:any, 
    placeholder:any
}

const AdvancedSelect = ({ options, defaultValue, onChange, placeholder }:Props) => {
  // useEffect(() => {
  //   // Import and initialize Preline's JavaScript
  //   import('preline/preline');
  //   import('preline').then(({ HSSelect }) => {
  //     // Initialize all selects on the page
  //     HSSelect.init();
  //   });
  // }, []);


  return (
    <div className="relative">
      <select 
        className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {placeholder && (
          <option value="" disabled>{placeholder}</option>
        )}
        {options.map((option:any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
        <svg className="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>
    </div>
  );
};

export default AdvancedSelect;