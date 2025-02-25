import { join } from 'node:path';
import fs from 'fs-extra';

const versionFilePath = join(
  import.meta.dirname,
  '../wallet-deputy/version.ts',
);
const packageJsonPath = join(
  import.meta.dirname,
  '../wallet-deputy/package.json',
);
const packageJson = fs.readJsonSync(packageJsonPath);

fs.writeFileSync(
  versionFilePath,
  `/** @internal */\nexport const version = '${packageJson.version}'\n`,
);
