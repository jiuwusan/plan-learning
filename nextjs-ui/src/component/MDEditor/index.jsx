import { useRef, useLayoutEffect } from 'react'

const Markdown = (props) => {
    const textDom = useRef();
    useLayoutEffect(() => {
        textDom.current && (textDom.current.contentDocument.designMode = 'on')
    }, [])
    return <div>
        <iframe ref={textDom} style={{ width: '400px', height: '600px' ,border:'1px solid #000'}}></iframe>
    </div>
}

export default Markdown