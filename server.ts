"use strict";

console.log("");
console.log(
  "//************************* Onnuri-Backend **************************//"
);

console.log("env : ", process.env.NODE_ENV.trim());

import 'dotenv/config';
import Application from './app';
import * as BootStrap from './src/utils/BootStrap'

(async () => {
  console.log('starting initializations')
  const application = new Application();
  await application.init();
  const bootStrap = new BootStrap.BootStrap();
  await bootStrap.bootStrap();
})();