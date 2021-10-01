import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand =
  new Command()
    .command('serve [filename]')
    .description('Open a file for editing')
    .option('-p, --port <number>', 'Port to run server on', '4005')
    .action(async (filename = 'notebook.js', options: { port: string }) => {
      try {
        const filePath = path.parse(filename);
        const file     = path.resolve(filePath.root, filePath.dir, filePath.base);

        await serve(+options.port, file, !isProduction);

        console.log(`Opened ${file}. Navigate to http://localhost:${options.port} to edit the file.`);
      } catch (e) {
        // @ts-ignore
        if (e.code === 'EADDRINUSE') {
          console.error('Port is in use. Try running on another port.');
        } else {
          // @ts-ignore
          console.error('Error:', e.message);
        }

        process.exit(1);
      }
    });
