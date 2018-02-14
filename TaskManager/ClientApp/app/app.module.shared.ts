import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DevExtremeModule } from 'devextreme-angular';
import { AppComponent } from './components/app/app.component';
import { ProjectListComponent } from './components/projectlist/projectlist.component';
import { AddNewProjectDialogComponent } from './components/projectlist/addnewproject.dialog/addnewproject.dialog.component';
import { EditProjectDialogComponent } from './components/projectlist/editproject.dialog/editproject.dialog.component';
import { DeleteProjectDialogComponent } from './components/projectlist/deleteproject.dialog/deleteproject.dialog.component';
import { ProjectFilesDialogComponent } from './components/projectlist/projectfiles.dialog/projectfiles.dialog.component';
import { TaskListComponent } from './components/tasklist/tasklist.component';
import { AddNewTaskDialogComponent } from './components/tasklist/addnewtask.dialog/addnewtask.dialog.component';
import { EditTaskDialogComponent } from './components/tasklist/edittask.dialog/edittask.dialog.component';
import { DeleteTaskDialogComponent } from './components/tasklist/deletetask.dialog/deletetask.dialog.component';
import { BankListComponent } from './components/banklist/banklist.component';
import { AddNewBankDialogComponent } from './components/banklist/addnewbank.dialog/addnewbank.dialog.component';
import { EditBankDialogComponent } from './components/banklist/editbank.dialog/editbank.dialog.component';
import { DeleteBankDialogComponent } from './components/banklist/deletebank.dialog/deletebank.dialog.component';
import { PersonListComponent } from './components/personlist/personlist.component';
import { AddNewPersonDialogComponent } from './components/personlist/addnewperson.dialog/addnewperson.dialog.component';
import { EditPersonDialogComponent } from './components/personlist/editperson.dialog/editperson.dialog.component';
import { DeletePersonDialogComponent } from './components/personlist/deleteperson.dialog/deleteperson.dialog.component';


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
