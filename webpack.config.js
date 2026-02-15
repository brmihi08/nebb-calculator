const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      mode: argv.mode || 'development',
      projectRoot: __dirname,
    },
    argv
  );
  return config;
};
