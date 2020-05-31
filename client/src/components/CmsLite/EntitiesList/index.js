import React from 'react'
import { Link, useHistory, useLocation } from "react-router-dom"
import styles from 'components/CmsLite/cmslite.module.sass'
import { excludeSameEntities, sortEntities } from "utils/entities"

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const EntitiesList = (props) => {
    let history = useHistory()
    let location = useLocation()
    let query = useQuery()
    const filter = query.get("filter") || ''
    const { entities } = props

    function handleTypesChange(e) {
        history.push(`${location.pathname}?filter=${e.target.value}`)
    }

    const sortedEntities = sortEntities(entities)
    const types = excludeSameEntities(sortedEntities)

    const entitiesRender = sortedEntities
      .filter(item => { // Убираем сущности из ненужных категорий
          if (filter === '') return item
          return item.eTypeTitle === filter
      })
      .map(({ id, eType, eTypeTitle, value }) => (
        <tr key={id}>
            <td>
                <Link to={`/cmslite/entities/${id}`}>{value}</Link>
            </td>
            <td>{eTypeTitle}</td>
            <td><b>Type:</b> {eType}</td>
            <td><b>ID:</b> {id}</td>
        </tr>
      ))

    return (
      <div className={styles.entitiesPage}>
          <select value={filter} onChange={handleTypesChange}>
              <option value="">Все сущности</option>
              {types.map(item => <option key={item.id} value={item.eTypeTitle}>{item.eTypeTitle}</option>)}
          </select>
          <br/><br/>
          <table>
              <tbody>
              {entitiesRender}
              </tbody>
          </table>
      </div>
    )
}

export default EntitiesList