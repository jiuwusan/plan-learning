import React, { useContext, useRef } from 'react'
import styles from './form.module.css'

// 数据上下文
const FieldContext = React.createContext();

// 保存 数据
class formStore {
    constructor() {
        this.store = {};
        this.entities = [];
        this.callbacks = {};
    }
    // 获取每一个得value值
    getFieldValue = (name) => {
        return this.store[name] || '';
    };

    setFieldValue = (newVals) => {
        this.store = {
            ...this.store,
            ...newVals,
        };
    };

    getFieldsValue = () => {
        return this.store;
    };
}

// 保证 实例 只创建一次
export const useForm = (form) => {
    const formInstance = useRef();
    if (!formInstance.current) {
        if (form) {
            formInstance.current = form;
        } else {
            formInstance.current = new formStore();
        }
    }
    return formInstance.current;
};

//定义表单组件

const Form = (props) => {
    const { children, onSubmit } = props;
    const value = useForm();
    const formSubmit = (e) => {
        console.log(e);
        e.preventDefault();
        onSubmit(value.store);
    };
    console.log('Form==', value);
    return <form onSubmit={formSubmit}>
        <FieldContext.Provider value={value}>{children}</FieldContext.Provider>
    </form>
}

//每一个组件
Form.Item = (props) => {
    const { children, name, validate } = props;
    const { store, getFieldValue, setFieldValue } = useContext(FieldContext);
    console.log('Form.Item', store, children);

    const getControlled = () => {
        return {
            value: getFieldValue(name),
            onChange: (e) => {
                const value = e?.target ? e?.target.value : e;
                console.log(name + '-> onChange = ', value);
                setFieldValue({ [name]: value });
            }
        }
    }
    return <>{React.cloneElement(children, getControlled())}</>
}

export default Form;