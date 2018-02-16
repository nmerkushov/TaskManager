export class ProjectFile {
	projectFileID: number;
	projectID: number;
	fileName: string;
	isAdded: boolean;
	isDeleted: boolean;
	fileData: any;

	constructor() {
		this.projectFileID = 0;
		this.projectID = 0;
		this.fileName = "";
		this.isAdded = false;
		this.isDeleted = false;
	}
}

export interface IOneProjectFile {
	projectFile: ProjectFile;
}