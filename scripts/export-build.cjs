#!/usr/bin/env node

const { spawn } = require('node:child_process');

const child = spawn(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['next', 'build'],
  {
    stdio: 'inherit',
    env: { ...process.env, NEXT_OUTPUT_MODE: 'export' },
  },
);

child.on('exit', (code) => {
  process.exit(code === null ? 1 : code);
});

