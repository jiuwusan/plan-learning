import { memo, useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Button from '../Button'
import styles from './md.module.css'
import BoldIcon from './icon/bold.svg'
import TitleIcon from './icon/title.svg'
import OListIcon from './icon/olist.svg'
import UListIcon from './icon/ulist.svg'

const ToolItem = (props) => {
    const { type, children, ...rest } = props;
    return <Button className={styles.markdownEditorToolitem} {...rest}>{children}</Button>
}

const Tools = (props) => {
    const { onAction } = props;
    return <div>
        <ToolItem cmd='bold' onClick={() => onAction({ cmd: 'bold' })}>
            <Image src={BoldIcon} alt="" />
        </ToolItem>
        <ToolItem cmd='title' onClick={() => onAction({ cmd: 'title' })}>
            <Image src={TitleIcon} alt="" />
        </ToolItem>
        <ToolItem cmd='insertorderedlist' onClick={() => onAction({ cmd: 'insertorderedlist' })}>
            <Image src={OListIcon} alt="" />
        </ToolItem>
        <ToolItem cmd='insertunorderedlist' onClick={() => onAction({ cmd: 'insertunorderedlist' })}>
            <Image src={UListIcon} alt="" />
        </ToolItem>
    </div>
}

const Markdown = (props) => {
    const MDoc = useRef();
    useEffect(() => {
        console.log('MDoc.current', MDoc.current.contentWindow.document);
        MDoc.current.contentDocument.designMode = 'on';
        MDoc.current.contentDocument.contentEditable = true;
    }, [])
    console.log('');
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
        const { cmd } = action;
        switch (cmd) {
            case 'title':
                MDoc.current.contentDocument.execCommand('bold', false);
                break;
            default:
                MDoc.current.contentDocument.execCommand(cmd, true);
                break;

        }
    }

    return <div className={styles.markdownEditor}>
        <Tools onAction={onAction}></Tools>
        <iframe ref={MDoc} style={{ width: '400px', height: '600px', border: '1px solid #000' }}></iframe>
    </div>
}

export default Markdown