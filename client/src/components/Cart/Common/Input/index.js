import React from "react"
import styles from 'components/Cart/Common/common.module.sass'
import cn from 'classnames'

const func = () => {
}

const InputStandart = ({
                         name, value = '', disabled = false,
                         placeholder = '', onChange = func
                       }) => (
  <input
    type="text"
    id={name}
    value={value}
    disabled={disabled}
    placeholder={placeholder}
    onChange={onChange}/>
)

const InputTextarea = ({
                         name, value = '', disabled = false,
                         placeholder = '', onChange = func
                       }) => (
  <textarea
    id={name}
    value={value}
    disabled={disabled}
    placeholder={placeholder}
    onChange={onChange}/>
)

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
                 },
                 ...otherProps
               }) => {
  switch (type) {
    case 'checkbox':
      return (
        <label>
          <input
            type="checkbox"
            name={name}
            value={value}
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
      const props = {
        onChange, onBlur, onFocus,
        name, value, placeholder, disabled
      }

      const hasError = (meta.error || meta.submitError) && meta.touched

      return (
        <div className={cn(
          styles.has_float_label, hasError && styles.has_error
        )}>

          {children && children(props)}
          {type === 'textarea' ?
            <InputTextarea {...props} {...otherProps} /> :
            <InputStandart {...props} />
          }

          <label htmlFor={name}>{placeholder}</label>

          {hasError && (
            <span className={styles.error}>
              {meta.error || meta.submitError}
            </span>
          )}
        </div>
      )
  }
}

export default Input