import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { TaskManagerService } from '../../shared/services/taskManager.service';
import { Bank } from '../../shared/models/shared.models';

@Component({
	selector: 'addnewbank-dialog',
	templateUrl: './addnewbank.dialog.component.html'
})

export class AddNewBankDialogComponent extends DialogComponent<null, Bank> {
	newBank: Bank = new Bank(0, '');
	isValid: boolean = true;
	
	constructor(private service: TaskManagerService, dialogService: DialogService) {
		super(dialogService);
	}

	confirm() {
		this.isValid = (this.newBank.bankName.length > 0);
		if (this.isValid) {
			this.result = this.newBank;
			this.close();
		}
	}
}

