import express from 'express';

export const serve = (port: number, file: string) => {
  const app = express();

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve)
      .on('error', reject);
  });
}
