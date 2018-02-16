export class TaskFile {
	taskFileID: number;
	taskID: number;
	fileName: string;

	constructor() {
		this.taskFileID = 0;
		this.taskID = 0;
		this.fileName = "";
	}
}

export interface IOneTaskFile {
	taskFile: TaskFile;
}