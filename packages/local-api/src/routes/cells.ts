import express from 'express';
import fs from 'fs/promises';

interface Cell {
  id: string;
  data: string;
  type: 'text' | 'code';
};

export const createCellsRouter = (file: string) => {
  const router = express.Router();

  router.use(express.json());

  router.get('/cells', async (_request, response) => {
    try {
      const data = await fs.readFile(file, { encoding: 'utf-8' });

      response.send(JSON.parse(data));
    } catch (e) {
      // @ts-ignore
      if (e.code === 'ENOENT') {
        fs.writeFile(file, '[]', 'utf-8');

        response.send([]);
      } else {
        throw e;
      }
    }
  });

  router.post('/cells', async (request, response) => {
    const { cells }: { cells: Cell[] } = request.body;

    await fs.writeFile(file, JSON.stringify(cells), 'utf-8');

    response.send({ status: 'ok' });
  });

  return router;
};
