import React, { useRef, useState } from "react"
import JoditEditor from "jodit-react"

const CmsEditor = ({ onChange }) => {
    const editor = useRef(null)
    const [content, setContent] = useState('')

    const config = {
        buttons: ['bold', 'italic', 'underline', 'eraser', '|', 'ul', 'ol', 'outdent', 'indent', 'brush', 'paragraph', 'image', 'table', 'link', '|', 'align', '|', 'hr', 'source', 'fullsize', 'undo', 'redo']
    }

    return (
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={content => setContent(content)} // preferred to use only this option to update the content for performance reasons
        onChange={content => onChange(content)}
      />
    )
}

export default CmsEditor