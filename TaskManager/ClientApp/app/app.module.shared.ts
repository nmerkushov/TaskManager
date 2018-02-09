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
import { TaskListComponent } from './components/tasklist/tasklist.component';
import { AddNewTaskDialogComponent } from './components/tasklist/addnewtask.dialog/addnewtask.dialog.component';
import { EditTaskDialogComponent } from './components/tasklist/edittask.dialog/edittask.dialog.component';
import { DeleteTaskDialogComponent } from './components/tasklist/deletetask.dialog/deletetask.dialog.component';

@NgModule({
	declarations: [
		AppComponent,
		ProjectListComponent,
		AddNewProjectDialogComponent,
		EditProjectDialogComponent,
		DeleteProjectDialogComponent,
		TaskListComponent,
		AddNewTaskDialogComponent,
		EditTaskDialogComponent,
		DeleteTaskDialogComponent
	],
    imports: [
        CommonModule,
        HttpModule,
		FormsModule,
		DevExtremeModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'projectlist', pathMatch: 'full' },
			{ path: 'projectlist', component: ProjectListComponent },
			{ path: 'tasklist', redirectTo: 'tasklist/0' },
			{ path: 'tasklist/:projectID', component: TaskListComponent },
            { path: '**', redirectTo: 'projectlist' }
		])
	]
})
export class AppModuleShared {
}
