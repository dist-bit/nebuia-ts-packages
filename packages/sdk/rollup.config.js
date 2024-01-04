const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser');

module.exports = {
  input: 'src/index.ts',
  treeshake: true,
  output: [
    {
      file: 'dist/esm/index.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      declaration: true,
      tsconfig: 'tsconfig.build.json',
    }),
    terser(),
  ],
  external: ['@nebuia-ts/api', '@nebuia-ts/models'],
};
