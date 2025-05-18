import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vitest-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: 'src',
    workspace: [
      { extends: true, test: { name: 'unit', dir: 'src/services' } },
      {
        extends: true,
        test: {
          name: 'e2e',
          dir: 'src/http/controllers',
          environment: './prisma/vitest-envrionment/prisma-test-environment.ts',
        },
      },
    ],
  },
})
