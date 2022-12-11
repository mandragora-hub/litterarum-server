import 'dotenv/config'

import config from './default.json'

const env = process.env.NODE_ENV || "dev";

if (env === "dev" || env === "test") {
  const envConfig = config[env] as Partial<NodeJS.ProcessEnv>;
  console.log(envConfig);

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
