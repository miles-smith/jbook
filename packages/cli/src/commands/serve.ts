import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

export const serveCommand =
  new Command()
    .command('serve [filename]')
    .description('Open a file for editing')
    .option('-p, --port <number>', 'Port to run server on', '4005')
    .action((filename = 'notebook.js', options: { port: string }) => {
      const filePath = path.parse(filename);
      const file     = path.resolve(filePath.root, filePath.dir, filePath.base);

      serve(+options.port, file);
    });
