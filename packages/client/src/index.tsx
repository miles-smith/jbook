import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
  const [input, setInput] = useState('');
  const service = useRef<any>();
  const iframe  = useRef<any>();

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

    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
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
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.getElementById('root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';

              console.error(err);
            }
          }, false);
        </script>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  `;

  return(
    <div>
      <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe title="preview" ref={iframe} srcDoc={srcHtml} sandbox="allow-scripts"></iframe>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
