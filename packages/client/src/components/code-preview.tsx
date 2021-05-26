import './code-preview.css';
import { useEffect, useRef } from 'react';

interface CodePreviewProps {
  code: string;
  error: string;
};

const srcHtml = `
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title></title>
      <style>html { background-color: white; }</style>
      <script>
        const handleError = (err) => {
          const root = document.getElementById('root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';

          console.error(err);
        }

        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error)
        });

        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            handleError(err);
          }
        }, false);
      </script>
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>
`;

const CodePreview: React.FC<CodePreviewProps> = ({ code, error }) => {
  const iframe  = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = srcHtml;

    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 100);
  }, [code]);

  return(
    <div className='preview-wrapper'>
      <iframe
        title="preview"
        ref={iframe}
        srcDoc={srcHtml}
        sandbox="allow-scripts"
      />
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

export default CodePreview;
