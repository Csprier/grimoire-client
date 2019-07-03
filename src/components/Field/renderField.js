import React from 'react';
import '../css/renderField.css';

const renderField = ({ containerClassName, className, input, label, placeholder, type, meta: { touched, error } }) => (
  <div className={containerClassName}>
    <label>{label}</label>
    <div className={containerClassName}>
      <input className={className} {...input} placeholder={placeholder} type={type} />
      {touched && ((error && <span className="error-span">{error}</span>))}
    </div>
  </div>
)
      
export default renderField;