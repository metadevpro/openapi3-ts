import esbuild from 'esbuild';
import path from 'path';
import glob from 'glob';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { dtsPlugin } from 'esbuild-plugin-d.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const entryPoints = glob
    .sync('src/**/*.ts', { root: path.join(__dirname, 'src') })
    .filter((l) => !l.includes('spec.ts'));
await esbuild.build({
    entryPoints: entryPoints,
    bundle: process.env.BUILD_WATCH === 'true',
    target: 'es2020',
    outdir: path.join(__dirname, './dist'),
    watch: process.env.BUILD_WATCH === 'true',
    format: 'cjs',
    color: true,
    sourcemap: 'linked',
    logLevel: 'debug',
    plugins: [dtsPlugin()]
});
