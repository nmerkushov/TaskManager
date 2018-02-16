import { Component, ViewChild, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { DxDataGridComponent } from 'devextreme-angular';
import { TaskManagerService } from '../../shared/services/taskManager.service';
import { Project } from '../../shared/models/project';
import { Task, IOneProjectTask } from '../../shared/models/task';
import { TaskFile } from '../../shared/models/taskfile';

@Component({
	selector: 'taskfiles-dialog',
	templateUrl: './taskfiles.dialog.component.html'
})
export class TaskFilesDialogComponent extends DialogComponent<IOneProjectTask, TaskFile[]> implements IOneProjectTask {
	@ViewChild('taskFilesGrid') taskFilesGrid: DxDataGridComponent;
	project: Project;
	task: Task;
	taskFiles: TaskFile[] = new Array<TaskFile>();

	constructor(private service: TaskManagerService, dialogService: DialogService) {
		super(dialogService);
	}

	private ngOnInit() {
		this.fillDatasource();
	}

	fillDatasource() {
		if (this.task != null) {
			this.service.getTaskFiles(this.project.projectID, this.task.taskID)
				.then(res => {
					this.taskFiles = res;
					for (let tf of this.taskFiles) {
						tf.isAdded = false;
						tf.isDeleted = false;
						tf.fileData = new File(new Array<string>("---"), "nofile");
					}
				})
				.catch(error => console.error(error));
		}
	}

	addnew() {
		this.taskFiles.push(new TaskFile());
	}

	confirm() {
		this.result = this.taskFiles.filter(tf => tf.fileName.trim() != '');
		this.close();
	}

	onFilePathChanged(e: any, taskFile: TaskFile) {
		taskFile.isDeleted = true;
		let newTaskFile: TaskFile = new TaskFile();
		newTaskFile.taskID = this.task.taskID;
		newTaskFile.fileName = e.currentTarget.files[0].name;
		newTaskFile.fileData = e.target.files[0];
		newTaskFile.isAdded = true;
		newTaskFile.isDeleted = false;

		this.taskFiles.push(newTaskFile);
		this.taskFilesGrid.instance.filter(["isDeleted", "=", false]);
		this.taskFilesGrid.instance.refresh();
	}

	delete_taskfile(taskFile: TaskFile) {
		taskFile.isDeleted = true;
		this.taskFilesGrid.instance.filter(["isDeleted", "=", false]);
		this.taskFilesGrid.instance.refresh();
	}
}

