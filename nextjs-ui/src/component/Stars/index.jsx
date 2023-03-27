import { memo, useRef, useEffect, useState, useMemo } from 'react'
import styles from './stars.module.css'
import Checked from './icon/checked.svg'
import Unchecked from './icon/unchecked.svg'
import Image from 'next/image'

const Stars = (props) => {
    const { value: val, full = 5, onChange } = props;
    const [value, setValue] = useState(1);
    useEffect(() => {
        if (value !== val) {
            //默认为 0
            setValue(value || 1);
        }
    }, [val])
    useEffect(() => {
        if (value !== val) {
            onChange && onChange(value);
        }
    }, [value])
    return <div>
        {new Array(full).fill('').map((_, i) => {
            if (i + 1 <= value) return <Image src={Checked} alt="" key={i} className={styles.starsItem} onClick={() => setValue(i + 1)} />
            else return <Image src={Unchecked} alt="" className={styles.starsItem} key={i} onClick={() => setValue(i + 1)} />
        })}
    </div>
}

export default Stars

