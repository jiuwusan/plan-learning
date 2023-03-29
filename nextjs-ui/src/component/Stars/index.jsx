import { useMemo, useEffect, useState } from 'react'
import styles from './stars.module.css'
import Checked from './icon/checked.svg'
import Unchecked from './icon/unchecked.svg'
import Image from 'next/image'

const Stars = (props) => {
    const { value: val, full = 5, onChange } = props;
    const [value, setValue] = useState(0);

    useEffect(() => {
        console.log('useEffect', value, val, value !== val);
        if (value !== val) {
            //默认为 0
            setValue(val || 0);
        }
    }, [val])

    // 定义点击事件
    const handleClick = (event) => {
        let { value: v } = event.target.dataset;
        if (v) {
            v = parseInt(v);
            onChange && onChange(v);
            (!onChange) && setValue(v);
        }
    }

    console.log('Stars-渲染-', props)
    return <div onClick={handleClick}>
        {new Array(full).fill('').map((_, i) => <Image data-value={i + 1} src={i + 1 <= value ? Checked : Unchecked} alt="" key={i} className={styles.starsItem} />)}
    </div>
}

export default Stars

