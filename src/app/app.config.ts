import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TreeState } from '@app/states/tree.state';
import { NgxsModule } from '@ngxs/store';

const ngxsStates = [TreeState];

export const appConfig: ApplicationConfig = {
    providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), importProvidersFrom(NgxsModule.forRoot(ngxsStates))],
};
