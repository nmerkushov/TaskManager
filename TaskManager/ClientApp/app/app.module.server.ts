import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './components/app/app.component';
import { AppModuleShared } from './app.module.shared';

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        ServerModule,
		AppModuleShared
	]
})
export class AppModule {
}

