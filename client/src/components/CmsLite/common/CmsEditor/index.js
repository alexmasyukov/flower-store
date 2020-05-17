import React, { Component } from "react"
import JoditEditor from "jodit-react"


class CmsEditor extends Component {
    state = {
        content: ''
    }

    config = {
        buttons: ['bold', 'italic', 'underline', 'eraser', '|', 'ul', 'ol', 'outdent', 'indent', 'brush', 'paragraph', 'image', 'table', 'link', '|', 'align', '|', 'hr', 'source', 'fullsize', 'undo', 'redo']
    }

    handleSetContent = (content) => {
        this.setState({
            content
        })
    }

    componentDidMount() {
        this.setState({
            content: this.props.initialContent
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.content === '') return true
        return false
    }

    render() {
        const { onChange } = this.props

        return (
          <div>
              <JoditEditor
                // ref={this.editor}
                value={this.state.content}
                config={this.config}
                tabIndex={1} // tabIndex of textarea
                onBlur={this.handleSetContent} // preferred to use only this option to update the content for performance reasons
                onChange={content => {
                    onChange(content)
                }}
              />
          </div>
        )
    }
}

export default CmsEditor