import styles from './Select.module.css'

const Select = (props) => {
    const { options = [], ...rest } = props;
    return <select className={styles.selectBox} {...rest}>
        <option value="">请选择</option>
        {
            options.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)
        }
    </select>
}

export default Select