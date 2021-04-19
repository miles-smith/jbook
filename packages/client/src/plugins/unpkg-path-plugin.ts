import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache',
});

export const unpkgPathPlugin = (userCode: string) => {
  const rootUrl = 'https://unpkg.com';

  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return {
          namespace: 'a',
          path: 'index.js',
        }
      });

      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, `${rootUrl}${args.resolveDir}/`).href,
        };
      });

      build.onResolve({ filter: /.*/ }, async (args: any) => {
        // FIXME: namespace!
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // FIXME: Remove unnecessary logging
        console.log('onLoad', args);

        // FIXME: For testing only!
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
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
