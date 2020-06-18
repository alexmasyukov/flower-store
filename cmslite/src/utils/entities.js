export function sortEntities(entities) {
    return entities.sort((a, b) => {
        if (a.eTypeTitle > b.eTypeTitle) return 1
        if (a.eTypeTitle < b.eTypeTitle) return -1
        return 0
    })
}

export function excludeSameEntities(entities) {
    return entities.reduce((acc, curr) => {
        if (!acc.some(item => curr.eTypeTitle === item.eTypeTitle)) {
            acc.push(curr)
        }
        return acc
    }, [])
}



// export function getAllTypes(entities) {
//     return entities.reduce((acc, curr) => {
//         if (!acc.some(item => item.eng === curr.eType)) {
//             acc.push({
//                 eng: curr.eType,
//                 rus: curr.eTypeTitle
//             })
//         }
//         return acc
//     }, [])
// }