import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { TaskManagerService } from '../../shared/services/taskManager.service';
import { Task, IOneTask } from '../../shared/models/task';
import { TaskStatus } from '../../shared/models/taskStatus';
import { Person } from '../../shared/models/person';

@Component({
	selector: 'edittask-dialog',
	templateUrl: './edittask.dialog.component.html'
})
export class EditTaskDialogComponent extends DialogComponent<IOneTask, Task> implements IOneTask {
	task: Task;
	isValid: boolean = true;
	taskStatuses: TaskStatus[] = new Array<TaskStatus>(new TaskStatus(0, "Новый"));
	persons: Person[] = new Array<Person>(new Person(0, "Не выбран"));
	priorities: number[] = new Array<number>(1, 2, 3, 4, 5);

	constructor(private service: TaskManagerService, dialogService: DialogService) {
		super(dialogService);
		this.fillDatasource();
	}

	fillDatasource() {
		this.service.getTaskStatuses()
			.then(res => {
				this.taskStatuses = res;
				this.taskStatuses.push(new TaskStatus(0, "Новый"));
			})
			.catch(error => console.error(error));
		this.service.getPersons()
			.then(res => {
				this.persons = res;
				this.persons.push(new Person(0, "Не выбран"));
			})
			.catch(error => console.error(error));
	}

	confirm() {
		this.isValid = (this.task.taskName.length > 0);
		if (this.isValid) {
			this.result = this.task;
			this.close();
		}
	}
}

