import React from "react"
import cn from 'classnames'
import styles from 'components/Cart/Common/common.module.sass'

const func = () => {
}

const InputStandart = ({
                         name,
                         value = '',
                         disabled = false,
                         placeholder = '',
                         onChange = func,
                         style = {}
                       }) => (
  <input
    type="text"
    style={style}
    id={name}
    value={value}
    disabled={disabled}
    placeholder={placeholder}
    onChange={onChange}/>
)


const InputTextarea = ({
                         name,
                         value = '',
                         disabled = false,
                         placeholder = '',
                         maxRows = 2,
                         style = {},
                         onChange = func
                       }) => (
  <textarea
    id={name}
    style={style}
    value={value}
    disabled={disabled}
    placeholder={placeholder}
    rows={maxRows}
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
                 style = {},
                 ...otherProps
               }) => {
  const hasError = (meta.error || meta.submitError) && meta.touched

  switch (type) {
    case 'meta':
      if (hasError) {
        return (
          <div
            className={cn(
              styles.has_float_label, hasError && styles.has_error
            )}
            style={style}
          >
            <span className={styles.error}>
              {meta.error || meta.submitError}
            </span>
          </div>
        )
      }
      return null
    case 'checkbox':
      return (
        <label className={cn(disabled && styles.disabled)}>
          <input
            type="checkbox"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            style={style}
            disabled={disabled}
          />
          {label}
        </label>
      )
    case 'radio':
      return (
        <label className={cn(disabled && styles.disabled)}>
          <input
            type="radio"
            value={value}
            name={name}
            checked={checked}
            onChange={onChange}
            style={style}
            disabled={disabled}
          />
          {label}
        </label>
      )
    default:
      const props = {
        onChange, onBlur, onFocus,
        name, value, placeholder, disabled
      }

      return (
        <div
          className={cn(
            styles.has_float_label, hasError && styles.has_error
          )}
          style={style}
        >

          {children ? (
            children(props)
          ) : (
            type === 'textarea' ?
              <InputTextarea {...props} {...otherProps} /> :
              <InputStandart {...props} {...otherProps} />
          )}

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