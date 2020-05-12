import React from 'react';

export const formatSelect = ({ name, value, handleChange }) => (
  <select name={name} value={value} onChange={handleChange}>
    <option value="BMP">BMP</option>
    <option value="PNG">PNG</option>
    <option value="JPG">JPG</option>
  </select>
)

export default formatSelect