import React from 'react'
import { useLocation } from "react-router-dom"
import cn from 'classnames'
import CollectionButton from "components/Filter/CollectionsButtons/CollectionButton"
import styles from './CollectionsButtons.module.sass'

function useQuery() {
   return new URLSearchParams(useLocation().search)
}

const CollectionsButtons = ({ collections }) => {
   let query = useQuery()
   const collection = query.get("collection")
   // console.log(collection)

   return (
      <div className={styles.buttons}>
         {collections.map(({ title }, i) => (
            <CollectionButton
               key={i}
               className={cn(styles.button, collection === title && styles.active)}
               title={title}
            />
         ))}
      </div>
   )
}

export default CollectionsButtons