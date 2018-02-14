import { Component, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { DxDataGridComponent } from 'devextreme-angular';
import 'rxjs/Rx';
import { Project } from '../shared/models/project';
import { TaskManagerService } from '../shared/services/taskManager.service';
import { AddNewProjectDialogComponent } from './addnewproject.dialog/addnewproject.dialog.component';
import { EditProjectDialogComponent } from './editproject.dialog/editproject.dialog.component';
import { DeleteProjectDialogComponent } from './deleteproject.dialog/deleteproject.dialog.component';
import { ProjectFilesDialogComponent } from './projectfiles.dialog/projectfiles.dialog.component';

@Component({
	selector: 'projectlist',
	templateUrl: './projectlist.component.html',
	styleUrls: ['../shared/common.css']
})
export class ProjectListComponent {
	@ViewChild('projectGrid') projectGrid: DxDataGridComponent;
	projects: Project[] = new Array<Project>();

	constructor(private service: TaskManagerService, private dialogService: DialogService, private router: Router, private titleService: Title) {
		titleService.setTitle('Список проектов');
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

	edit_project(project: Project) {
		const disposable = this.dialogService.addDialog(EditProjectDialogComponent, { project: project }).subscribe((project) => {
			if (project) {
				this.service.editProject(project)
					.then(res => {
						console.info('Update project:' + JSON.stringify(project));
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

	delete_project(project: Project) {
		const disposable = this.dialogService.addDialog(DeleteProjectDialogComponent, { project: project }).subscribe((isConfirmed) => {
			if (isConfirmed) {
				this.service.deleteProject(project)
					.then(res => {
						console.info('Delete project:' + JSON.stringify(project));
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

	show_tasks(projectID: number) {
		this.router.navigate(['/tasklist', projectID]);
	}

	projectfiles(project: Project)
	{
		const disposable = this.dialogService.addDialog(ProjectFilesDialogComponent, { project: project }).subscribe((projectfiles) => {
			if (projectfiles) {
				this.service.updateProjectFiles(project.projectID,projectfiles)
					.then(res => {
						console.info('Update project files:' + JSON.stringify(projectfiles));
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


