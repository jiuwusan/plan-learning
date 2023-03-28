export default (props) => {
    const { value, type = 'text', onChange, rest } = props;

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
    console.log('Input--', props)
    return <input type={type} value={fttValue(value)} onChange={onChange} {...rest} />
}