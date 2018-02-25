import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { TaskManagerService } from '../../shared/services/taskManager.service';
import { Bank, IOneBank } from '../../shared/models/shared.models';

@Component({
	selector: 'editbank-dialog',
	templateUrl: './editbank.dialog.component.html'
})
export class EditBankDialogComponent extends DialogComponent<IOneBank, Bank> implements IOneBank {
	bank: Bank;
	isValid: boolean = true;

	constructor(private service: TaskManagerService, dialogService: DialogService) {
		super(dialogService);
	}

	confirm() {
		this.isValid = (this.bank.bankName.length > 0);
		if (this.isValid) {
			this.result = this.bank;
			this.close();
		}
	}
}

