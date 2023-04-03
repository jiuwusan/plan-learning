const request = (option) => {
    return fetch(option.url, option)
}

export default request