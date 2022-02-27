import ts from "rollup-plugin-typescript2";
import postcss from 'rollup-plugin-postcss'
import del from "rollup-plugin-delete";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import Path from 'path';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const commonConfig = {
  input: "index.ts",
  external: Object.keys({ ...pkg.dependencies, ...pkg.devDependencies, ...['path'] } || {}),
}

const commonPlugins = [
  ts(),
  del({ targets: "dist/*", runOnce: true }),
  vue({
    css: false,
    style: {
      postcssPlugins: [
        cssnano()
      ]
    }
  }),
  postcss({ extract: true, plugins: [autoprefixer] }),
  terser(),
  resolve(),
  commonjs(),
]

export default [{

  ...commonConfig,
  output: [

    {
      file: './dist/c-v-3.es.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: './dist/c-v-3.cjs.js',
      format: 'cjs'
    }
  ],
  plugins: [
    vue({
      style: {
        postcssPlugins: [
          autoprefixer(),
          cssnano()
        ]
      }
    }),
    ...commonPlugins,
    getBabelOutputPlugin({ configFile: Path.resolve(__dirname, 'babel.config.js') })

  ],
  external: [
    'vue'
  ]
},
// SSR build.
{
  ...commonConfig,
  output: {
    format: 'cjs',
    file: './dist/c-v-3.ssr.cjs.js'
  },
  plugins: [
    vue({ template: { optimizeSSR: true } }),
    ...commonPlugins,
    getBabelOutputPlugin({ configFile: Path.resolve(__dirname, 'babel.config.js') })

  ]
},
// Browser build.
{
  ...commonConfig,
  output: {
    format: 'iife',
    file: './dist/c-v-3.iife.js',
    name: 'cv3'
  },
  plugins: [
    vue(),
    ...commonPlugins
  ]
},
];
