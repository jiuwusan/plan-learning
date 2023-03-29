import { MDEditor } from '@/component'
import styles from './Question.module.css'

const Page = (props) => {
    return <div className={styles['question-push']}>
        <MDEditor />
        <MDEditor />
    </div>
}

export default Page