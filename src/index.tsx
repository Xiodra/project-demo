import registerServiceWorker from './registerServiceWorker';
import { Application, log } from 'pao-aop';

try {
    let startApp: Application = require('./projects/govNetThingOP/clientAppConfig').defaultObject;
    startApp.run!();
    // const dev = process.env.NODE_ENV === 'development';

    // if (dev) {
    //     // @ts-ignore
    //     var VConsole = require('./static/assets/vconsole.min.js');
    //     new VConsole();
    // }
} catch (error) {
    log('error', error);
}

registerServiceWorker();