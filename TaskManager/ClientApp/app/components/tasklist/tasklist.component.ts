import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { DxDataGridComponent } from 'devextreme-angular';
import 'rxjs/Rx';
import { Project } from '../shared/models/project';
import { Task } from '../shared/models/task';
import { TaskManagerService } from '../shared/services/taskManager.service';
import { AddNewTaskDialogComponent } from './addnewtask.dialog/addnewtask.dialog.component';
import { EditTaskDialogComponent } from './edittask.dialog/edittask.dialog.component';
import { DeleteTaskDialogComponent } from './deletetask.dialog/deletetask.dialog.component';

@Component({
	selector: 'tasklist',
	templateUrl: './tasklist.component.html',
	styleUrls: ['./tasklist.component.css']
})
export class TaskListComponent {
	@ViewChild('taskGrid') projectGrid: DxDataGridComponent;
	title: string;
	projectID: number;
	project: Project = new Project();
	tasks: Task[] = new Array<Task>();


	constructor(private service: TaskManagerService, private dialogService: DialogService, private route: ActivatedRoute) {
		this.title = 'Список задач';
	}

	private ngOnInit() {
		this.route.params.subscribe(params => {
			this.projectID = + params['projectID'];
			this.fillDatasource();
		});
	}

	fillDatasource() {
		this.service.getProjectByID(this.projectID)
			.then(res => {
				this.project = res;
			})
			.catch(error => console.error(error));
		this.service.getTasks(this.projectID)
			.then(res => {
				this.tasks = res;
			})
			.catch(error => console.error(error));
	}

	add_new_task() {
		const disposable = this.dialogService.addDialog(AddNewTaskDialogComponent).subscribe((newTask) => {
			if (newTask) {
				newTask.projectID = this.projectID;
				this.service.addNewTask(newTask)
					.then(res => {
						console.info('Add new task:' + JSON.stringify(newTask));
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

	edit_task(task: Task) {
		const disposable = this.dialogService.addDialog(EditTaskDialogComponent, { task: task }).subscribe((task) => {
			if (task) {
				this.service.editTask(task)
					.then(res => {
						console.info('Update task:' + JSON.stringify(task));
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

	delete_task(task: Task) {
		const disposable = this.dialogService.addDialog(DeleteTaskDialogComponent, { task: task }).subscribe((isConfirmed) => {
			if (isConfirmed) {
				this.service.deleteTask(task)
					.then(res => {
						console.info('Delete task:' + JSON.stringify(task));
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


