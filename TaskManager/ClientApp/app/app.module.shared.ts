import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DevExtremeModule } from 'devextreme-angular';
import { AppComponent } from './components/app/app.component';
import { ProjectListComponent, AddNewProjectDialogComponent, EditProjectDialogComponent, DeleteProjectDialogComponent, ProjectFilesDialogComponent } from './components/projectlist/project.shared.component';
import { TaskListComponent, AddNewTaskDialogComponent, EditTaskDialogComponent, DeleteTaskDialogComponent, TaskFilesDialogComponent } from './components/tasklist/task.shared.component';
import { BankListComponent, AddNewBankDialogComponent, EditBankDialogComponent, DeleteBankDialogComponent } from './components/banklist/bank.shared.component';
import { PersonListComponent, AddNewPersonDialogComponent, EditPersonDialogComponent, DeletePersonDialogComponent } from './components/personlist/person.shared.component';

@NgModule({
	declarations: [
		AppComponent,
		ProjectListComponent,
		AddNewProjectDialogComponent,
		EditProjectDialogComponent,
		DeleteProjectDialogComponent,
		ProjectFilesDialogComponent,
		TaskListComponent,
		AddNewTaskDialogComponent,
		EditTaskDialogComponent,
		DeleteTaskDialogComponent,
		TaskFilesDialogComponent,
		BankListComponent,
		AddNewBankDialogComponent,
		EditBankDialogComponent,
		DeleteBankDialogComponent,
		PersonListComponent,
		AddNewPersonDialogComponent,
		EditPersonDialogComponent,
		DeletePersonDialogComponent
	],
    imports: [
        CommonModule,
        HttpModule,
		FormsModule,
		DevExtremeModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'projectlist', pathMatch: 'full' },
			{ path: 'projectlist', component: ProjectListComponent },
			{ path: 'banklist', component: BankListComponent },
			{ path: 'personlist', component: PersonListComponent },
			{ path: 'tasklist', redirectTo: 'tasklist/0' },
			{ path: 'tasklist/:projectID', component: TaskListComponent },
            { path: '**', redirectTo: 'projectlist' }
		])
	]
})
export class AppModuleShared {
}
