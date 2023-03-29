import { useRef } from 'react'
import { Form, Stars, Button, Input, MDEditor } from '@/component'
import classNames from 'classnames'
import styles from './Question.module.css'

const InputCon = Form.genItem(Input);
const StarsCon = Form.genItem(Stars);
const MDEditorCon = Form.genItem(MDEditor);

const FormItem = (props) => {
    const { label, column, children } = props;
    return <div className={classNames(styles.formItem, column && styles.formItemColumn)}>
        <div className={styles.formItemLabel}>{label}：</div>
        <div className={classNames(column && styles.formItemColumnCon)}>{children}</div>
    </div>
}

const Page = (props) => {

    const submit1 = (value) => {
        console.log('提交表单1==', value);
    }

    const submit2 = (value) => {
        console.log('提交表单2==', value);
    }

    return <div className={styles.questionBox}>
        <Form onSubmit={submit1}>
            <div className={styles.formRow}>
                <FormItem label='分类'>
                    <InputCon name='title' />
                </FormItem>
                <FormItem label='难度' >
                    <StarsCon name='weight' />
                </FormItem>
            </div>
            <div className={styles.formRow}>
                <FormItem column label='问题描述'>
                    <MDEditorCon name='stem' />
                </FormItem>
                <FormItem column label='答案'>
                    <MDEditorCon />
                </FormItem>
            </div>
            <div className={styles.formRow}>
                <Button htmlType='submit' className={styles.formButton}>提交</Button>
                <Button danger htmlType='reset' className={styles.formButton}>重置</Button>
            </div>
        </Form>
    </div>
}

export default Page