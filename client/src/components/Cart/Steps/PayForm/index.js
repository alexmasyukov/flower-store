import React from 'react'
import { PAY_TYPES } from "constants/common"
import Input from "components/Cart/Common/Input"
import Textarea from "components/Cart/Common/Textarea"
import styles from "components/Cart/cart.module.sass"

//todo: ? orderConfirmation вынести отдельным компонентом

const PayForm = ({
                    payType = PAY_TYPES.CARD,
                    cardTypeEnabled = true,
                    cardTypeTitle = 'Наличные',
                    legalEntity,
                    orderConfirmation,
                    confirmError,
                    smsCode,
                    comment,
                    onInputChange,
                    children
                 }) => {

   return (
      <div className={styles.form}>
         {cardTypeEnabled && (
            <>
               <Input
                  label="Оплата картой"
                  type="radio"
                  name="pay"
                  value={PAY_TYPES.CARD}
                  checked={payType === PAY_TYPES.CARD}
                  onChange={onInputChange('pay.payType')}/>
               <p>
                  Оплата производится через
                  платежный шлюз ПАО "СБЕРБАНК"
               </p>
            </>
         )}

         <Input
            label={cardTypeTitle}
            type="radio"
            name="pay"
            value={PAY_TYPES.CASH}
            checked={payType === PAY_TYPES.CASH}
            onChange={onInputChange('pay.payType')}/>

         <Input
            label="Перевод на карту «Сбербанк»"
            type="radio"
            name="pay"
            value={PAY_TYPES.TO_CORPORATE_CARD}
            checked={payType === PAY_TYPES.TO_CORPORATE_CARD}
            onChange={onInputChange('pay.payType')}/>

            {/*todo: cardTypeEnabled?*/}
         {/*{!cardTypeEnabled && (*/}
            {/*<>*/}
               {/*<Input*/}
                  {/*label="Счет для юр. лица РФ"*/}
                  {/*type="radio"*/}
                  {/*name="pay"*/}
                  {/*value={PAY_TYPES.ACCOUNT_FOR_A_LEGAL_ENTITY}*/}
                  {/*checked={payType === PAY_TYPES.ACCOUNT_FOR_A_LEGAL_ENTITY}*/}
                  {/*onChange={onInputChange('pay.payType')}/>*/}

               {/*{payType === PAY_TYPES.ACCOUNT_FOR_A_LEGAL_ENTITY && (*/}
                  {/*<>*/}
                     {/*<Input*/}
                        {/*placeholder="Название организации"*/}
                        {/*value={legalEntity.name}*/}
                        {/*onChange={onInputChange('pay.legalEntity.name')}/>*/}

                     {/*<Input*/}
                        {/*placeholder="ИНН"*/}
                        {/*value={legalEntity.inn}*/}
                        {/*onChange={onInputChange('pay.legalEntity.inn')}/>*/}

                     {/*<Input*/}
                        {/*placeholder="КПП"*/}
                        {/*value={legalEntity.kpp}*/}
                        {/*onChange={onInputChange('pay.legalEntity.kpp')}/>*/}
                  {/*</>*/}
               {/*)}*/}
            {/*</>*/}
         {/*)}*/}

         <hr/>

         <Textarea
            maxRows={2}
            max={400}
            placeholder="Комментарий к заказу"
            value={comment}
            onChange={onInputChange('pay.comment')}/>

         <br/>
         {orderConfirmation.isLoading && (
            <p>'Отправляем смс...'</p>
         )}

         {orderConfirmation.error && (
            <p>'Ошибка при отправки СМС'</p>
         )}

         ({orderConfirmation.code})
         {orderConfirmation.code && (
            <Input
               placeholder="Код из СМС"
               value={smsCode}
               onChange={onInputChange('confirmation.smsCode')}/>
         )}

         {confirmError && (
            'Не верный код'
         )}

         {children}
      </div>
   )
}

export default PayForm