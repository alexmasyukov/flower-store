import React from 'react'
import { DELIVERY_IS } from "constants/common"
import styles from "components/Cart/cart.module.sass"
import loadable from '@loadable/component'
const YourselfMap = loadable(() => import('components/Cart/Common/YourselfMap'), () => <div>Загрузка...</div>)

const CourierWithAddress = (props) => (
  <p>
    {props.courier_street} {props.courier_house}
    {props.courier_flat && `, кв. ${props.courier_flat}`}
    {(props.courier_street || props.courier_flat) && <br/>}
    {props.courier_entrance && `${props.courier_entrance} подъезд`}
    {props.courier_street && props.courier_flat && `, `}
    {props.courier_floor && `${props.courier_floor} этаж`}

    {props.courier_comment && (
      <>
        <br/><br/>
        <b>Комментарий:</b><br/>
        {props.courier_comment}
      </>
    )}
  </p>
)

const WrapResult = ({ children }) => (
  <div className={styles.result}>
    {children}
  </div>
)

const DeliveryResult = ({
                          children,
                          ...props
                        }) => {

  if (
    props.is === DELIVERY_IS.COURIER &&
    props.courier_askRecipient === false
  ) {
    return (
      <WrapResult>
        <CourierWithAddress {...props}/>

        {children}
      </WrapResult>
    )
  }


  if (
    props.is === DELIVERY_IS.COURIER &&
    props.courier_askRecipient === true
  ) {
    return (
      <WrapResult>
        <p>Курьером, предварительно узнать адрес у получателя</p>
        {children}
      </WrapResult>
    )
  }


  if (props.is === DELIVERY_IS.YOURSELF) {
    return (
      <WrapResult>
        <YourselfMap />

        {children}
      </WrapResult>
    )
  }

  return null
}

export default DeliveryResult