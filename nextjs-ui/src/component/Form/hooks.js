import React, { createContext, useState, useCallback, useContext } from 'react'

const FieldContext = createContext({});

export const Provider = ({ children, ...rest }) => <FieldContext.Provider {...rest}>{children}</FieldContext.Provider>

export const useForm = () => {
    const [formData, setFormData] = useState({});

    const setValues = (newVals) => {
        setFormData((prevVals) => {
            // 使用函数可以 取到最新 state
            return { ...prevVals, ...newVals }
        });
    }

    // 重置
    const reset = () => {
        setFormData({});
    }

    return [formData, { setValues, reset }];
};


/**
 * 通过 name 取到 最新的值
 * @param {*} name 
 * @returns 
 */
export const useControled = ({ name, propChange }) => {
    const [formData, { setValues }] = useContext(FieldContext);

    //回调
    const onChange = useCallback((event) => {
        const value = event?.target ? event?.target.value : event;
        setValues({ [name]: value });
        propChange && propChange(value);
    }, [])

    return [formData[name], onChange];
};