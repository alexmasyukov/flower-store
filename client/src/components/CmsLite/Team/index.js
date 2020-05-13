import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Row } from "components/Bootstrap"
import styles from 'components/CmsLite/cmslite.module.sass'

class Team extends Component {
    state = {
        team: []
    }

    componentDidMount() {
        this.setState({
            team: this.props.team
        })
    }

    render() {
        const { team } = this.state
        const { getImage } = this.props

        const teamRender = team.map(({ id, name, photo, isFlorist, rule }) => (
          <div key={id} className="col-md-12">
              <Row>
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
                  </div>
                  <hr/>
              </Row>
          </div>
        ))

        return (
          <div className="row">
              <Link to="/cmslite/team-add">Добавить сотрудника</Link>
              <br/><br/>
              {teamRender}
          </div>
        )
    }
}

export default Team