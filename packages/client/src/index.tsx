import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
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

  const srcHtml = `
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title></title>
        <script>${code}</script>
      </head>
      <body>
        <h1>Hello IFrame</h1>
      </body>
    </html>
  `;

  return(
    <div>
      <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe srcDoc={srcHtml} sandbox="allow-scripts"></iframe>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
