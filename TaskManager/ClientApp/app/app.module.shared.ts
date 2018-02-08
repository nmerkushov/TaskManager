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

@NgModule({
	declarations: [
		AppComponent,
		ProjectListComponent,
		AddNewProjectDialogComponent,
		EditProjectDialogComponent,
		DeleteProjectDialogComponent
	],
    imports: [
        CommonModule,
        HttpModule,
		FormsModule,
		DevExtremeModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'projectlist', pathMatch: 'full' },
			{ path: 'projectlist', component:  ProjectListComponent },
            { path: '**', redirectTo: 'projectlist' }
		])
	]
})
export class AppModuleShared {
}
