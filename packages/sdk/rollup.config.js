const typescript = require('@rollup/plugin-typescript');

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      sourcemap: true,
    },
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
  ],
  external: ['@nebuia-ts/api', '@nebuia-ts/models'],
};
