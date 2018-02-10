import { Component, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { DxDataGridComponent } from 'devextreme-angular';
import 'rxjs/Rx';
import { Bank } from '../shared/models/bank';
import { TaskManagerService } from '../shared/services/taskManager.service';
import { AddNewBankDialogComponent } from './addnewbank.dialog/addnewbank.dialog.component';
import { EditBankDialogComponent } from './editbank.dialog/editbank.dialog.component';
import { DeleteBankDialogComponent } from './deletebank.dialog/deletebank.dialog.component';

@Component({
	selector: 'banklist',
	templateUrl: './banklist.component.html',
	styleUrls: ['../shared/common.css']
})
export class BankListComponent {
	@ViewChild('bankGrid') projectGrid: DxDataGridComponent;
	banks: Bank[] = new Array<Bank>();

	constructor(private service: TaskManagerService, private dialogService: DialogService, private router: Router, private titleService: Title) {
		titleService.setTitle('Список банк');
		this.fillDatasource();
	}

	fillDatasource() {
		this.service.getBanks()
			.then(res => {
				this.banks = res;
			})
			.catch(error => console.error(error));
	}

	add_new_bank() {
		const disposable = this.dialogService.addDialog(AddNewBankDialogComponent).subscribe((newBank) => {
			if (newBank) {
				this.service.addNewBank(newBank)
					.then(res => {
						console.info('Add new bank:' + JSON.stringify(newBank));
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

	edit_bank(bank: Bank) {
		const disposable = this.dialogService.addDialog(EditBankDialogComponent, { bank: bank }).subscribe((bank) => {
			if (bank) {
				this.service.editBank(bank)
					.then(res => {
						console.info('Update bank:' + JSON.stringify(bank));
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

	delete_bank(bank: Bank) {
		const disposable = this.dialogService.addDialog(DeleteBankDialogComponent, { bank: bank }).subscribe((isConfirmed) => {
			if (isConfirmed) {
				this.service.deleteBank(bank)
					.then(res => {
						console.info('Delete bank:' + JSON.stringify(bank));
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


