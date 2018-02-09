﻿import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Project } from '../models/project';
import { Bank } from '../models/bank';
import { Person } from '../models/person';
import { Task } from '../models/task';
import { TaskStatus } from '../models/taskStatus';

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

	editProject(project: Project) {
		const url = '/taskmanager/editproject';
		return this.http.post(url, project).toPromise();
	}

	deleteProject(project: Project) {
		const url = '/taskmanager/deleteproject';
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

	getTasks(projectID : number) {
		return this.http.get(`/taskmanager/gettasks/${projectID}`)
			.map((response: Response) => {
				return response.json() as Task[];
			})
			.toPromise();
	}

	getProjectByID(projectID: number) {
		return this.http.get(`/taskmanager/getprojectbyid/${projectID}`)
			.map((response: Response) => {
				return response.json() as Project;
			})
			.toPromise();
	}

	getTaskStatuses() {
		return this.http.get('/taskmanager/gettaskstatuses')
			.map((response: Response) => {
				return response.json() as TaskStatus[];
			})
			.toPromise();
	}

	addNewTask(task: Task) {
		const url = '/taskmanager/addnewtask';
		return this.http.post(url, task).toPromise();
	}

	editTask(task: Task) {
		const url = '/taskmanager/edittask';
		return this.http.post(url, task).toPromise();
	}

	deleteTask(task: Task) {
		const url = '/taskmanager/deletetask';
		return this.http.post(url, task).toPromise();
	}
}