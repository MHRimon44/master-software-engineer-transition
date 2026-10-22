import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));

const dayArg = process.argv[2];

if (!dayArg || !/^\d{1,3}$/.test(dayArg)) {
  console.error('Usage: npm run dsa -- 43');
  process.exit(1);
}

const day = dayArg.padStart(3, '0');

const dsaDir = join(root, 'days', `day-${day}`, 'dsa');

if (!existsSync(dsaDir)) {
  console.error(`DSA folder not found: ${dsaDir}`);
  process.exit(1);
}

const files = readdirSync(dsaDir).filter((file) => file.endsWith('.ts'));

if (files.length === 0) {
  console.error(`No TypeScript files found for day ${day}`);
  process.exit(1);
}

const tsx = join(root, 'common', 'typescript', 'node_modules', '.bin', 'tsx');

if (!existsSync(tsx)) {
  console.error('tsx not installed in common/typescript');
  process.exit(1);
}

for (const file of files) {
  console.log(`\nRunning Day ${day}: ${file}\n`);

  const result = spawnSync(tsx, [join(dsaDir, file)], {
    stdio: 'inherit',
    cwd: root,
  });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
