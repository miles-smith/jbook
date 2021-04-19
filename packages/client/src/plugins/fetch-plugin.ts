import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache',
});

export const fetchPlugin = (userCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: userCode,
          };
        }

        const cacheResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

        if (cacheResult) {
          return cacheResult;
        }

        const { data, request } = await axios.get(args.path);

        const fileType = args.path.match(/\.css$/) ? 'css' : 'jsx';
        const contents =
          fileType === 'css'
            ?
              `
              const style = document.createElement('style');
              style.setAttribute('type', 'text/css');
              style.innerText = '@import url("data:text/css;base64,${btoa(data)}")';
              document.head.appendChild(style);
              `
            :
              data;


        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    }
  }
}
