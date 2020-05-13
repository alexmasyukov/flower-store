import React, { Component } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Row } from "components/Bootstrap"
import styles from 'components/CmsLite/cmslite.module.sass'
import ErrorTitle from "components/CmsLite/common/ErrorTitle"
import Checkbox from "components/CmsLite/common/Checkbox"
import PhotosAndUploader from "components/CmsLite/common/PhotosAndUploader"

const yup_string_2_255_required = Yup.string()
  .min(2, 'От 2-х символов')
  .max(255, '255 символов или меньше')
  .required('Заполните')


const bannerSchema = Yup.object({
    title: yup_string_2_255_required,
    images: Yup.array().of(Yup.string())
      .required('Добавьте фото')
})


class BannerForm extends Component {
    render() {
        const { banner, uploadImages, getImage } = this.props

        return (
          <Formik
            initialValues={{
                ...banner
            }}
            validationSchema={bannerSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false)
                alert(JSON.stringify(values, null, 2))
                // saveTeambanner(JSON.stringify(values, null, 2))
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

                    <Row className="align-items-center">
                        <div className="col-md-4">
                            <span className={styles.btitle}>Название (не отражается на сайте):</span>
                            <Field name="title" style={{ width: '100%' }}/>
                            <ErrorMessage name="title" component={ErrorTitle}/>
                        </div>
                        <div className="col-md-2">
                            <Field name={`public`} title="Опубликовано" type="checkbox"
                                   component={Checkbox}/>
                        </div>
                    </Row>

                    <Row className="mb-4 mt-4">
                        <div className="col-md-12">
                            <span className={styles.btitle}>Изображение</span>

                            <Field
                              name="images"
                              component={PhotosAndUploader}
                              getImage={getImage}
                              uploadImages={uploadImages}
                            />

                            <ErrorMessage name="images" component={ErrorTitle}/>
                        </div>
                    </Row>

                    <button type="submit">Сохранить</button>
                </Form>
              )}
          </Formik>
        )
    }
}

export default BannerForm