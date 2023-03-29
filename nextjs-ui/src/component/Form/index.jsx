import React, { forwardRef, useImperativeHandle, useMemo, cloneElement } from 'react'
import { Provider, useForm, useControled } from './hooks'

/**
 * 定义 Form，forwardRef 透传方法
 */
export const Form = forwardRef(({ children, onSubmit: formSubmit }, ref) => {

    const formInstance = useForm();

    // 透传 Ref
    useImperativeHandle(ref, () => {
        return {
            submit: () => formInstance[0],
            reset: formInstance[1].reset,
        };
    }, []);

    // 提交
    const onSubmit = (e) => {
        e.preventDefault();
        formSubmit && formSubmit(formInstance[0]);
    };

    // 重置
    const onReset = (e) => {
        e.preventDefault();
        formInstance[1].reset();
    };

    return (
        <form {...{ onSubmit, onReset }}>
            <Provider value={formInstance}>{children}</Provider>
        </form>
    );
});


export const FormItem = ({ children, name, onChange: propChange }) => {
    const [value, onChange] = useControled({ name, propChange });

    const NewControled = useMemo(() => cloneElement(children, { value, onChange }), [value])

    return <>{NewControled}</>
}

Form.Item = FormItem;

Form.useForm = useForm;

/**
 * 高阶组件
 * 
 * @param {*} Controled 
 */
Form.genItem = (Controled) => {
    return (props) => {
        const { name, onChange, ...rest } = props;
        return <Form.Item name={name} onChange={onChange}>
            <Controled {...rest} />
        </Form.Item>
    }
};

export default Form