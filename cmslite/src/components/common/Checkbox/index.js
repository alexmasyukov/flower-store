import React from 'react'

const Checkbox = ({ field, type, title }) => (
  <label>
      {/* remove {...field} to see changes not propagated */}
      <input {...field} type={type}/>
      {title}
  </label>
)

export default Checkbox