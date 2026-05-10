# dxstack 🚀

The ultimate fullstack monorepo generator for developers who care about DX (Developer Experience). 

Built with **Bun**, **React 19**, **TanStack Start**, **Better Auth**, and your choice of **Drizzle** or **Prisma**.

## ✨ Features

- 📦 **Monorepo Structure**: Powered by Bun Workspaces.
- ⚡ **Turbocharged DX**: Fast builds, instant HMR, and type-safe everything.
- 🔐 **Better Auth Ready**: Pre-configured authentication with your chosen ORM adapter.
- 🎨 **Modern Frontend**: React 19 + TanStack Start (SSR) + Tailwind CSS 4.
- 🗄️ **ORM Choice**: Choose between Drizzle (Lightweight) or Prisma (Robust).
- 📱 **Optional Expo Mobile**: Add a mobile app to your monorepo with one click.
- 🧪 **Testing Included**: Vitest and Playwright ready to go.
- 🛠️ **Tooling**: Biome for linting/formatting.

## 🚀 Quick Start

You don't even need to install it. Just run:

```bash
bunx dxstack
```

Follow the interactive prompts to scaffold your new project.

## 🏗️ Structure

A generated `dxstack` project follows this structure:

```text
├── apps/
│   ├── api/          # Hono-based API with oRPC
│   ├── web/          # React 19 + TanStack Start
│   └── mobile/       # Expo SDK 54 (Optional)
├── packages/
│   ├── db/           # Drizzle or Prisma schema and client
│   ├── shared/       # Shared Zod schemas and utility functions
│   ├── ui/           # Shared React components (shadcn/ui style)
│   ├── env/          # Type-safe environment variables
│   └── logger/       # Structured logging
└── package.json      # Root monorepo configuration
```

## 🛠️ Development

Once your project is generated:

1. **Install dependencies**:
   ```bash
   bun install
   ```

2. **Setup environment**:
   ```bash
   cp .env.example .env
   ```

3. **Generate Database/Auth**:
   ```bash
   bun db:generate
   ```

4. **Start all apps**:
   ```bash
   bun dev
   ```

## 📄 License

MIT
