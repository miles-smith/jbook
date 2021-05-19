import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import CodePreview from './code-preview';
import Resizable from './resizable';
import bundle from '../bundler';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode]   = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output);
    }, 1000);

    return () => { clearTimeout(timer); }
  }, [input]);

  return(
    <Resizable direction='vertical'>
      <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction='horizontal'>
          <CodeEditor initialValue="" onChange={value => setInput(value)} />
        </Resizable>
        <CodePreview code={code} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
