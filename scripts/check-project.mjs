import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import ts from 'typescript';

const root = process.cwd();
const sourceDirs = ['backend', 'frontend/src'];
const extensions = new Set(['.js', '.jsx', '.mjs']);

function walk(dir) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...walk(full));
    else if (extensions.has(path.extname(entry.name))) result.push(full);
  }
  return result;
}

const files = [
  path.join(root, 'server.js'),
  ...sourceDirs.flatMap((dir) => walk(path.join(root, dir))),
];

let failed = false;

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');

  if (file.endsWith('.js') || file.endsWith('.mjs')) {
    try {
      execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
    } catch (error) {
      failed = true;
      console.error(`Syntax error: ${path.relative(root, file)}\n${error.stderr?.toString() || error.message}`);
    }
  } else if (file.endsWith('.jsx')) {
    const result = ts.transpileModule(source, {
      compilerOptions: {
        jsx: ts.JsxEmit.ReactJSX,
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
      },
      reportDiagnostics: true,
    });

    if (result.diagnostics?.length) {
      failed = true;
      console.error(`JSX error: ${path.relative(root, file)}`);
      for (const diagnostic of result.diagnostics) {
        console.error(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
      }
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log(`✓ HireHub source validation passed (${files.length} source files checked).`);
