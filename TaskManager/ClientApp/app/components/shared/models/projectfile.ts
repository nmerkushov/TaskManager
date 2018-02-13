export class ProjectFile {
	projectFileID: number;
	projectID: number;
	filePath: string;

	constructor() {
		this.projectFileID = 0;
		this.projectID = 0;
		this.filePath = "";
	}
}

export interface IOneProjectFile {
	projectFile: ProjectFile;
}