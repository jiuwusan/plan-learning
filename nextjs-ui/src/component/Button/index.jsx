const Button = (props) => {
    const { children, ...rest } = props
    return <button type="button" {...rest}>{children}</button>
}

export default Button