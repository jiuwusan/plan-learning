import { Form, Stars } from '@/component'
import styles from './push.module.css'

const Page = (props) => {
    const submit = (value) => {
        console.log('提交表单==', value);
    }
    return <div className={styles.questionBox}>
        <Form onSubmit={submit}>
            <Form.Item name='title'>
                <input type="text" />
            </Form.Item>
            <Form.Item name='grade'>
                <Stars />
            </Form.Item>
            <button type='submit'>提交</button>
        </Form>
    </div>
}

export default Page