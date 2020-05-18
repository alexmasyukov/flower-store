import React from 'react'
import styles from 'components/TeamList/teamList.module.sass'
import { Row } from "components/Bootstrap"

const Person = ({ photo, name = '', rule = '', instagram = '' }) => (
  <Row className={styles.person}>
      <div className="col-6">
          {/*<div className={styles.img} style={{*/}
              {/*backgroundImage: `url(${photo})`,*/}
              {/*backgroundPosition: 'center'*/}
          {/*}}/>*/}
          {photo ? (
            <img className={styles.photo} src={photo} alt=""/>
          ):(
            <div className={styles.img}/>
          )}
      </div>
      <div className="col-6 pt-5">
          <p className={styles.name}>{name}</p>
          {rule}
          {instagram && <a className={styles.ist} href={instagram}>Instagram</a>}
      </div>
  </Row>
)

const TeamList = ({ persons = [], getImage }) => {
    return (
      <Row>
          {persons.map(person => (
            <div key={person.id} className={'col-md-4'}>
                <Person {...person} photo={person.photo ? getImage(person.photo) : undefined}/>
            </div>
          ))}
      </Row>
    )
}

export default TeamList