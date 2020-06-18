import React, { Component } from 'react'
import cn from 'classnames'
import { Link } from "react-router-dom"
import { Row } from "components/Bootstrap"
import styles from 'components/cmslite.module.sass'

class ReviewsList extends Component {
    render() {
        const { reviews, delete: deleteReview } = this.props

        const renderReviews = reviews.map(({ id, public: pub, created_at, name, instagram, telegram, text }) => (
          <div key={id} className={cn('col-md-12', !pub && styles.unpublic)}>
              <Link to={`/reviews/${id}`}>
                  {name && `${name}  `}
                  {instagram && `(Instagram) ${instagram}  `}
                  {telegram && `(Telegram) ${telegram}  `}
              </Link>
              <span className={styles.listLabel}>{text.substr(0, 60).trim()} ...</span>
              <span className={styles.listLabel}><b>ID:</b> {id} | <b>Создан:</b> {created_at}</span>
              <button
                className="mt-3"
                onClick={() => {
                    if (window.confirm("Удалить?"))
                        deleteReview(id)
                          .then(res => {
                              console.log(res)
                              if (res && 'status' in res && res.status === 'done') {
                                  this.props.history.go()
                              } else {
                                  alert('Ошибка при удалении. Подробности в консоли')
                              }
                          })
                }}>Удалить
              </button>
              <hr/>
          </div>
        ))

        return (
          <Row>
              {renderReviews}
          </Row>
        )
    }
}

export default ReviewsList