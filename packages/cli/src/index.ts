#!/usr/bin/env bun
import { intro, outro, select, text, confirm, spinner } from '@clack/prompts';
import { Command } from 'commander';
import kleur from 'kleur';
import path from 'node:path';
import fs from 'fs-extra';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check for Unicode support
const isUnicodeSupported = () => {
  if (process.platform === 'win32') return true; // Windows Terminal/modern shells support it
  if (process.env.TERM === 'dumb') return false;
  return Boolean(process.env.LANG?.toLowerCase().includes('utf-8') || process.env.LC_ALL?.toLowerCase().includes('utf-8'));
};

const program = new Command();

async function main() {
  intro(kleur.bgCyan(kleur.black(' dxstack ')));

  const projectName = await text({
    message: 'What is the name of your project?',
    placeholder: 'my-dx-app',
    validate: (value) => {
      if (!value) return 'Project name is required';
      if (value.match(/[^a-z0-9-_]/i)) return 'Project name must be alphanumeric with hyphens or underscores';
    },
  });

  if (typeof projectName === 'symbol') return outro('Operation cancelled');

  const orm = await select({
    message: 'Which ORM do you want to use?',
    options: [
      { value: 'drizzle', label: 'Drizzle (Recommended)', hint: 'Lightweight, TypeScript-first' },
      { value: 'prisma', label: 'Prisma', hint: 'Wasm-based, ultra-fast, modern architecture' },
    ],
  });

  if (typeof orm === 'symbol') return outro('Operation cancelled');

  const includeExpo = await confirm({
    message: 'Include Expo?',
    initialValue: true,
  });

  if (typeof includeExpo === 'symbol') return outro('Operation cancelled');

  const s = spinner();
  const targetPath = path.resolve(process.cwd(), projectName as string);

  const templatePath = path.resolve(__dirname, '../template');
  const baseTemplatePath = path.join(templatePath, 'base');

  if (!fs.existsSync(baseTemplatePath)) {
    s.stop('Failed to locate templates');
    console.error(kleur.red(`\nError: Template directory not found at ${baseTemplatePath}`));
    console.error(kleur.yellow('If you installed this via npm/bunx, the package might be corrupted.\n'));
    return outro('Operation failed');
  }

  s.start(`Creating project ${projectName}...`);

  try {
    // 1. Copy base template
    s.message('Scaffolding monorepo structure...');
    await fs.ensureDir(targetPath);
    await fs.copy(baseTemplatePath, targetPath);

    // 2. Handle ORM selection
    const ormTemplatePath = path.join(templatePath, `extras/${orm}`);

    if (!fs.existsSync(ormTemplatePath)) {
      throw new Error(`ORM template not found: ${ormTemplatePath}`);
    }

    const dbPackagePath = path.join(targetPath, 'packages/db');

    s.message(`Configuring ${orm === 'drizzle' ? 'Drizzle' : 'Prisma'}...`);
    await fs.remove(dbPackagePath);
    await fs.copy(ormTemplatePath, dbPackagePath);

    // Update apps/api/package.json with the correct adapter
    const apiPackagePath = path.join(targetPath, 'apps/api/package.json');
    if (await fs.pathExists(apiPackagePath)) {
      let content = await fs.readFile(apiPackagePath, 'utf-8');
      const adapterPkg = orm === 'drizzle' ? '@better-auth/drizzle-adapter' : '@better-auth/prisma-adapter';
      // Match "better-auth": "catalog:", with its indentation and prepend the adapter
      content = content.replace(
        /^(\s+)"better-auth": "catalog:",/m,
        `$1"${adapterPkg}": "catalog:",\n$1"better-auth": "catalog:",`
      );
      await fs.writeFile(apiPackagePath, content);
    }

    // Update apps/api/src/config/auth.ts
    const authConfigPath = path.join(targetPath, 'apps/api/src/config/auth.ts');
    if (await fs.pathExists(authConfigPath)) {
      let content = await fs.readFile(authConfigPath, 'utf-8');

      if (orm === 'prisma') {
        content = content.replace(
          'import { drizzleAdapter } from "better-auth/adapters/drizzle";',
          'import { prismaAdapter } from "better-auth/adapters/prisma";'
        );
        content = content.replace(
          'import { db } from "@stack/db";',
          'import { prisma as db } from "@stack/db";'
        );
        content = content.replace(
          /database: drizzleAdapter\(db, \{[\s\S]*?provider: "pg",[\s\S]*?\}\),/,
          'database: prismaAdapter(db, { provider: "postgresql" }),'
        );
        await fs.writeFile(authConfigPath, content);
      }
      // Drizzle is already the default in the template auth.ts, so no change needed there
      // but we could make it explicit if we wanted to.
    }

    // Update root package.json auth:generate script
    if (orm === 'prisma') {
      const rootPackagePath = path.join(targetPath, 'package.json');
      if (await fs.pathExists(rootPackagePath)) {
        let content = await fs.readFile(rootPackagePath, 'utf-8');
        content = content.replace(
          '--output ./packages/db/src/schema/auth-schema.ts',
          '--output ./packages/db/schema/schema.prisma'
        );
        await fs.writeFile(rootPackagePath, content);
      }
    }
    // 3. Handle Expo selection
    if (includeExpo) {
      s.message('Adding Expo SDK 54 mobile app...');
      const mobileTemplatePath = path.join(templatePath, 'extras/mobile');
      const mobileDestPath = path.join(targetPath, 'apps/mobile');
      await fs.copy(mobileTemplatePath, mobileDestPath);
    }

    // 4. Initialize Git
    s.message('Initializing git repository...');
    try {
      execSync('git init', { cwd: targetPath, stdio: 'ignore' });
    } catch (e) {
      // Ignore git errors
    }

    s.stop(`Project ${projectName} created successfully!`);

    outro(kleur.green('🚀 Your dxstack project is ready!'));

    console.log(kleur.bold('\nNext steps:'));
    console.log(kleur.cyan(`  1. cd ${projectName}`));
    console.log(kleur.cyan('  2. bun install'));
    console.log(kleur.cyan('  3. cp .env.example .env'));
    console.log(kleur.cyan('  4. bun db:generate  ') + kleur.dim('(Crucial for Prisma)'));
    console.log(kleur.cyan('  5. bun auth:generate ') + kleur.dim('(To sync auth tables)'));
    console.log(kleur.cyan('  6. bun dev'));

  } catch (error) {
    s.stop('Failed to create project');
    console.error(error);
    outro(kleur.red('An error occurred during project creation.'));
  }
}

program
  .name('dxstack')
  .description('Robust boilerplate generator for fullstack monorepos')
  .version('0.1.1')
  .action(main);

program.parse();
