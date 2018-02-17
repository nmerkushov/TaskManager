import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Title } from '@angular/platform-browser';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { DxDataGridComponent, DxColorBoxComponent } from 'devextreme-angular';
import 'rxjs/Rx';
import { Project } from '../shared/models/project';
import { Task } from '../shared/models/task';
import { TaskManagerService } from '../shared/services/taskManager.service';
import { AddNewTaskDialogComponent } from './addnewtask.dialog/addnewtask.dialog.component';
import { EditTaskDialogComponent } from './edittask.dialog/edittask.dialog.component';
import { DeleteTaskDialogComponent } from './deletetask.dialog/deletetask.dialog.component';
import { TaskFilesDialogComponent } from './taskfiles.dialog/taskfiles.dialog.component';

@Component({
	selector: 'tasklist',
	templateUrl: './tasklist.component.html',
	styleUrls: ['../shared/common.css']
})
export class TaskListComponent {
	@ViewChild('taskGrid') taskGrid: DxDataGridComponent;
	@ViewChild('colorBox') colorBox: DxColorBoxComponent;
	projectID: number;
	project: Project = new Project();
	tasks: Task[] = new Array<Task>();

	constructor(private service: TaskManagerService, private dialogService: DialogService, private route: ActivatedRoute, private titleService: Title) {
		titleService.setTitle('Список задач');
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
				this.fillDatasource();
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

	onRowPrepared(e: any) {
		if (e.rowType == "data") {
			if (e.data.rowColor == '') {
				e.rowElement.bgColor = '#ffffff';
			}
			else {
				e.rowElement.bgColor = e.data.rowColor;
			}
		}
	}

	onChangeColor(e: any)
	{
		for (var t of this.taskGrid.selectedRowKeys) {
			t.rowColor = this.colorBox.value;
			this.service.editTask(t)
				.then(res => {
					console.info('Update task:' + JSON.stringify(t));
				}
				)
				.catch(err => console.error(err));
		}
		this.taskGrid.instance.clearSelection();
		this.taskGrid.instance.refresh();
	}

	taskfiles(task: Task) {
		const disposable = this.dialogService.addDialog(TaskFilesDialogComponent, { project: this.project,task: task }).subscribe((taskfiles) => {
			if (taskfiles) {
				this.service.updateTaskFiles(this.project.projectID, task.taskID, taskfiles)
					.then(res => {
						console.info('Update task files:' + JSON.stringify(taskfiles));
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


