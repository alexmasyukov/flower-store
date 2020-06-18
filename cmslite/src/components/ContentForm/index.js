import React, { Component } from 'react'
import { ErrorMessage, FastField, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Row } from "components/Bootstrap"
import styles from 'components/cmslite.module.sass'
import ErrorTitle from "components/common/ErrorTitle"
import Checkbox from "components/common/Checkbox"
import CmsEditor from "components/common/CmsEditor"

const yup_string_2_255_required = Yup.string()
  .min(2, 'От 2-х символов')
  .max(255, '255 символов или меньше')
  .required('Заполните')


const contentSchema = Yup.object({
    title: yup_string_2_255_required,
    content: Yup.string().required('Заполните')
})


class ContentForm extends Component {
    state = {
        inititalValues: { ...this.props.content }
    }

    handleEditorChange = (content) => {
        this.setState(prev => ({
            ...prev,
            inititalValues: {
                ...prev.inititalValues,
                content
            }
        }))
    }

    handleSave(data) {
        this.props.save(data)
          .then(res => {
              if (res && 'status' in res && res.status === 'done') {
                  this.props.history.push('/content')
              } else {
                  alert('Ошибка при сохранении. Подробности в консоли')
              }
          })
    }


    render() {
        // const { content } = this.props
        const { inititalValues } = this.state

        return (
          <>
              <Formik
                enableReinitialize={true}
                initialValues={{
                    ...inititalValues
                }}
                validationSchema={contentSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false)
                    this.handleSave(values)
                    // saveTeamcontent(JSON.stringify(values, null, 2))
                }}
              >
                  {({ values }) => (
                    <Form>
                        <Row className="mb-4">
                            <div className="col-md-1">
                                <b>ID:</b> {values.id}
                            </div>
                            <div className="col-md-7">
                                <b>city_id:</b> {values.city_id}
                            </div>
                        </Row>

                        <Row className="align-items-center mb-4">
                            <div className="col-md-4">
                                <span className={styles.btitle}>Название (не отображается на сайте):</span>
                                <Field name="title" style={{ width: '100%' }}/>
                                <ErrorMessage name="title" component={ErrorTitle}/>
                            </div>
                            <div className="col-md-2">
                                <Field name={`public`} title="Опубликовано" type="checkbox"
                                       component={Checkbox}/>
                            </div>
                        </Row>

                        <Field name="content">
                            {({ field }) => (
                              <CmsEditor
                                className="mt-4"
                                initialContent={field.value}
                                onChange={this.handleEditorChange}/>
                            )}
                        </Field>
                        {/*<>*/}
                        {/*{field.value}*/}
                        {/*/!*<select {...field} onChange={(event) => {*!/*/}
                        {/*/!*const index = event.nativeEvent.target.selectedIndex;*!/*/}
                        {/*/!*const eTypeTitle = event.nativeEvent.target[index].text*!/*/}
                        {/*/!*form.setFieldValue(field.name, event.target.value)*!/*/}
                        {/*/!*form.setFieldValue('eTypeTitle', eTypeTitle)*!/*/}
                        {/*/!*}}>*!/*/}
                        {/*/!*<option value={''}>&nbsp;</option>*!/*/}
                        {/*/!*{types.map(({ eType, eTypeTitle }, i) => (*!/*/}
                        {/*/!*<option key={i} value={eType}>{eTypeTitle}</option>*!/*/}
                        {/*/!*))}*!/*/}
                        {/*/!*</select>*!/*/}
                        {/*</>*/}
                        {/*)*/}
                        {/*}}*/}
                        {/*</Field>*/}
                        <ErrorMessage name="content" component={ErrorTitle}/>
                        <br/>

                        <button type="submit">Сохранить</button>
                    </Form>
                  )}
              </Formik>
              {/*<CmsEditor*/}
              {/*className="mt-4"*/}
              {/*initialContent={this.state.inititalValues.content}*/}
              {/*onChange={this.handleEditorChange}/>*/}
          </>
        )
    }
}

export default ContentForm