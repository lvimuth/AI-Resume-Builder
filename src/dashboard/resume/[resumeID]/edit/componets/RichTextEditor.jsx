import React, { useState } from "react";
import {
  BtnBold,
  BtnItalic,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";

function RichTextEditor({ onRichTextEditorChange }) {
  const [value, setValue] = useState();
  return (
    <div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={() => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
