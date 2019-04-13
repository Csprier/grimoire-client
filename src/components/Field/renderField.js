import React from 'react';
import '../css/renderField.css';

const renderField = ({ input, label, placeholder, type, meta: { touched, error } }) => (
  <div className="render-field-container">
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder} type={type} className="inp" />
      {touched && ((error && <span className="error-span">{error}</span>))}
    </div>
  </div>
)
      
export default renderField;