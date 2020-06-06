import { normalize, schema } from "normalizr"
import { format } from "date-fns"

export function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export const compose = (...funcs) => component =>
  funcs.reduceRight((prevResult, f) => f(prevResult), component)

export const formatDateDMY = (date) => format(date, 'dd.MM.yyyy')

export function getNameById(id, names) {
    const item = names.find(item => item.id === id)
    return item.name || ''
}

export function classes() {
    const [...args] = arguments
    return args.reduce((total, arg) => arg ? total + ' ' + arg : total)
}

export const normalizeObjects = (entitiesName, items) => {
    const entitiesSchema = new schema.Entity(entitiesName)
    const listSchema = [entitiesSchema]
    return normalize(items, listSchema)
}


export function getAvailableDate(date, year = false) {
    const mounts = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'
    const d = new Date(date)
    const monthRus = mounts.split(',')[d.getMonth()]
    return `${d.getDate()} ${monthRus} ${year ? d.getFullYear() : ''}`
}

export const getObjectWithoutKeys = (object, keysToRemove) => {
    return Object.entries(object).reduce((results, item) => {
        const [key, value] = item

        return keysToRemove.includes(key) ?
          { ...results } :
          { ...results, [key]: value }
    }, {})
}