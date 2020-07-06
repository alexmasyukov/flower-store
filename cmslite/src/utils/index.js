export function getCityIdByEngName(engName, cities) {
    return Object.values(cities)
      .filter(item => item.ENG === engName)
      .reduce((res, item) => item, false)
}

export function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export const compose = (...funcs) => x => funcs.reduceRight((r, f) => f(r), x)

export const when = (cond, f) => x => {
    if (typeof cond === 'boolean') {
        return cond ? f(x) : x;
    }
    return cond(x) ? f(x) : x;
}

export function getAvailableDate(date, year = false) {
    const mounts = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'
    const d = new Date(date)
    const monthRus = mounts.split(',')[d.getMonth()]
    return `${d.getDate()} ${monthRus} ${year ? d.getFullYear() : ''}`
}


export function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
}
export const uuid = () => Math.random().toString(32).substr(2, 12)