import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
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
    },
  };
};
