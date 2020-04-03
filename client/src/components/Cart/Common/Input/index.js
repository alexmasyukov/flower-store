import React from "react"

const Input = ({
                  label = '',
                  value,
                  name,
                  onChange,
                  placeholder = '',
                  type = '',
                  checked = false
               }) => {
   switch (type) {
      case 'checkbox':
         return (
            <label>
               <input
                  type="checkbox"
                  checked={checked}
                  onChange={onChange}/>
               {label}
            </label>
         )
      case 'radio':
         return (
            <label>
               <input
                  type="radio"
                  value={value}
                  name={name}
                  checked={checked}
                  onChange={onChange}/>
               {label}
            </label>
         )
      default:
         return (
            <input
               type="text"
               placeholder={placeholder}
               value={value}
               onChange={onChange}/>
         )
   }
}

export default Input