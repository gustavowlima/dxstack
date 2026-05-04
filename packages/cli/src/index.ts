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
      { value: 'prisma', label: 'Prisma v7', hint: 'Wasm-based, ultra-fast, modern architecture' },
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

  s.start(`Creating project ${projectName}...`);

  try {
    const templatePath = path.resolve(__dirname, '../template');
    const baseTemplatePath = path.join(templatePath, 'base');

    // 1. Copy base template
    s.message('Scaffolding monorepo structure...');
    await fs.ensureDir(targetPath);
    await fs.copy(baseTemplatePath, targetPath);

    // 2. Handle ORM selection
    if (orm === 'prisma') {
      s.message('Configuring Prisma v7...');
      const prismaTemplatePath = path.join(templatePath, 'extras/prisma');
      const dbPackagePath = path.join(targetPath, 'packages/db');

      await fs.remove(dbPackagePath);
      await fs.copy(prismaTemplatePath, dbPackagePath);

      // Update apps/api/package.json
      const apiPackagePath = path.join(targetPath, 'apps/api/package.json');
      if (await fs.pathExists(apiPackagePath)) {
        let content = await fs.readFile(apiPackagePath, 'utf-8');
        content = content.replace('@better-auth/drizzle-adapter', '@better-auth/prisma-adapter');
        await fs.writeFile(apiPackagePath, content);
      }

      // Update apps/api/src/config/auth.ts
      const authConfigPath = path.join(targetPath, 'apps/api/src/config/auth.ts');
      if (await fs.pathExists(authConfigPath)) {
        let content = await fs.readFile(authConfigPath, 'utf-8');
        content = content.replace(
          'import { drizzleAdapter } from "better-auth/adapters/drizzle";',
          'import { prismaAdapter } from "better-auth/adapters/prisma";'
        );
        content = content.replace(
          /database: drizzleAdapter\(db, \{[\s\S]*?provider: "pg",[\s\S]*?\}\),/,
          'database: prismaAdapter(db, { provider: "postgresql" }),'
        );
        await fs.writeFile(authConfigPath, content);
      }

      // Update root package.json auth:generate script
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
  .version('0.1.0')
  .action(main);

program.parse();
