const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser');

module.exports = {
  input: 'src/index.ts',
  treeshake: true,
  output: [
    {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/cjs/index.js',
      format: 'cjs',
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
