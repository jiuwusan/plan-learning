import { cloneElement, PureComponent, forwardRef, useImperativeHandle } from 'react'
import FieldContext, { useForm, debounce } from './hooks'

/**
 * 定义 From , 使用 forwardRef 传递 useImperativeHandle 自定义 Ref
 */
export const Form = forwardRef(({ children, form, onSubmit: formSubmit }, ref) => {

    const [formInstance] = useForm(form);

    // 透传 Ref
    useImperativeHandle(ref, () => {
        return {
            submit: formInstance.submit,
            reset: formInstance.reset,
            validate: formInstance.reset
        };
    }, []);

    // 提交
    const onSubmit = (e) => {
        e.preventDefault();
        formSubmit && formSubmit(formInstance.submit());
    };

    // 重置
    const onReset = (e) => {
        e.preventDefault();
        formInstance.reset();
    };

    return (
        <form {...{ onSubmit, onReset }}>
            <FieldContext.Provider value={formInstance}>{children}</FieldContext.Provider>
        </form>
    );
});

export class FormItem extends PureComponent {
    static contextType = FieldContext;
    componentDidMount() {
        // 注册 当前组件到 store
        const { registerEneity } = this.context;
        // 组件卸载，删除实例
        this.cancelRegister = registerEneity(this);
    }
    componentWillUnmount() {
        // 移除
        this.cancelRegister();
    }
    filedFourceUpdate() {
        this.forceUpdate();
    }

    getControled = () => {
        const { getFieldValue, setFieldsValue, getFieldsValue } = this.context;
        const { name, onChange: propChange } = this.props;

        return {
            value: getFieldValue(name),
            onChange: (e) => {
                const value = e?.target ? e?.target.value : e;
                setFieldsValue({ [name]: value });
                // 方便监听到控件值得变化
                propChange && propChange(value);
            }
        };
    };

    render() {
        const { children } = this.props;
        // 想 表单 控件，增加 value , onChange 属性
        return <>{cloneElement(children, this.getControled())}</>;
    }
}

Form.Item = FormItem;

Form.useForm = useForm;

export default Form
