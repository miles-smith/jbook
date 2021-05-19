import { useState } from 'react';
import CodeEditor from './code-editor';
import CodePreview from './code-preview';
import Resizable from './resizable';
import bundle from '../bundler';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode]   = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  }

  return(
    <Resizable direction='vertical'>
      <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
        <CodeEditor initialValue="" onChange={value => setInput(value)} />
        <CodePreview code={code} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
