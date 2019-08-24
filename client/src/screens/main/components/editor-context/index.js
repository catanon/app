import React from "react";
import Editor from "../content/components/editor";

const EditorContext = React.createContext();

class EditorProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editor: [null, null, ""]
        }
        this.handleClickEditorClose = this.handleClickEditorClose.bind(this);
        this.handleClickEditorAdd = this.handleClickEditorAdd.bind(this);
        this.handleClickEditorEdit = this.handleClickEditorEdit.bind(this);
    }

    handleClickEditor(mode = null, id = null, content = "") {
        this.setState({editor: [mode, id, content]});
    }

    handleClickEditorClose() {
        this.handleClickEditor();
    }

    handleClickEditorAdd() {console.log("Here")
        this.handleClickEditor("add");
    }

    handleClickEditorEdit(id, content) {
        this.handleClickEditor("edit", id, content);
    }

    render() {
        return (
            <EditorContext.Provider value={{
                ...this.state,
                handleClickEditorClose: this.handleClickEditorClose,
                handleClickEditorAdd: this.handleClickEditorAdd,
                handleClickEditorEdit: this.handleClickEditorEdit
            }}>
                {this.state.editor[0] && (
                    <Editor
                        editor={this.state.editor}
                        handleClickEditorClose={this.handleClickEditorClose}
                        add={content => this.add(content)}
                        edit={(id, content) => this.edit(id, content)}
                    />
                )}

                {this.props.children}
            </EditorContext.Provider>
        );
    }
}

function EditorConnect(Child) {
    return function(props) {
        return (
            <EditorContext.Consumer>
                {editorValueObject => <Child {...props} {...editorValueObject}/>}
            </EditorContext.Consumer>
        );
    };
}

export {EditorProvider, EditorConnect};
