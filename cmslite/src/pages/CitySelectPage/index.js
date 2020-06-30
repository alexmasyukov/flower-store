import React from 'react'
import CmsLayout from 'layouts/Cms'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CITIES } from 'constants/common'


export default function CitySelectPage() {
    const [city, setCity] = useState(CITIES.CHITA.ENG)
    return (
        <div>
        {/* <CmsLayout> */}
            <h1>Выберите город</h1>
            <select onChange={(e) => setCity(e.target.value)}>
                <option value={CITIES.CHITA.ENG}>{CITIES.CHITA.RUS}</option>
                <option value={CITIES.MOSCOW.ENG}>{CITIES.MOSCOW.RUS}</option>
            </select>
            <Link to={`/${city}`}>Готово</Link>
        {/* </CmsLayout> */}
        </div>
    )
}
