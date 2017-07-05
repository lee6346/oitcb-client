//this is the main.ts file that enables a specific mode (dev or prod), then boostraps the AppModule

//reflect-metadata, zone.js are polyfills for the browser and angular 2
import 'reflect-metadata';
import 'zone.js';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module.client';

//if HMR is enabled, accept module replacements
if (module['hot']) {
    module['hot'].accept();
    module['hot'].dispose(() => {
        // Before restarting the app, we create a new root element and dispose the old one
        const oldRootElem = document.querySelector('app');
        const newRootElem = document.createElement('app');
        //switch out the two
        oldRootElem.parentNode.insertBefore(newRootElem, oldRootElem);
        // destroy the old
        modulePromise.then(appModule => appModule.destroy());
    });
    //if HMR is not enabled, we are running in production mode
} else {
    enableProdMode();
}

// Note: @ng-tools/webpack looks for the following expression when performing production
// builds. Don't change how this line looks, otherwise you may break tree-shaking.
const modulePromise = platformBrowserDynamic().bootstrapModule(AppModule);
