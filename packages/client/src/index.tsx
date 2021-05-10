import 'bulmaswatch/superhero/bulmaswatch.min.css';

import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import CodeEditor from './components/code-editor';
import CodePreview from './components/code-preview';
import bundle from './bundler';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode]   = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  }

  return(
    <div>
      <CodeEditor initialValue="" onChange={value => setInput(value)} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <CodePreview code={code} />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
