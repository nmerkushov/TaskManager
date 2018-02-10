import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Person, IOnePerson } from '../../shared/models/person';

@Component({
	selector: 'deleteperson-dialog',
	templateUrl: './deleteperson.dialog.component.html'
})
export class DeletePersonDialogComponent extends DialogComponent<IOnePerson, boolean> implements IOnePerson {
	person: Person;

	constructor(dialogService: DialogService) {
		super(dialogService);
	}

	confirm() {
		this.result = true;
		this.close();
	}
}

