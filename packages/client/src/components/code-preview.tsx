import './code-preview.css';
import { useEffect, useRef } from 'react';

interface CodePreviewProps {
  code: string;
};

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

const CodePreview: React.FC<CodePreviewProps> = ({ code }) => {
  const iframe  = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = srcHtml;
    iframe.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return(
    <div className='preview-wrapper'>
      <iframe
        title="preview"
        ref={iframe}
        srcDoc={srcHtml}
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default CodePreview;
