import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { TaskManagerService } from '../../shared/services/taskManager.service';
import { Person, IOnePerson } from '../../shared/models/shared.models';

@Component({
	selector: 'editperson-dialog',
	templateUrl: './editperson.dialog.component.html'
})
export class EditPersonDialogComponent extends DialogComponent<IOnePerson, Person> implements IOnePerson {
	person: Person;
	isValid: boolean = true;

	constructor(private service: TaskManagerService, dialogService: DialogService) {
		super(dialogService);
	}

	confirm() {
		this.isValid = (this.person.fio.length > 0);
		if (this.isValid) {
			this.result = this.person;
			this.close();
		}
	}
}

