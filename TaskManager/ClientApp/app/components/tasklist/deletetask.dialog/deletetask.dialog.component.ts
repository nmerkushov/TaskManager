import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Task, IOneTask } from '../../shared/models/task';

@Component({
	selector: 'deletetask-dialog',
	templateUrl: './deletetask.dialog.component.html'
})
export class DeleteTaskDialogComponent extends DialogComponent<IOneTask, boolean> implements IOneTask {
	task: Task;

	constructor(dialogService: DialogService) {
		super(dialogService);
	}

	confirm() {
		this.result = true;
		this.close();
	}
}

