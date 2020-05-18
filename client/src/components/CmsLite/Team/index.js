import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Row } from "components/Bootstrap"
import styles from 'components/CmsLite/cmslite.module.sass'
import cn from "classnames"

class Team extends Component {
    render() {
        const { team, getImage, delete: deletePerson } = this.props

        const teamRender = team.map(({ id, name, public: pub, photo, isFlorist, rule }) => (
          <Row key={id} className={cn(!pub && styles.unpublic)}>
              <div className="col-md-2">
                  <img style={{ width: '100%' }}
                       src={getImage(photo)}
                       alt=""/>
              </div>
              <div className="col-md-10 pl-1">
                  <Link to={`/cmslite/team/${id}`}>
                      {name}</Link>
                  <span className={styles.listLabel}><b>ID:</b> {id}</span>
                  <span className={styles.listLabel}><b>Роль:</b> {rule}</span>
                  <span className={styles.listLabel}>
                          <b>Флорист:</b> {isFlorist ? 'Да' : 'Нет'}
                      </span>
                  <button
                    className="mt-3"
                    onClick={() => {
                      if (window.confirm("Удалить сотрудника?"))
                          deletePerson(id)
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
              </div>
              <hr/>
          </Row>
        ))

        return (
          <>
              <Link to="/cmslite/team-add">Добавить сотрудника</Link>
              <br/><br/>
              {teamRender}
          </>
        )
    }
}

export default Team