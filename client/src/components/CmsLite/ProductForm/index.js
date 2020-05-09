import React, { Component } from 'react'
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Row } from "components/Bootstrap"
import styles from 'components/CmsLite/cmslite.module.sass'
import productSizeModel from "models/productSize"


const Checkbox = ({ field, type, title }) => (
  <label>
      {/* remove {...field} to see changes not propagated */}
      <input {...field} type={type}/>
      {title}
  </label>
)

const productSchema = Yup.object({
    title: Yup.string()
      .min(2, 'Must be 2 characters or more')
      .max(255, 'Must be 255 characters or less')
      .required('Required'),
    florist_text: Yup.string()
      .min(30, 'Must be 30 characters or more')
      .required('Required'),
    shade: Yup.number()
      .moreThan(0, 'Выберете нужное')
      .required('Required'),
    sizes: Yup.array().of(
      Yup.object().shape({
          title: Yup.string().required('Заполните'),
          public: Yup.boolean().required(),
          price: Yup.number().required('Заполните').positive('Больше чем 0').integer(),
          flowers: Yup.array().of(Yup.number().min(1, 'Укажите больше нуля')).min(1, 'Добавьте минимум 1 элемент').required('Минимум 1 элемент'),
          flowers_counts: Yup.array().of(Yup.number().min(1, 'Укажите больше нуля')).min(1, 'Укажите количество элементов букета').required('Минимум 1 элемент')
      })
    )
})


const SizeButtons = ({ index, length, arrayHelpers }) => (
  <>
      <span className={styles.mtitle}>Переместить </span>
      <button
        type="button"
        onClick={() => {
            if (index > 0) arrayHelpers.swap(index, index - 1)
        }} // remove a friend from the list
      >
          Вверх
      </button>
      <button
        type="button"
        onClick={() => {
            if (index < length) arrayHelpers.swap(index, index + 1)
        }} // remove a friend from the list
      >
          Вниз
      </button>
      |
      <button
        type="button"
        className="ml-1"
        onClick={() => {
            const r = window.confirm("Удалить этот размер?")
            if (r === true) arrayHelpers.remove(index)
        }} // remove a friend from the list
      >
          Удалить размер
      </button>
      <br/>
  </>
)

const ErrorTitle = ({children}) => (
  <div className={styles.err}>
      {children}
  </div>
)

class ProductForm extends Component {
    state = {
        imgIsLoading: false
    }

    getEntitiesByType(eType) {
        return this.props.entities.filter(item => item.eType === eType)
    }

    render() {
        const { product, florists, cities  } = this.props
        const { imgIsLoading } = this.state
        const { sizes } = product

        const fixSizes = sizes.map(size => {
            size.flowers = [16, 18, 17]//product.flowers,
            size.flowers_counts = [2, 8, 5]//product.flowers,
            size.fast = Math.random() >= 0.5
            return size
        })

        product.bouquetType = Math.random() >= 0.5 ? 28 : 29

        return (
          <Formik
            initialValues={{
                id: product.id,
                city_id: product.city_id,
                title: product.title,
                public: product.public,
                florist_id: product.florist_id,
                florist_text: product.florist_text,
                slug: product.slug,
                color: product.color,
                stability: product.stability,
                shade: product.shade,
                packing: product.packing,
                bouquetType: product.bouquetType,
                sizes: fixSizes
            }}
            validationSchema={productSchema}
            onSubmit={(values, { setSubmitting }) => {
                // alert()
                console.log(JSON.stringify(values, null, 2))
                setSubmitting(false)
            }}
            render={({ values }) => (
              <Form>
                  {/*<div className="row">*/}
                  {/*<Input formik={formik} field="title" label="Название"/>*/}
                  {/*<Input formik={formik} field="florist_text" label="Флорист говорит"/>*/}
                  {/*<Input formik={formik} field="slug" label="cpu"/>*/}
                  {/*<Input formik={formik} field="stability" label="Стойкость"/>*/}


                  <Row className="mb-4">
                      <div className="col-md-1">
                          <b>ID:</b> {values.id}
                      </div>
                      <div className="col-md-3">
                          <b>cpu:</b> {values.slug}
                      </div>
                  </Row>

                  <Row className="align-items-end">
                      <div className="col-md-4">
                          <span className={styles.btitle}>Название</span>
                          <Field name="title" placeholder="Название" style={{ width: '100%' }}/>
                          <ErrorMessage name="title" component={ErrorTitle}/>
                      </div>
                      <div className="col-md-2">
                          <span className={styles.btitle}>Город</span>
                          <Field name="city_id" as="select">
                              <option value={0}>&nbsp;</option>
                              {cities.map(({ id, rus }) => (
                                <option key={id} value={id}>{rus} (id: {id})</option>
                              ))}
                          </Field>
                          <ErrorMessage name="city_id"/>
                      </div>
                      <div className="col-md-2">
                          <Field name={`public`} title="Опубликовано" type="checkbox"
                                 component={Checkbox}/>
                      </div>
                  </Row>

                  <Row className="mt-4">
                      <div className="col-md-4">
                          <span className={styles.btitle}>Флорист о композиции</span>
                          <Field name="florist_text" as="textarea" rows={4}/>
                          <ErrorMessage name="florist_text"/>
                      </div>
                      <div className="col-md-2">
                          <span className={styles.btitle}>Флорист</span>
                          <Field name="florist_id" as="select">
                              <option value={0}>&nbsp;</option>
                              {florists.map(({ id, name }) => (
                                <option key={id} value={id}>{name} (id: {id})</option>
                              ))}
                          </Field>
                          <ErrorMessage name="florist_id"/>
                      </div>
                  </Row>

                  <Row className="mt-2 align-items-end">
                      <div className="col-md-2">
                          <span className={styles.btitle}>Тип букета</span>
                          <Field name="bouquetType" as="select">
                              <option value={0}>&nbsp;</option>
                              {this.getEntitiesByType('bouquet_type').map(({ id, value }) => (
                                <option key={id} value={id}>{value}</option>
                              ))}
                          </Field>
                          <ErrorMessage name="bouquetType"/>
                      </div>
                      <div className="col-md-2">
                          <span className={styles.btitle}>Цвет</span>
                          <Field name="color" as="select">
                              <option value={0}>&nbsp;</option>
                              {this.getEntitiesByType('color').map(({ id, value }) => (
                                <option key={id} value={id}>{value}</option>
                              ))}
                          </Field>
                          <ErrorMessage name="color"/>
                      </div>
                      <div className="col-md-2">
                          <span className={styles.btitle}>Стойкость</span>
                          <Field name="stability" as="select">
                              <option value={0}>&nbsp;</option>
                              {this.getEntitiesByType('stability').map(({ id, value }) => (
                                <option key={id} value={id}>{value}</option>
                              ))}
                          </Field>
                          <ErrorMessage name="stability"/>
                      </div>
                      <div className="col-md-2">
                          <span className={styles.btitle}>Гамма</span>
                          <Field name="shade" as="select">
                              <option value={0}>&nbsp;</option>
                              {this.getEntitiesByType('shade').map(({ id, value }) => (
                                <option key={id} value={id}>{value}</option>
                              ))}
                          </Field>
                          <ErrorMessage name="shade"/>
                      </div>
                      <div className="col-md-2">
                          <span className={styles.btitle}>Оформление</span>
                          <Field name="packing" as="select">
                              <option value={0}>&nbsp;</option>
                              {this.getEntitiesByType('packing').map(({ id, value }) => (
                                <option key={id} value={id}>{value}</option>
                              ))}
                          </Field>
                          <ErrorMessage name="packing"/>
                      </div>
                  </Row>

                  <Row className="mt-4 mb-5">
                      <div className="col-md-12">
                          byFlowers внутри размеров (обновить фильтры на фронте)

                          additionalProducts
                          collection
                      </div>
                  </Row>

                  <h2>Размеры</h2>

                  {/*{sizes.map(size => (*/}
                  {/*<Cmslite_SizeForm key={size.id} product={size} entities={entities}/>*/}
                  {/*))}*/}


                    <FieldArray
                      name="sizes"
                      render={arrayHelpers => (
                        <div>
                            {values.sizes && values.sizes.length > 0 &&
                                values.sizes.map((size, index) => (
                              <div key={index}>

                                  <Row className="mb-4 align-items-end">
                                      {/*<div className="col-md-2">*/}
                                      {/*/!*<span className={styles.sizeTitle}>{this.getSizeTitle(size.id).map(({value = '[title]'}) => (*!/*/}
                                      {/*/!*<b>{value}</b>*!/*/}
                                      {/*/!*))}</span>*!/*/}
                                      {/*</div>*/}
                                      <div className="col-md-1">
                                          <span><b>ID:</b> {size.id}</span>
                                      </div>
                                      <div className="col-md-6">
                                          <SizeButtons index={index} length={values.sizes.length - 1}
                                                       arrayHelpers={arrayHelpers}/>
                                      </div>
                                  </Row>

                                  <Row className="mb-4 align-items-end">
                                      <div className="col-md-2">
                                          <span className={styles.btitle}>Размер</span>
                                          <Field name={`sizes.${index}.title`} as="select">
                                              <option value={0}>&nbsp;</option>
                                              {this.getEntitiesByType('size').map(({ id, value }) => (
                                                <option key={id} value={id}>{value}</option>
                                              ))}
                                          </Field>
                                          <ErrorMessage name={`sizes.${index}.title`}/>
                                      </div>
                                      <div className="col-md-2">
                                          <Field name={`sizes.${index}.public`} title="Опубликовано" type="checkbox"
                                                 component={Checkbox}/>
                                      </div>
                                      <div className="col-md-2">
                                          <Field name={`sizes.${index}.fast`} title="Готовый букет" type="checkbox"
                                                 component={Checkbox}/>
                                      </div>
                                  </Row>
                                  <Row className="mb-4">
                                      <div className="col-md-2">
                                          <span className={styles.btitle}>Диаметр букета</span>
                                          <Field name={`sizes.${index}.diameter`} type="number"/>
                                          <ErrorMessage name={`sizes.${index}.diameter`}/>
                                      </div>
                                      <div className="col-md-2">
                                          <span className={styles.btitle}>Цена</span>
                                          <Field name={`sizes.${index}.price`} type="number"/>
                                          <ErrorMessage name={`sizes.${index}.price`}/>
                                      </div>
                                  </Row>


                                  <Row className="mb-4 align-items-end">
                                      <div className="col-md-5">
                                          <span className={styles.btitle}>Состав букета и количество</span>
                                          <FieldArray
                                            name={`sizes.${index}.flowers`}
                                            render={ahf => (
                                              <>
                                                  {size.flowers && size.flowers.length > 0 &&
                                                  size.flowers.map((flower, f_index) => (
                                                    <div key={f_index}>
                                                        <Field name={`sizes.${index}.flowers.${f_index}`} as="select">
                                                            <option value={0}>&nbsp;</option>
                                                            {this.getEntitiesByType('flower').map(({ id, value }) => (
                                                              <option key={id} value={Number(id)}>{value}</option>
                                                            ))}
                                                        </Field>
                                                        <Field name={`sizes.${index}.flowers_counts.${f_index}`}
                                                               type="number"
                                                               className="ml-2"
                                                        />
                                                        <button type="button" className="ml-2" onClick={() => {
                                                            // arrayHelpers.remove()
                                                            values.sizes[index].flowers_counts.splice(f_index, 1)
                                                            ahf.remove(f_index)
                                                            console.log(values.sizes[index])
                                                        }}>
                                                            Удалить
                                                        </button>
                                                        <ErrorMessage name={`sizes.${index}.flowers.${f_index}`}/>
                                                        <ErrorMessage
                                                          name={`sizes.${index}.flowers_counts.${f_index}`}/>
                                                        <br/>
                                                    </div>
                                                  ))}


                                                  <button className="mt-2" type="button" onClick={() => {
                                                      ahf.push(0)
                                                      values.sizes[index].flowers_counts.push(0)
                                                      console.log(values.sizes[index])
                                                  }}>
                                                      + Добавить элемент букета
                                                  </button>
                                              </>
                                            )}
                                          />
                                          <ErrorMessage name={`sizes.${index}.flowers`}/>
                                          <ErrorMessage name={`sizes.${index}.flowers_counts`}/>
                                      </div>
                                  </Row>

                                  <Row className="mb-4">
                                      <div className="col-md-12">
                                          <span className={styles.btitle}>Фото</span>

                                          <FieldArray
                                            name={`sizes.${index}.images`}
                                            render={ahi => (
                                              <Row>
                                                  {/*{values.images && values.images.length > 0 ? (*/}
                                                  {size.images.map((image, imgIndex) => (
                                                    <div className="col-md-2 pr-1" key={imgIndex}>
                                                        <img src={`/api/static/${image}`} alt=""
                                                             style={{ width: '100%' }}/>
                                                        {/*<Field name={`sizes.${index}.images.${imgIndex}`}/>*/}
                                                        <button
                                                          type="button"
                                                          onClick={() => {
                                                              const r = window.confirm("Удалить фото?")
                                                              if (r === true) ahi.remove(imgIndex)
                                                          }} // remove a friend from the list
                                                        >Удалить
                                                        </button>
                                                    </div>
                                                  ))}

                                                  <div className="col-md-12 mb-2">
                                                      {imgIsLoading && 'Загрузка изображения...'}
                                                  </div>

                                                  <div className="col-md-12">
                                                      <label htmlFor="files" className="btn">Загрузить фото</label>
                                                      <input id="files" type="file" accept="image/*" onChange={(event) => {
                                                          this.setState({
                                                              imgIsLoading: true
                                                          })

                                                          // this.setState({"file": event.currentTarget.files[0]})}
                                                          const data = new FormData()
                                                          data.append('attachments', event.currentTarget.files[0])
                                                          axios.post("http://localhost/api/upload/", data, {
                                                              headers: { 'Content-Type': 'multipart/form-data' }
                                                          })
                                                            .then(res => { // then print response status
                                                                console.log('res')
                                                                ahi.push(res.data.result.thumb[0])
                                                                this.setState({
                                                                    imgIsLoading: false
                                                                })
                                                            })
                                                            .catch(errors => {
                                                                alert('Ошибка при загрузке изображения. Попробуйте другое изображение.')
                                                                console.log(errors)
                                                                console.log(errors.response.data)
                                                            })
                                                      }}/>
                                                  </div>
                                              </Row>
                                            )}
                                          />
                                      </div>
                                  </Row>

                                  <hr className="mt-4 mb-4"/>
                              </div>
                            ))}


                            <button type="button" onClick={() => arrayHelpers.push(productSizeModel)}>
                                Добавить размер
                            </button>
                        </div>
                      )}
                    />


                  {/*{this.state.entities.map(item => (*/}
                  {/*<div>{item.value}</div>*/}
                  {/*))}*/}
                  {/*<DatePicker formik={formik} field="available" label="Доступен"/>*/}
                  {/*</div>*/}


                  <button type="submit">Submit</button>
              </Form>
            )}
          />
        )
    }
}

export default ProductForm

/**
    withRouterParams
    withApiService(mapMethodsToProps) - проброс нужных методов в компонент из api
    withData - запрос на получение товара по id в data props

    Получить id
    получить методы из api (с уже включенным id)
    получить данные о товаре props -> product={product}
    получить данные о справочнике props -> entities={entities}
    получить данные о флористах props -> florists={florists}

    пробросить все это в компонент
    <Component product={} entities={} florists={}

    данные может получить один и тотже hoc, нужно указать метод
        и название пропса
    dynamicProps[someVariable] = value;
    <component {...dynamicProps}/>s
 **/
