import { useRef } from 'react'
import { Form, Stars, Button, Input } from '@/component'
import styles from './push.module.css'

const Page = (props) => {
    const form = useRef();

    // const submit = (value) => {
    //     console.log('提交表单==', value);
    // }

    const submit = () => {
        // form.current.setFieldsValue({ title: '您好', grade: 2 })
        console.log('提交表单==', form.current);
    }

    return <div className={styles.questionBox}>
        <Form ref={form} onSubmit={submit}>
            <Form.Item name='title'>
                <Input type="text"  />
            </Form.Item>
            <Form.Item name='grade'>
                <Stars />
            </Form.Item>
            {/* <button type='submit'>提交</button> */}
            <Button onClick={submit}>提交</Button>
            <button type='reset'>重置</button>
        </Form>
    </div>
}

export default Page