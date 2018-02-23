import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Project } from '../models/project';
import { Bank } from '../models/bank';
import { Person } from '../models/person';
import { Task } from '../models/task';
import { TaskStatus } from '../models/taskstatus';
import { ProjectFile } from '../models/projectfile';
import { TaskFile } from '../models/taskfile';

@Injectable()
export class TaskManagerService {

	constructor(private http: Http) {
	}

	getProjects() {
		return this.http.get('/taskmanager/projects')
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

	getProjectByID(projectID: number) {
		return this.http.get(`/taskmanager/project/${projectID}`)
			.map((response: Response) => {
				return response.json() as Project;
			})
			.toPromise();
	}

	getBanks() {
		return this.http.get('/taskmanager/banks')
			.map((response: Response) => {
				return response.json() as Bank[];
			})
			.toPromise();
	}

	addNewBank(bank: Bank) {
		const url = '/taskmanager/addnewbank';
		return this.http.post(url, bank).toPromise();
	}

	editBank(bank: Bank) {
		const url = '/taskmanager/editbank';
		return this.http.post(url, bank).toPromise();
	}

	deleteBank(bank: Bank) {
		const url = '/taskmanager/deletebank';
		return this.http.post(url, bank).toPromise();
	}

	getPersons() {
		return this.http.get('/taskmanager/persons')
			.map((response: Response) => {
				return response.json() as Person[];
			})
			.toPromise();
	}

	addNewPerson(person: Person) {
		const url = '/taskmanager/addnewperson';
		return this.http.post(url, person).toPromise();
	}

	editPerson(person: Person) {
		const url = '/taskmanager/editperson';
		return this.http.post(url, person).toPromise();
	}

	deletePerson(person: Person) {
		const url = '/taskmanager/deleteperson';
		return this.http.post(url, person).toPromise();
	}

	getTasks(projectID: number) {
		return this.http.get(`/taskmanager/project/${projectID}/tasks`)
			.map((response: Response) => {
				return response.json() as Task[];
			})
			.toPromise();
	}

	
	getTaskStatuses() {
		return this.http.get('/taskmanager/taskstatuses')
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

	getProjectFiles(projectID: number) {
		return this.http.get(`/taskmanager/project/${projectID}/projectfiles`)
			.map((response: Response) => {
				return response.json() as ProjectFile[];
			})
			.toPromise();
	}

	updateProjectFiles(projectID: number, projectFiles: ProjectFile[]) {
		const url = `/taskmanager/project/${projectID}/updateprojectfiles`;
		let formData: FormData = new FormData();
		for (let i = 0; i < projectFiles.length; i++) {
			formData.append("filesContent", projectFiles[i].fileData);
		}
		formData.append("projectFilesJson", JSON.stringify({ projectFiles }));
		return this.http.post(url, formData).toPromise();
	}

	getTaskFiles(projectID: number, taskID: number) {
		return this.http.get(`taskmanager/project/${projectID}/task/${taskID}/taskfiles`)
			.map((response: Response) => {
				return response.json() as TaskFile[];
			})
			.toPromise();
	}

	updateTaskFiles(projectID: number,taskID: number, taskFiles: TaskFile[]) {
		const url = `taskmanager/project/${projectID}/task/${taskID}/updatetaskfiles`;
		let formData: FormData = new FormData();
		for (let i = 0; i < taskFiles.length; i++) {
			formData.append("filesContent", taskFiles[i].fileData);
		}
		formData.append("taskFilesJson", JSON.stringify({ taskFiles }));
		return this.http.post(url, formData).toPromise();
	}
}