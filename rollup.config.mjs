// @ts-check
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
/**
 *
 * @param {String} name
 * @returns {import('rollup/dist/rollup').RollupOptions}
 */
function common(name) {
  return {
    input: `src/${name}.ts`,
    output: [
      {
        file: `dist/${name}.js`,
        format: 'esm',
        sourcemap: true,
      },
      {
        file: `dist/${name}.cjs`,
        format: 'cjs',
        sourcemap: true,
      },
    ],
    treeshake: true,
    plugins: [
      typescript({
        declaration: true,
        tsconfig: 'tsconfig.build.json',
        outDir: 'dist',
      }),
      terser(),
    ],
    external: ['axios', 'form-data'],
  };
}
/** @type import('rollup/dist/rollup').RollupOptions[] */
const config = ['index', 'sdk', 'api', 'models'].map(common);
// external: ['axios', 'form-data'],

export default config;
