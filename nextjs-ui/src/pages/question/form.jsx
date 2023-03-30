import { useRef } from 'react'
import { Form, Stars, Button, Input, MDEditor, Select } from '@/component'
import classNames from 'classnames'
import styles from './Question.module.css'
import API from '@/api'

const { questionApi } = API

console.log('questionApi==', questionApi);

const InputCon = Form.genItem(Input);
const StarsCon = Form.genItem(Stars);
const MDEditorCon = Form.genItem(MDEditor);
const SelectCon = Form.genItem(Select);

const FormItem = (props) => {
    const { label, column, children } = props;
    return <div className={classNames(styles.formItem, column && styles.formItemColumn)}>
        <div className={styles.formItemLabel}>{label}：</div>
        <div className={classNames(column && styles.formItemColumnCon)}>{children}</div>
    </div>
}

const typeOptions = [
    { label: 'HTML5/CSS', value: 'HTML5/CSS' },
    { label: 'JavaScript', value: 'JavaScript' },
    { label: 'WebAPI', value: 'WebAPI' },
    { label: 'React', value: 'React' },
    { label: 'Vue', value: 'Vue' },
    { label: 'Webpack', value: 'Webpack' },
    { label: 'NodeJS', value: 'NodeJS' },
    { label: 'ES6', value: 'ES6' }
]

export async function getStaticProps(context) {
    const result = await questionApi.queryList();
    console.log('接口请求--', result);
    return {
        props: {

        }, // will be passed to the page component as props
    }
}

const Page = (props) => {

    const submit = (value) => {
        console.log('提交表单1==', value);

        submitData();
    }

    const submitData = async () => {
        const res = await fetch('/apiv1/question/saveOrUpdate', {
            method: 'post',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await res.json();

        console.log('提交成功', result);
    }

    return <div className={styles.questionBox}>
        <Form onSubmit={submit}>
            <div className={styles.formRow}>
                <FormItem label='Type'>
                    <SelectCon name='type' options={typeOptions} />
                </FormItem>
                <FormItem label='Weight' >
                    <StarsCon name='weight' />
                </FormItem>
            </div>
            <div className={styles.formRow}>
                <FormItem column label='Stem'>
                    <MDEditorCon name='stem' />
                </FormItem>
                <FormItem column label='Answer'>
                    <MDEditorCon name='answer' />
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