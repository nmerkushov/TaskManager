import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AppModuleShared } from './app.module.shared';
import { AppComponent } from './components/app/app.component';
import { TaskManagerService } from './components/shared/services/taskManager.service';
import { AddNewProjectDialogComponent, EditProjectDialogComponent, DeleteProjectDialogComponent, ProjectFilesDialogComponent } from './components/projectlist/project.shared.component';
import { AddNewTaskDialogComponent, EditTaskDialogComponent, DeleteTaskDialogComponent, TaskFilesDialogComponent  } from './components/tasklist/task.shared.component';
import { AddNewBankDialogComponent, EditBankDialogComponent, DeleteBankDialogComponent } from './components/banklist/bank.shared.component';
import { AddNewPersonDialogComponent, EditPersonDialogComponent, DeletePersonDialogComponent } from './components/personlist/person.shared.component';

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
		DeleteProjectDialogComponent,
		ProjectFilesDialogComponent,
		AddNewTaskDialogComponent,
		EditTaskDialogComponent,
		DeleteTaskDialogComponent,
		TaskFilesDialogComponent,
		AddNewBankDialogComponent,
		EditBankDialogComponent,
		DeleteBankDialogComponent,
		AddNewPersonDialogComponent,
		EditPersonDialogComponent,
		DeletePersonDialogComponent
	]
})
export class AppModule {
}

export function getBaseUrl() {
	return document.getElementsByTagName('base')[0].href;
}
