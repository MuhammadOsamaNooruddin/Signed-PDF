import type { Config } from '@jest/types';;

const config: Config.InitialOptions = {
    rootDir: './',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleNameMapper: {
        '\\.(gif|jpg|jpeg|png|svg)$': '<rootDir>/test/mocks/fileMock.js'
    }
};

export default config;