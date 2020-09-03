const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

const revertDate = (date) => {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}
export { formatDate, revertDate }