import React, { createContext, PureComponent } from 'react'

const FieldContext = createContext();

class formStore {

    constructor() {
        this.store = {};
        this.entities = [];
        this.callbacks = {};
    }

    registerEneity = (entity) => {
        this.entities.push(entity);
        return () => {
            this.entities = this.entities.filter((item) => item !== entity);
            delete this.store[entity.props.name];
        };
    };

    getFieldsValue = () => {
        return this.store;
    };

    setFieldsValue = (newVals) => {
        this.store = {
            ...this.store,
            ...newVals,
        };
        this.entities.forEach((entity) => {
            const name = entity.props.name;
            // 触发强制更新
            if (Object.keys(newVals).includes(name)) entity.filedFourceUpdate();
        });

    };

    getFieldValue = (name) => {
        return this.store[name] || null;
    };

    setFieldValue = (name, value) => {
        this.setFieldsValue({ [name]: value });
    };

    validate = () => { };

    setCallbacks = (callbacks) => {
        this.callbacks = {
            ...this.callbacks,
            ...callbacks,
        };
    };

    validate = () => {
        // 验证 表单数据
    };

    submit = () => {
        return this.getFieldsValue();
    };

    reset = () => {
        let newVals = {};
        Object.keys(this.store).forEach((name) => {
            newVals[name] = null;
        })
        this.setFieldsValue(newVals);
    };

}


export const useForm = (form) => {
    const formInstance = React.useRef();
    if (!formInstance.current) {
        if (form) {
            formInstance.current = form;
        } else {
            formInstance.current = new formStore();
        }
    }
    return [formInstance.current];
};


export default FieldContext

/**
 * 
 * @param {*} fn 
 * @param {*} wait 
 * @param {*} immediate 立即执行
 * @returns 
 */
export function debounce(fn, wait, immediate) {

    let timer;

    return function () {

        // 保留 this 指向
        let context = this;

        // 保留参数
        let args = arguments;

        // 立即执行
        if (immediate && !timer) {
            fn.apply(context, args)
        }

        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(context, args);
            clearTimeout(timer);
        }, wait)
    }
}

/**
 * 
 * @param {*} fn 
 * @param {*} wait 
 * @param {*} immediate 是否 立即执行一次
 * @returns 
 */
export function throttle(fn, wait, immediate) {
    let timer;
    let flag = immediate;

    return function () {
        // 保留 this 指向
        let context = this;
        // 保留参数
        let args = arguments;

        if (flag) {
            fn.apply(context, args)
            flag = false
        }

        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args);
                clearTimeout(timer);
                timer = null;
            }, wait)
        }
    }
}