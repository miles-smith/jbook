import './text-editor.css';
import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useActions } from '../hooks/use-actions';
import { Cell } from '../state';

interface TextEditorProps {
  cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing]   = useState(false);
  const { updateCell } = useActions();

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
        <MDEditor value={cell.data} onChange={(md) => updateCell(cell.id, md || '')} />
      </div>
    )
  }

  return(
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.data || "Click to edit"} />
      </div>
    </div>
  );
};

export default TextEditor;
