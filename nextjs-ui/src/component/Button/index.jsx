import classNames from 'classnames'
import styles from './Button.module.css'

const Button = (props) => {
    const { children, htmlType = 'button', type = 'primary', ghost, danger, className, ...rest } = props

    return <button type={htmlType} className={classNames(styles.button,
        styles[type],
        danger && styles.danger,
        ghost && styles.ghost,
        className)} {...rest}>{children}</button>
}

export default Button