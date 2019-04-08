import React from 'react';
// import '../css/renderField.css';

const renderTextarea = ({ input, label, placeholder, type, meta: { touched, error } }) => (
  <div className="render-field-container">
    <label>{label}</label>
    <div>
      <textarea {...input} placeholder={placeholder} type={type} className="ta" rows="10" cols="40" />
      {touched && ((error && <span className="error-span">{error}</span>))}
    </div>
  </div>
)
      
export default renderTextarea;