const typescript = require('@rollup/plugin-typescript');

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: 'dist/esm/index.js',
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      declaration: true,
      tsconfig: 'tsconfig.build.json',
    }),
  ],

  external: ['axios', '@nebuia-ts/models'],
};
