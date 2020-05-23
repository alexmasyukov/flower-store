import React, { Component } from 'react'
import cn from 'classnames'
import { Link } from "react-router-dom"
import { Row } from "components/Bootstrap"
import styles from 'components/CmsLite/cmslite.module.sass'

class AdditivesList extends Component {
    render() {
        const { additives, delete: deleteAdditive} = this.props

        const renderAdditives = additives.map(({ id, public: pub, created_at, title }) => (
          <div key={id} className={cn('col-md-12', !pub && styles.unpublic)}>
              <Link to={`/cmslite/additives/${id}`}>
                  {title}
              </Link>
              <span className={styles.listLabel}><b>ID:</b> {id}</span>
              {/*<button*/}
                {/*className="mt-3"*/}
                {/*onClick={() => {*/}
                    {/*if (window.confirm("Удалить?"))*/}
                        {/*deleteAdditiv(id)*/}
                          {/*.then(res => {*/}
                              {/*console.log(res)*/}
                              {/*if (res && 'status' in res && res.status === 'done') {*/}
                                  {/*this.props.history.go()*/}
                              {/*} else {*/}
                                  {/*alert('Ошибка при удалении. Подробности в консоли')*/}
                              {/*}*/}
                          {/*})*/}
                {/*}}>Удалить*/}
              {/*</button>*/}
              <hr/>
          </div>
        ))

        return (
          <Row>
              {renderAdditives}
          </Row>
        )
    }
}

export default AdditivesList