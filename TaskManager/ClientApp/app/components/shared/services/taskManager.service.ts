import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Project } from '../models/project';
import { Bank } from '../models/bank';
import { Person } from '../models/person';

@Injectable()
export class TaskManagerService {

	constructor(private http: Http) {
	}

	getProjects() {
		return this.http.get('/taskmanager/getprojects')
			.map((response: Response) => {
				return response.json() as Project[];
			})
			.toPromise();
	}

	addNewProject(project: Project) {
		const url = '/taskmanager/addnewproject';
		return this.http.post(url, project).toPromise();
	}

	getBanks() {
		return this.http.get('/taskmanager/getbanks')
			.map((response: Response) => {
				return response.json() as Bank[];
			})
			.toPromise();
	}

	getPersons() {
		return this.http.get('/taskmanager/getpersons')
			.map((response: Response) => {
				return response.json() as Person[];
			})
			.toPromise();
	}

	//addNewBook(book: Book) {
	//	const url = '/bookstore/addnewbook';
	//	return this.http.post(url, book).toPromise();
	//}

	//editBook(book: Book) {
	//	const url = '/bookstore/editbook';
	//	return this.http.post(url, book).toPromise();
	//}

	//deleteBook(book: Book) {
	//	const url = '/bookstore/deletebook';
	//	return this.http.post(url, book).toPromise();
	//}
}