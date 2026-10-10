"use client";

import { useState } from "react";
import "./InputField.css";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  radioOptions?: RadioOption[];
  radioValue?: string;
  onRadioValueChange?: (radioValue: string) => void;
}

export interface RadioOption {
    label: string;
    value: string;
}

export default function InputField({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  radioOptions,
  radioValue,
  onRadioValueChange
}: InputFieldProps) {
  return (
    <div className="input-field">
        <label className="input-field__label">
            {label}
            <input
                className="input-field__input"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </label>
        {radioOptions && radioValue !== undefined && onRadioValueChange && radioOptions.length > 0 && 
            <div className="radio-group">
                {radioOptions.map((option) => (
                    <label key={option.value} className="radio-option">
                        <input
                            type="radio"
                            value={option.value}
                            checked={radioValue === option.value}
                            onChange={() => onRadioValueChange(option.value)}
                        />
                        <span className="radio-option__circle" />
                        <span className="radio-option__label">{option.label}</span>
                    </label>
                ))}
            </div>
        }
    </div>
  );
}