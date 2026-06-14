import { defineConfig } from 'vitest/config';

// Scoped to the pure cores only (ADR-0003). Not a release gate — lint --strict + build are.
export default defineConfig({
	test: {
		include: ['nodes/**/*.test.mts'],
		environment: 'node',
	},
});
