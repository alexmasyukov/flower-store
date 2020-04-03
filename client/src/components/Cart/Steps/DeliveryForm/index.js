import React from 'react'
import Input from "components/Cart/Common/Input"
import Textarea from "components/Cart/Common/Textarea"
import { Row } from "components/Bootstrap"
import { DELIVERY_IS } from "constants/common"
import styles from "components/Cart/cart.module.sass"

const DeliveryForm = ({
                         is,
                         courierDirection,
                         onInputChange,
                         children
                      }) => (
   <div className={styles.form}>
      <Row>
         <div className="col-md-4">
            <Input
               label="Курьером"
               type="radio"
               name="delVar"
               value={DELIVERY_IS.COURIER}
               checked={is === DELIVERY_IS.COURIER}
               onChange={onInputChange('delivery.is')}/>
         </div>
         <div className="col-md-8 ">
            <Input
               label="Самовывоз"
               type="radio"
               name="delVar"
               value={DELIVERY_IS.YOURSELF}
               checked={is === DELIVERY_IS.YOURSELF}
               onChange={onInputChange('delivery.is')}/>
         </div>
      </Row>

      {is === DELIVERY_IS.COURIER ? (
         <>
            <Input
               label="Узнать адрес у получателя"
               type="checkbox"
               checked={courierDirection.askRecipient}
               onChange={onInputChange('delivery.courierDirection.askRecipient')}/>

            {!courierDirection.askRecipient && (
               <>
                  <Input
                     placeholder="Улица"
                     value={courierDirection.street}
                     onChange={onInputChange('delivery.courierDirection.street')}/>

                  <Row>
                     <div className="col-md-6 pr-1">
                        <Input
                           placeholder="Дом / корпус"
                           value={courierDirection.house}
                           onChange={onInputChange('delivery.courierDirection.house')}/>
                     </div>
                     <div className="col-md-6 pl-1">
                        <Input
                           placeholder="Квартира / офис"
                           value={courierDirection.flat}
                           onChange={onInputChange('delivery.courierDirection.flat')}/>
                     </div>

                     Подъезд
                     Этаж
                  </Row>

                  <Textarea
                     maxRows={2}
                     max={100}
                     placeholder="Комментарий"
                     value={courierDirection.comment}
                     onChange={onInputChange('delivery.courierDirection.comment')}/>

               </>
            )}
         </>
      ) : (
         <>
            <p>Чита, ...адрес</p>
            <div>Карта</div>
         </>
      )}
      
      {children}
   </div>
)

export default DeliveryForm