import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { ProjectListComponent } from './components/projectlist/projectlist.component';
import { AddNewProjectDialogComponent } from './components/projectlist/addnewproject.dialog/addnewproject.dialog.component';

@NgModule({
	declarations: [
		AppComponent,
		ProjectListComponent,
		AddNewProjectDialogComponent
	],
    imports: [
        CommonModule,
        HttpModule,
		FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'projectlist', pathMatch: 'full' },
			{ path: 'projectlist', component:  ProjectListComponent },
            { path: '**', redirectTo: 'projectlist' }
		])
	]
})
export class AppModuleShared {
}
