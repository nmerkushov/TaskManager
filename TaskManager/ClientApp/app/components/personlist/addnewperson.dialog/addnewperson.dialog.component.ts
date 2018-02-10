import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { TaskManagerService } from '../../shared/services/taskManager.service';
import { Person } from '../../shared/models/person';

@Component({
	selector: 'addnewperson-dialog',
	templateUrl: './addnewperson.dialog.component.html'
})

export class AddNewPersonDialogComponent extends DialogComponent<null, Person> {
	newPerson: Person = new Person(0, '');
	isValid: boolean = true;

	constructor(private service: TaskManagerService, dialogService: DialogService) {
		super(dialogService);
	}

	confirm() {
		this.isValid = (this.newPerson.fio.length > 0);
		if (this.isValid) {
			this.result = this.newPerson;
			this.close();
		}
	}
}

