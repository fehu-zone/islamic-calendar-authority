/** @type {import('jest').Config} */
export default {
    // Use ES modules
    testEnvironment: 'node',

    // Transform settings for ESM
    transform: {},

    // Module file extensions
    moduleFileExtensions: ['js', 'mjs', 'cjs', 'json'],

    // Test file patterns
    testMatch: [
        '**/tests/**/*.test.js',
        '**/tests/**/*.spec.js',
        '**/__tests__/**/*.js'
    ],

    // Coverage settings
    collectCoverageFrom: [
        'src/**/*.js',
        'core.js',
        'methods.js',
        'data/**/*.js',
        'utils/**/*.js',
        '!**/node_modules/**'
    ],

    // Coverage thresholds
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
        }
    },

    // Verbose output
    verbose: true,

    // Clear mocks between tests
    clearMocks: true,

    // Fail on console errors
    errorOnDeprecated: true
};
