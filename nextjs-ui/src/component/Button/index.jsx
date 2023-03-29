import classNames from 'classnames'
import style from './Button.module.css'

const Button = (props) => {
    const { children, htmlType = 'button', type = 'primary', className, ...rest } = props

    return <button type={htmlType} className={classNames(style.button, style[type], className)} {...rest}>{children}</button>
}

export default Button