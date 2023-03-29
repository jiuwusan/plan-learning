import classNames from 'classnames'
import style from './Input.module.css'

export default (props) => {
    const { value, type = 'text', onChange, className, rest } = props;

    const fttValue = (val) => {
        let result = val;
        if (!result) {
            switch (type) {
                case 'text':
                    result = ''
                    break;
                default:
                    break;
            }
        }
        return result
    }
    console.log('Input-渲染-', props)
    return <input className={classNames(style.input, className)} type={type} value={fttValue(value)} onChange={onChange} {...rest} />
}