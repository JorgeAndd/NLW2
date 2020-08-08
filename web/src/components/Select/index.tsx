import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = (props) => {
  const { label, name, options, ...otherProps } = props;

  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select defaultValue="" id={name} {...otherProps}>
        <option value="" disabled hidden>Selecione uma opção</option>

        {options.map(o => {
          return <option key={o.value} value={o.value} label={o.label}></option>
        })}
      </select>
    </div>
  );
}

export default Select;