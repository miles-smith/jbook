import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
  initialValue: string,
  onChange: (value: string) => void,
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;

    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    const editor         = editorRef.current;
    const currentValue   = editor.getModel().getValue();

    editor.setValue(
      prettier.format(currentValue, {
        parser: 'babel',
        plugins: [
          parser
        ],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
    );
  };

  return(
    <div>
      <button onClick={onFormatClick}>Format</button>
      <MonacoEditor
        editorDidMount = {onEditorDidMount}
        value    = {initialValue}
        height   = "300px"
        language = "javascript"
        theme    = "dark"
        options  = {{
          wordWrap: 'on',
          minimap: {
            enabled: false
          },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
