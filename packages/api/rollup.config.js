const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser');

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      plugins: [terser()],
    },
    {
      file: 'dist/esm/index.js',
      format: 'esm',
      exports: 'named',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [
    typescript({
      declaration: true,
      tsconfig: 'tsconfig.build.json',
    }),
  ],

  external: ['axios', '@nebuia-ts/models', 'form-data'],
};
