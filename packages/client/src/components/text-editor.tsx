import './text-editor.css';
import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if(editorRef.current && event.target && editorRef.current.contains(event.target as Node))
        return

      setEditing(false);
    };

    const eventListenerOptions = {
      capture: true
    };

    document.addEventListener('click', listener, eventListenerOptions);

    return () => {
      document.removeEventListener('click', listener, eventListenerOptions);
    }
  }, []);

  if(editing) {
    return(
      <div className="text-editor" ref={editorRef}>
        <MDEditor />
      </div>
    )
  }

  return(
    <div className="text-editor" onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={'# Markdown Preview'} />
    </div>
  );
};

export default TextEditor;
