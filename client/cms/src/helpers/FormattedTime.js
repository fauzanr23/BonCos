export const formattedTime = (input) => {
    const date = new Date(input)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    return `${day}-${month}-${year}`
}
