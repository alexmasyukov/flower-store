import React, { Component } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Row } from "components/Bootstrap"
import ErrorTitle from "components/CmsLite/common/ErrorTitle"
import styles from 'components/CmsLite/cmslite.module.sass'
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


class entitieForm extends Component {
    handleSave(data) {
        this.props.save(data)
          .then(res => {
              if (res && 'status' in res && res.status === 'done') {
                  this.props.history.push('/cmslite/entities')
              } else {
                  alert('Ошибка при сохранении. Подробности в консоли')
              }
          })
    }

    render() {
        const { entitie, entities } = this.props
        const sortedEntities = sortEntities(entities)
        const types = excludeSameEntities(sortedEntities)

        return (
          <Formik
            initialValues={{
                ...entitie
            }}
            validationSchema={entitieSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false)
                this.handleSave(values)
            }}
          >
              {({ values }) => (
                <Form>
                    <Row className="mb-4">
                        <div className="col-md-1">
                            <b>ID:</b> {values.id}
                        </div>
                        {/*<div className="col-md-7">*/}
                        {/*<b>city_id:</b> {values.city_id}*/}
                        {/*</div>*/}
                    </Row>

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
}

export default entitieForm