//import polyfills for browser and ang 2
import 'reflect-metadata';
import 'zone.js';

//
import 'rxjs/add/operator/first';
import { enableProdMode, ApplicationRef, NgZone, ValueProvider } from '@angular/core';
import { platformDynamicServer, PlatformState, INITIAL_CONFIG } from '@angular/platform-server';
//used for prerendering net core templates
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';
import { AppModule } from './app/app.module.server';

enableProdMode();
// export server rendering services
export default createServerRenderer(params => {
    const providers = [
    //use the <app></app> tag in index.cshtml as starting point for loading ang 2
        { provide: INITIAL_CONFIG, useValue: { document: '<app></app>', url: params.url } },
        { provide: 'ORIGIN_URL', useValue: params.origin }
    ];

    return platformDynamicServer(providers).bootstrapModule(AppModule).then(moduleRef => {
        const appRef = moduleRef.injector.get(ApplicationRef);
        const state = moduleRef.injector.get(PlatformState);
        const zone = moduleRef.injector.get(NgZone);

        return new Promise<RenderResult>((resolve, reject) => {
            zone.onError.subscribe(errorInfo => reject(errorInfo));
            appRef.isStable.first(isStable => isStable).subscribe(() => {
                // Because 'onStable' fires before 'onError', we have to delay slightly before
                // completing the request in case there's an error to report
                setImmediate(() => {
                    resolve({
                        html: state.renderToString()
                    });
                    moduleRef.destroy();
                });
            });
        });
    });
});
