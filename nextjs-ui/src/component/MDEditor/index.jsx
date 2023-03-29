import { memo, useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Button from '../Button'
import styles from './MD.module.css'
import BoldIcon from './icon/bold.svg'
import TitleIcon from './icon/title.svg'
import OListIcon from './icon/olist.svg'
import UListIcon from './icon/ulist.svg'

const ToolItem = (props) => {
    const { children, ...rest } = props;
    return <Button ghost className={styles.markdownEditorToolitem} {...rest}>{children}</Button>
}

const Tools = (props) => {
    const { onAction } = props;
    const [popData, setPopData] = useState({ style: { display: 'none' }, list: [] });

    const handleClick = (event) => {
        let { cmd } = event.target.dataset;
        if (cmd) {
            switch (cmd) {
                case 'fontsize':
                    let { offsetLeft, offsetTop } = event.target;
                    setPopData({
                        cmd,
                        style: { left: offsetLeft + 'px', top: offsetTop + 18 + 'px', display: popData.style.display === 'none' ? 'block' : 'none' },
                        list: [{ label: '7 号字', value: '7' },
                        { label: '6 号字', value: '6' },
                        { label: '5 号字', value: '5' },
                        { label: '4 号字', value: '4' },
                        { label: '3 号字', value: '3' },
                        { label: '2 号字', value: '2' },
                        { label: '1 号字', value: '1' }]
                    })
                    break;
                default:
                    onAction({ cmd });
                    break;
            }
        }
    }

    const popClick = (event) => {
        let { value } = event.target.dataset;
        if (value) {
            onAction({ cmd: popData.cmd, value });
            setPopData({ style: { display: 'none' }, list: [] })
        }
    }

    return <div className={styles.markdownEditorTools} onClick={handleClick}>
        <ToolItem data-cmd='bold'>
            <Image src={BoldIcon} alt="" />
        </ToolItem>
        <ToolItem data-cmd='fontsize'>
            <Image src={TitleIcon} alt="" />
        </ToolItem>
        <ToolItem data-cmd='insertorderedlist'>
            <Image src={OListIcon} alt="" />
        </ToolItem>
        <ToolItem data-cmd='insertunorderedlist'>
            <Image src={UListIcon} alt="" />
        </ToolItem>

        <div className={styles.markdownEditorToolPop} style={popData.style} onClick={popClick}>
            {
                popData.list.map((item) => <div key={item.value} data-value={item.value} className={styles.markdownEditorToolPopItem}>{item.label}</div>)
            }
        </div>
    </div>
}

const Markdown = (props) => {
    const { value = '', onChange } = props;
    const MDoc = useRef();
    const [text, setText] = useState('');

    useEffect(() => {
        if (value !== text) {
            MDoc.current.contentWindow.focus();
            MDoc.current.contentDocument.execCommand('InsertHtml', false, value);
            setText(value);
        }
    }, [value])

    useEffect(() => {
        if (value !== text) {
            onChange && onChange(text);
        }
    }, [text])

    useEffect(() => {
        MDoc.current.contentDocument.designMode = 'on';
        MDoc.current.contentDocument.contentEditable = true;
        MDoc.current.contentWindow.document.onkeydown = (event) => {
            if (event.ctrlKey == true && event.keyCode == 83) {
                event.preventDefault();
                event.returnvalue = false;
                let content = MDoc.current.contentWindow.document.body.innerHTML;
                setText(content);
            }
        }

        return () => MDoc.current.contentWindow.document.onkeydown = null;
    }, [])

    function insertHTML(vnode) {
        const { tagName, props: vp = {}, children = '' } = vnode;
        //转字符串
        let vpstr = '';
        for (const key in vp) {
            if (Object.hasOwnProperty.call(vp, key)) {
                vpstr += `${key}='${vp[key]}' `
            }
        }
        let shtml = `<${tagName} ${vpstr}>${children}</${tagName}>`;
        MDoc.current.contentWindow.focus();
        MDoc.current.contentDocument.execCommand('InsertHtml', false, shtml);
    }

    const onAction = (action) => {
        const { cmd, value } = action;
        switch (cmd) {
            default:
                MDoc.current.contentDocument.execCommand(cmd, false, value);
                break;

        }
    }

    return <div className={styles.markdownEditor}>
        <Tools onAction={onAction}></Tools>
        <iframe ref={MDoc} className={styles.editorIframe}></iframe>
    </div>
}

export default Markdown