import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AppModuleShared } from './app.module.shared';
import { AppComponent } from './components/app/app.component';
import { TaskManagerService } from './components/shared/services/taskManager.service';
import { ProjectListComponent } from './components/projectlist/projectlist.component';
import { AddNewProjectDialogComponent } from './components/projectlist/addnewproject.dialog/addnewproject.dialog.component';
import { EditProjectDialogComponent } from './components/projectlist/editproject.dialog/editproject.dialog.component';
import { DeleteProjectDialogComponent } from './components/projectlist/deleteproject.dialog/deleteproject.dialog.component';

@NgModule({
	bootstrap: [AppComponent],
	imports: [
		BrowserModule,
		AppModuleShared,
		BootstrapModalModule
	],
	providers: [
		{ provide: 'BASE_URL', useFactory: getBaseUrl },
		TaskManagerService 
	],
	entryComponents: [
		AddNewProjectDialogComponent,
		EditProjectDialogComponent,
		DeleteProjectDialogComponent
	]
})
export class AppModule {
}

export function getBaseUrl() {
	return document.getElementsByTagName('base')[0].href;
}
