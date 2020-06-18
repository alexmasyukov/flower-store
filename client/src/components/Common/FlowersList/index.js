import React from 'react'
import cn from 'classnames'

const FlowersList = ({ flowers = [], counts = [], className = '' }) => (
    <ul className={cn(className && className)}>
        {flowers.map((flower, i) => (
            <li key={i}>
                <span>{flower}</span>{counts[i] > 0 && `: ${counts[i]} шт.`}
            </li>
        ))}
    </ul>
)

export default FlowersList
