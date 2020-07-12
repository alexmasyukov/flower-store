import React from "react"
import styles from 'components/Cart/Common/common.module.sass'
import cn from 'classnames'

const Input = ({
                 label = '',
                 value,
                 name,
                 placeholder = '',
                 type = '',
                 checked = false,
                 disabled = false,
                 meta = { error: false, touch: false, submitError: false },
                 children,
                 onChange = () => {
                 },
                 onBlur = () => {
                 },
                 onFocus = () => {
                 }
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
        <div className={cn(
          styles.has_float_label,
          meta.error && meta.touched && styles.has_error
        )}>
          {children ?
            children({
              onChange, onBlur, onFocus,
              name, value, placeholder, disabled
            })
            : (
              <input
                type="text"
                id={name}
                value={value}
                disabled={disabled}
                placeholder={placeholder}
                onChange={onChange}/>
            )
          }
          <label htmlFor={name}>{placeholder}</label>
          {
            (meta.error || meta.submitError) &&
            meta.touched && (
              <span className={styles.error}>
                {meta.error || meta.submitError}
              </span>
            )
          }
        </div>
      )
  }
}

export default Input