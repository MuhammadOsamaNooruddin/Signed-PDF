import type { Config } from '@jest/types'; 

const config: Config.InitialOptions = { 
  rootDir: './', 
  testEnvironment: 'jsdom', 
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'], 
  transform: { "^.+\\.tsx?$": "ts-jest" }, 
  moduleNameMapper: { '\\.(css|less|sass|scss)$': 'identity-obj-proxy', 
    '\\.(svg|png|jpg|jpeg|gif)$': '<rootDir>/__mocks__/fileMock.js', }, }; 
    
export default config;