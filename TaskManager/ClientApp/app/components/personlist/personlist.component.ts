import { Component, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { DxDataGridComponent } from 'devextreme-angular';
import 'rxjs/Rx';
import { Person } from '../shared/models/person';
import { TaskManagerService } from '../shared/services/taskManager.service';
import { AddNewPersonDialogComponent } from './addnewperson.dialog/addnewperson.dialog.component';
import { EditPersonDialogComponent } from './editperson.dialog/editperson.dialog.component';
import { DeletePersonDialogComponent } from './deleteperson.dialog/deleteperson.dialog.component';

@Component({
	selector: 'personlist',
	templateUrl: './personlist.component.html',
	styleUrls: ['../shared/common.css']
})
export class PersonListComponent {
	@ViewChild('personGrid') projectGrid: DxDataGridComponent;
	persons: Person[] = new Array<Person>();

	constructor(private service: TaskManagerService, private dialogService: DialogService, private router: Router, private titleService: Title) {
		titleService.setTitle('Список лиц');
		this.fillDatasource();
	}

	fillDatasource() {
		this.service.getPersons()
			.then(res => {
				this.persons = res;
			})
			.catch(error => console.error(error));
	}

	add_new_person() {
		const disposable = this.dialogService.addDialog(AddNewPersonDialogComponent).subscribe((newPerson) => {
			if (newPerson) {
				this.service.addNewPerson(newPerson)
					.then(res => {
						console.info('Add new person:' + JSON.stringify(newPerson));
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

	edit_person(person: Person) {
		const disposable = this.dialogService.addDialog(EditPersonDialogComponent, { person: person }).subscribe((person) => {
			if (person) {
				this.service.editPerson(person)
					.then(res => {
						console.info('Update person:' + JSON.stringify(person));
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

	delete_person(person: Person) {
		const disposable = this.dialogService.addDialog(DeletePersonDialogComponent, { person: person }).subscribe((isConfirmed) => {
			if (isConfirmed) {
				this.service.deletePerson(person)
					.then(res => {
						console.info('Delete person:' + JSON.stringify(person));
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


