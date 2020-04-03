import React, { Component } from 'react'
import { connect } from "react-redux"

class Cart extends Component {
  render() {
    return (
      <div>
        <h2>Ваш заказ</h2>
        products

        total

        <h5>Ваше имя</h5>
        Name
        Phone
        Date delivery
        Time delivery



        Куда доставить?
        <h5>Получатель</h5>
        Имя и номер телефона

        Добавить визитку c запиской - бесплатно!
        Записка на открытке

        <h5>Способ оплаты</h5>
        Оплата банковской картой Visa, Mastercard, Мир
        Наличными при получении
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Cart)