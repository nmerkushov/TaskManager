import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { TaskManagerService } from '../../shared/services/taskManager.service';
import { Task } from '../../shared/models/task';
import { TaskStatus } from '../../shared/models/taskStatus';
import { Person } from '../../shared/models/person';

@Component({
	selector: 'addnewtask-dialog',
	templateUrl: './addnewtask.dialog.component.html'
})

export class AddNewTaskDialogComponent extends DialogComponent<null, Task> {
	newTask: Task;
	isValid: boolean = true;
	taskStatuses: TaskStatus[] = new Array<TaskStatus>(new TaskStatus(0, "Новый"));
	persons: Person[] = new Array<Person>(new Person(0, "Не выбран"));
	priorities: number[] = new Array<number>(1, 2, 3, 4, 5);


	constructor(private service: TaskManagerService, dialogService: DialogService) {
		super(dialogService);
		this.newTask = new Task();
		this.fillDatasource();
	}

	fillDatasource() {
		this.service.getTaskStatuses()
			.then(res => {
				this.taskStatuses = res;
				this.taskStatuses.push(new TaskStatus(0, "Новый"));
				this.newTask.statusID = 0;
			})
			.catch(error => console.error(error));
		this.service.getPersons()
			.then(res => {
				this.persons = res;
				this.persons.push(new Person(0, "Не выбран"));
				this.newTask.responsiblePersonID = 0;
			})
			.catch(error => console.error(error));
	}

	confirm() {
		this.isValid = (this.newTask.taskName.length > 0);
		if (this.isValid) {
			this.result = this.newTask;
			this.close();
		}
	}
}

