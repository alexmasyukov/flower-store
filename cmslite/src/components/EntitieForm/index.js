import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useHistory } from "react-router-dom"
import { Row } from "components/Bootstrap"
import ErrorTitle from "components/common/ErrorTitle"
import styles from 'components/cmslite.module.sass'
import { excludeSameEntities, sortEntities } from "utils/entities"


const yup_string_2_255_required = Yup.string()
  .min(2, 'От 2-х символов')
  .max(255, '255 символов или меньше')
  .required('Заполните')


const entitieSchema = Yup.object({
  value: yup_string_2_255_required,
  eType: yup_string_2_255_required,
  eTypeTitle: yup_string_2_255_required
})


const entitieForm = ({ save, entitie, entities }) => {
  let history = useHistory()
  const sortedEntities = sortEntities(entities)
  const types = excludeSameEntities(sortedEntities)

  function handleSave(data) {
    const { eTypeTitle } = data

    save(data)
      .then(res => {
        if (res && 'status' in res && res.status === 'done') {
          history.push(`/entities?filter=${eTypeTitle}`)
        } else {
          alert('Ошибка при сохранении. Подробности в консоли')
        }
      })
  }

  return (
    <Formik
      initialValues={{
        ...entitie
      }}
      validationSchema={entitieSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false)
        handleSave(values)
      }}
    >
      {({ values }) => (
        <Form>
          <div className="mb-4">
            <b>ID:</b> {values.id} | <b>city_id:</b> {values.city_id}
          </div>

          <Row className="align-items-center">
            <div className="col-md-4">
              <span className={styles.btitle}>Значение</span>
              <Field name="value" style={{ width: '100%' }}/>
              <ErrorMessage name="value" component={ErrorTitle}/>
            </div>
          </Row>

          <Row className="mt-4 mb-4">
            <div className="col-md-4">
              <span className={styles.btitle}>Категория</span>
              {/*<Field name="eType" as="select">*/}
              {/*<option value={''}>&nbsp;</option>*/}
              {/*{types.map(({ eType, eTypeTitle }, i) => (*/}
              {/*<option key={i} value={eType}>{eTypeTitle}</option>*/}
              {/*))}*/}
              {/*</Field>*/}

              <Field name="eType">
                {({ field, form }) => (
                  <>
                    <select {...field} onChange={(event) => {
                      const index = event.nativeEvent.target.selectedIndex
                      const eTypeTitle = event.nativeEvent.target[index].text
                      form.setFieldValue(field.name, event.target.value)
                      form.setFieldValue('eTypeTitle', eTypeTitle)
                    }}>
                      <option value={''}>&nbsp;</option>
                      {types.map(({ eType, eTypeTitle }, i) => (
                        <option key={i} value={eType}>{eTypeTitle}</option>
                      ))}
                    </select>
                  </>
                )}
              </Field>
              <ErrorMessage name="eType" component={ErrorTitle}/>
            </div>
          </Row>

          <button type="submit">Сохранить</button>
        </Form>
      )}
    </Formik>
  )
}

export default entitieForm