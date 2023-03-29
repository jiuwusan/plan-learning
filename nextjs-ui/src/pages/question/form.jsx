import { useRef } from 'react'
import { Form, Stars, Button, Input } from '@/component'
import styles from './push.module.css'

const Page = (props) => {

    const submit = (value) => {
        console.log('提交表单==', value);
    }

    return <div className={styles.questionBox}>
        <Form onSubmit={submit}>
            <Form.Item name='title'>
                <Input type="text" de />
            </Form.Item>
            <Form.Item name='grade' defaultValue={1}>
                <Stars />
            </Form.Item>
            <Button htmlType='submit'>提交</Button>
            <Button htmlType='reset'>重置</Button>
        </Form>
    </div>
}

export default Page