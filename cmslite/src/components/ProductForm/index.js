import React, { Component } from 'react'
import { ErrorMessage, Field, FieldArray, Form, Formik, getIn } from 'formik'
import * as Yup from 'yup'
import { Row } from "components/Bootstrap"
import styles from 'components/cmslite.module.sass'
import productSizeModel from "models/productSize"
import ErrorTitle from "components/common/ErrorTitle"
import Checkbox from "components/common/Checkbox"
import ListItemsControlButtons from "components/common/ListItemsControlButtons"


const yup_number_more0_required = Yup.number()
  .moreThan(0, 'Выберете')
  .required('Укажите')

const yup_number_input_more0_positive_integer_required = Yup.number()
  .required('Заполните').positive('Больше чем 0').integer()


const productSchema = Yup.object({
    title: Yup.string()
      .min(2, 'От 2-х символов')
      .max(255, '255 символов или меньше')
      .required('Заполните'),
    florist_id: yup_number_more0_required,
    florist_text: Yup.string()
      .min(30, 'От 30 символов')
      .required('Заполните'),
    shade: yup_number_more0_required,
    packing: yup_number_more0_required,
    stability: yup_number_more0_required,
    color: yup_number_more0_required,
    bouquetType: yup_number_more0_required,
    sizes: Yup.array()
      .of(Yup.object().shape({
          title: yup_number_more0_required,
          price: yup_number_input_more0_positive_integer_required,
          diameter: yup_number_input_more0_positive_integer_required,
          flowers: Yup.array().of(yup_number_more0_required).min(1, 'Добавьте минимум 1 элемент в состав'),
          flowers_counts: Yup.array().of(yup_number_input_more0_positive_integer_required),
          images: Yup.array().of(Yup.string().min(1, 'photo name от 1 символа')).min(1, 'Добавьте минимум 1 фото')
      }))
      .required('Минимум один размер')
      .min(1, 'Добавьте минимум один размер')
})


class ProductForm extends Component {
    state = {
        imgIsLoading: false
    }

    getEntitiesByType(eType) {
        return this.props.entities.filter(item => item.eType === eType)
    }

    getAdditiveTitleById(id) {
        const findItem = this.props.additives.find(item => item.id === id)
        if (findItem && 'title' in findItem) {
            return findItem.title
        }
        return `[title not found] (id: ${id})`
    }

    handleSaveProduct(product) {
        product.florist_id = Number.parseInt(product.florist_id)
        product.stability = Number.parseInt(product.stability)
        product.shade = Number.parseInt(product.shade)
        product.color = Number.parseInt(product.color)
        product.packing = Number.parseInt(product.packing)
        product.bouquetType = Number.parseInt(product.bouquetType)
        product.sizes = product.sizes.map(size => {
            size.title = Number.parseInt(size.title)
            size.flowers = size.flowers.map(item => Number.parseInt(item))
            return size
        })
        this.props.saveProduct(product)
          .then(res => {
              console.log(res)
              if (res && 'status' in res && res.status === 'done') {
                  this.props.history.push('/products')
              } else {
                  alert('Ошибка при сохранении. Подробности в консоли')
              }
          })
    }

    render() {
        const { product, florists, additives, uploadImages, getImage } = this.props
        const { imgIsLoading } = this.state

        const {
            florist_name: _1,
            florist_photo: _2,
            order: _3,
            ...baseProduct
        } = product

        const maxSizesItems = 2

        return (
          <Formik
            initialValues={{
                ...baseProduct,
                selected_additive: 0
            }}
            validationSchema={productSchema}
            onSubmit={({ selected_additive: _, ...values }, { setSubmitting }) => {
                setSubmitting(true)
                this.handleSaveProduct(values)
            }}
          >
              {({ values }) => {
                  // console.log(props)
                  // const error = ;
                  // const touch = getIn(props.touched, 'sizes');
                  // console.log()
                  // console.log(values)
                  // console.log(errors)
                  // const err = getIn(errors, 'sizes')
                  // const errSizeTitle = err ? err : null
                  return (
                    <Form>
                        {/*<Input formik={formik} field="stability" label="Стойкость"/>*/}

                        <Row className="mb-4">
                            <div className="col-md-1">
                                <b>ID:</b> {values.id}
                            </div>
                            <div className="col-md-7">
                                <b>city_id:</b> {values.city_id}&nbsp;|&nbsp;
                                <b>cpu:</b> {values.slug}
                            </div>
                        </Row>

                        <Row className="align-items-center">
                            <div className="col-md-4">
                                <span className={styles.btitle}>Название</span>
                                <Field name="title" placeholder="Название" style={{ width: '100%' }}/>
                                <ErrorMessage name="title" component={ErrorTitle}/>
                            </div>
                            <div className="col-md-2">
                                <Field name={`public`} title="Опубликовано" type="checkbox"
                                       component={Checkbox}/>
                            </div>
                        </Row>

                        <Row className="mt-4 mb-4">
                            <div className="col-md-4">
                                <span className={styles.btitle}>Флорист о композиции</span>
                                <Field name="florist_text" as="textarea" rows={4}/>
                                <ErrorMessage name="florist_text" component={ErrorTitle}/>
                            </div>
                            <div className="col-md-2">
                                <span className={styles.btitle}>Флорист</span>
                                <Field name="florist_id" as="select">
                                    <option value={0}>&nbsp;</option>
                                    {florists.map(({ id, name }) => (
                                      <option key={id} value={id}>{name} (id: {id})</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="florist_id" component={ErrorTitle}/>
                            </div>
                        </Row>

                        <Row className="mt-2 mb-5 align-items-end">
                            <div className="col-md-2">
                                <span className={styles.btitle}>Тип букета</span>
                                <Field name="bouquetType" as="select">
                                    <option value={0}>&nbsp;</option>
                                    {this.getEntitiesByType('bouquet_type').map(({ id, value }) => (
                                      <option key={id} value={id}>{value}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="bouquetType" component={ErrorTitle}/>
                            </div>
                            <div className="col-md-2">
                                <span className={styles.btitle}>Цвет</span>
                                <Field name="color" as="select">
                                    <option value={0}>&nbsp;</option>
                                    {this.getEntitiesByType('color').map(({ id, value }) => (
                                      <option key={id} value={id}>{value}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="color" component={ErrorTitle}/>
                            </div>
                            <div className="col-md-2">
                                <span className={styles.btitle}>Стойкость</span>
                                <Field name="stability" as="select">
                                    <option value={0}>&nbsp;</option>
                                    {this.getEntitiesByType('stability').map(({ id, value }) => (
                                      <option key={id} value={id}>{value}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="stability" component={ErrorTitle}/>
                            </div>
                            <div className="col-md-2">
                                <span className={styles.btitle}>Гамма</span>
                                <Field name="shade" as="select">
                                    <option value={0}>&nbsp;</option>
                                    {this.getEntitiesByType('shade').map(({ id, value }) => (
                                      <option key={id} value={id}>{value}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="shade" component={ErrorTitle}/>
                            </div>
                            <div className="col-md-2">
                                <span className={styles.btitle}>Оформление</span>
                                <Field name="packing" as="select">
                                    <option value={0}>&nbsp;</option>
                                    {this.getEntitiesByType('packing').map(({ id, value }) => (
                                      <option key={id} value={id}>{value}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="packing" component={ErrorTitle}/>
                            </div>
                        </Row>

                        <h2>Добавки</h2>
                        <Row className="mb-4 align-items-end">
                            <FieldArray
                              name={`additives`}
                              render={ahf => (
                                <>
                                    {values.additives && values.additives.length > 0 &&
                                    values.additives.map((id, ad_index) => (
                                      <div className="col-md-12 mb-3" key={ad_index}>
                                          «{this.getAdditiveTitleById(id)}» (id: {id})
                                          <button type="button" className="ml-2"
                                                  onClick={() => {
                                                      ahf.remove(ad_index)
                                                  }}>Удалить
                                          </button>
                                      </div>
                                    ))}

                                    <div className="col-12 mt-1">
                                        <Field name={`selected_additive`} as="select">
                                            <option value={0}>&nbsp;</option>
                                            {additives.map(({ id, title }) => (
                                              <option key={id}
                                                      value={Number.parseInt(id)}>{title} (id: {id})</option>
                                            ))}
                                        </Field>
                                        <button disabled={values.selected_additive <= 0}
                                                className="mt-2 ml-3"
                                                type="button"
                                                onClick={() => {
                                                    if (values.additives.some(item => Number.parseInt(item) === Number.parseInt(values.selected_additive))) {
                                                        alert('Такая добавка уже есть')
                                                        return
                                                    }
                                                    ahf.push(Number.parseInt(values.selected_additive))
                                                }}>Добавить
                                        </button>
                                    </div>
                                </>
                              )}
                            />
                        </Row>


                        <h2 className="mt-5">Размеры</h2>

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
                                              <ListItemsControlButtons
                                                index={index}
                                                length={values.sizes.length - 1}
                                                maxItems={maxSizesItems}
                                                arrayHelpers={arrayHelpers}
                                                deleteTitle={"Удалить размер"}
                                              />
                                          </div>
                                      </Row>

                                      <Row className="mb-4 align-items-center">
                                          <div className="col-md-2">
                                              <span className={styles.btitle}>Размер</span>
                                              <Field name={`sizes.${index}.title`} as="select">
                                                  <option value={0}>&nbsp;</option>
                                                  {this.getEntitiesByType('size').map(({ id, value }) => (
                                                    <option key={id} value={id}>{value}</option>
                                                  ))}
                                              </Field>
                                              <ErrorMessage name={`sizes.${index}.title`} component={ErrorTitle}/>
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
                                              <ErrorMessage name={`sizes.${index}.diameter`} component={ErrorTitle}/>
                                          </div>
                                          <div className="col-md-2">
                                              <span className={styles.btitle}>Цена</span>
                                              <Field name={`sizes.${index}.price`} type="number"/>
                                              <ErrorMessage name={`sizes.${index}.price`} component={ErrorTitle}/>
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
                                                            <Row>
                                                                <div className="col-md-4">
                                                                    <Field name={`sizes.${index}.flowers.${f_index}`}
                                                                           as="select">
                                                                        <option value={0}>&nbsp;</option>
                                                                        {this.getEntitiesByType('flower').map(({ id, value }) => (
                                                                          <option key={id}
                                                                                  value={Number(id)}>{value}</option>
                                                                        ))}
                                                                    </Field>
                                                                    <ErrorMessage
                                                                      name={`sizes.${index}.flowers.${f_index}`}
                                                                      component={ErrorTitle}/>
                                                                </div>
                                                                <div className="col-md-7">
                                                                    <Field
                                                                      name={`sizes.${index}.flowers_counts.${f_index}`}
                                                                      type="number"/>
                                                                    <button type="button" className="ml-2"
                                                                            onClick={() => {
                                                                                values.sizes[index].flowers_counts.splice(f_index, 1)
                                                                                ahf.remove(f_index)
                                                                            }}>
                                                                        Удалить
                                                                    </button>
                                                                    <ErrorMessage
                                                                      name={`sizes.${index}.flowers_counts.${f_index}`}
                                                                      component={ErrorTitle}/>
                                                                </div>
                                                            </Row>
                                                        </div>
                                                      ))}


                                                      <button className="mt-2" type="button" onClick={() => {
                                                          ahf.push(0)
                                                          values.sizes[index].flowers_counts.push(0)
                                                      }}>
                                                          + Добавить элемент букета
                                                      </button>
                                                  </>
                                                )}
                                              />
                                              <Row className="mt-2">
                                                  <div className="col-md-12">
                                                      <ErrorMessage name={`sizes.${index}.flowers`}
                                                                    component={ErrorTitle}/>
                                                      <ErrorMessage name={`sizes.${index}.flowers_counts`}
                                                                    component={ErrorTitle}/>
                                                  </div>
                                              </Row>
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
                                                            <img src={getImage(image)} alt=""
                                                                 style={{ width: '100%' }}/>
                                                            {image}
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
                                                          <input id="files" type="file" accept="image/*"
                                                                 onChange={(event) => {
                                                                     this.setState({
                                                                         imgIsLoading: true
                                                                     })

                                                                     uploadImages(event.currentTarget.files[0])
                                                                       .then(result => {
                                                                           ahi.push(result.lg[0])
                                                                           this.setState({
                                                                               imgIsLoading: false
                                                                           })
                                                                       })
                                                                 }}/>
                                                      </div>
                                                  </Row>
                                                )}
                                              />

                                              <ErrorMessage name={`sizes.${index}.images`} component={ErrorTitle}/>
                                          </div>
                                      </Row>

                                      <hr className="mt-4 mb-4"/>
                                  </div>
                                ))}


                                <button
                                  type="button"
                                  disabled={values.sizes.length > maxSizesItems}
                                  onClick={() => arrayHelpers.push(productSizeModel)}>
                                    Добавить размер
                                </button>
                            </div>
                          )}
                        />

                        <button disabled={!values.sizes.length} type="submit" className="mt-4 mb-4">Сохранить</button>
                    </Form>
                  )
              }}
          </Formik>
        )
    }
}

export default ProductForm