import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';
import CodePreview from './components/code-preview';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode]   = useState('');
  const service = useRef<any>();

  const startService = async () => {
    service.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };

  const onClick = async () => {
    if(!service.current)
      return;

    const result = await service.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input)
      ],
      define: {
        global: 'window',
        'process.env.NODE_ENV': '"production"',
      },
    });

    setCode(result.outputFiles[0].text);
  }

  useEffect(() => {
    startService();
  }, []);

  return(
    <div>
      <CodeEditor initialValue="" onChange={value => setInput(value)} />
      <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
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
