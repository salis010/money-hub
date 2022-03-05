export const getDateFromString = (str) => {
    const [year, month, day] = str.split('-')
    
    return new Date(year, month - 1, day)
}

