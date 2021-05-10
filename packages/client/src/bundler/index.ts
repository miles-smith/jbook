import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';

let service: esbuild.Service;

const bundle = async (userCode: string) => {
  if(!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  }

  const bundledCode = await service.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [
      unpkgPathPlugin(),
      fetchPlugin(userCode)
    ],
    define: {
      global: 'window',
      'process.env.NODE_ENV': '"production"',
    },
  });

  return bundledCode.outputFiles[0].text;
};

export default bundle;
