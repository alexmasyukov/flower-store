import React from 'react'
import { Field } from "formik"

const ValidIndicator = ({ formik, field }) => (
  <>
      {formik.touched[field] && formik.errors[field] ? (
        <div>{formik.errors[field]}</div>
      ) : null}
  </>
)

const Input = ({ formik, field, label = false }) => (
  <>
      {label && <label htmlFor={field}>{label}</label>}
      <input name={field} {...formik.getFieldProps(field)} />
      <ValidIndicator formik={formik} field={field}/>
  </>
)

const FieldInput = ({ name, placeholder, as = "input" }) => {
    return (
      <Field name={name} placeholder={placeholder}>
          {({ field, form, meta }) => (
            <>
                <label htmlFor={field.name}>{placeholder}</label>
                {as === "textarea" ? (
                  <textarea rows={3} {...field} placeholder=""/>
                ) : (
                  <input type="input" {...field} placeholder=""/>
                )}
                {meta.touched &&
                meta.error && <div className="error">{meta.error}</div>}
            </>
          )}
      </Field>
    )
}
