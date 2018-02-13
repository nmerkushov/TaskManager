export class TaskFile {
	taskFileID: number;
	taskID: number;
	filePath: string;

	constructor() {
		this.taskFileID = 0;
		this.taskID = 0;
		this.filePath = "";
	}
}

export interface IOneTaskFile {
	taskFile: TaskFile;
}