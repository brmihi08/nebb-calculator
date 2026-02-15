const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Reduce file watching to avoid EMFILE errors
config.watchFolders = [__dirname];
config.resolver.sourceExts = ['js', 'jsx', 'ts', 'tsx', 'json'];

// Don't watch these folders
config.watchFolders = config.watchFolders || [];
config.resolver.blockList = [
  /node_modules\/.*\/node_modules\/.*/,
];

// Reduce the number of workers to reduce file handles
config.maxWorkers = 2;

module.exports = config;
