import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcPath = path.resolve(__dirname, '.');

export const paths = {
  components: path.join(srcPath, 'components'),
  pages: path.join(srcPath, 'pages'),
  lib: path.join(srcPath, 'lib'),
  utils: path.join(srcPath, 'utils'),
  hooks: path.join(srcPath, 'hooks'),
  context: path.join(srcPath, 'context'),
  types: path.join(srcPath, 'types'),
  styles: path.join(srcPath, 'styles'),
  assets: path.join(srcPath, 'assets'),
  constants: path.join(srcPath, 'constants'),
};
