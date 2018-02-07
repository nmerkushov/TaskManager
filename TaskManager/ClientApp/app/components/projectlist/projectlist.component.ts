import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import 'rxjs/Rx';
import { Project } from '../shared/models/project';
import { TaskManagerService } from '../shared/services/taskManager.service';
import { AddNewProjectDialogComponent } from './addnewproject.dialog/addnewproject.dialog.component';

@Component({
	selector: 'projectlist',
	templateUrl: './projectlist.component.html',
	styleUrls: ['./projectlist.component.css']
})
export class ProjectListComponent {
	title: string;
	projects: Project[] = new Array<Project>();

	constructor(private service: TaskManagerService, private dialogService: DialogService) {
		this.title = 'Список проектов';
		this.fillDatasource();
	}

	fillDatasource() {
		this.service.getProjects()
			.then(res => {
				this.projects = res;
			})
			.catch(error => console.error(error));
	}

	add_new_project() {
		const disposable = this.dialogService.addDialog(AddNewProjectDialogComponent).subscribe((newProject) => {
			if (newProject) {
				this.service.addNewProject(newProject)
					.then(res => {
						console.info('Add new project:' + JSON.stringify(newProject));
						this.fillDatasource();
					}
					)
					.catch(err => console.error(err));
			}
			else {
				console.info('Cancel dialog');
			}
		});
	}
}


