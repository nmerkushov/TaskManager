import { Component, ViewChild, ElementRef } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { DxDataGridComponent} from 'devextreme-angular';
import { TaskManagerService } from '../../shared/services/taskManager.service';
import { Project, IOneProject } from '../../shared/models/project';
import { ProjectFile } from '../../shared/models/projectfile';

@Component({
	selector: 'projectfiles-dialog',
	templateUrl: './projectfiles.dialog.component.html'
})
export class ProjectFilesDialogComponent extends DialogComponent<IOneProject, ProjectFile[]> implements IOneProject {
	@ViewChild('projectFilesGrid') projectFilesGrid: DxDataGridComponent;
	project: Project;
	projectFiles: ProjectFile[] = new Array<ProjectFile>();

	constructor(private service: TaskManagerService, dialogService: DialogService) {
		super(dialogService);
	}

	private ngOnInit() {
		this.fillDatasource();
		this.projectFilesGrid.instance.filter(["isDeleted", "=", false]);
	}

	fillDatasource() {
		if (this.project != null) {
			this.service.getProjectFiles(this.project.projectID)
				.then(res => {
					this.projectFiles = res;
					for (let pf of this.projectFiles)
					{
						pf.isAdded = false;
						pf.isDeleted = false;
						pf.fileData = new File(new Array<string>("---"), "nofile");
					}
				})
				.catch(error => console.error(error));
		}
	}

	addnew() {
		this.projectFiles.push(new ProjectFile());
	}

	confirm() {		
		this.result = this.projectFiles.filter(pf => pf.filePath.trim() != '');
		this.close();
	}

	onFilePathChanged(e: any, projectFile: ProjectFile)
	{
		projectFile.isDeleted = true;
		let newProjectFile: ProjectFile = new ProjectFile();
		newProjectFile.projectID = this.project.projectID;
		newProjectFile.filePath = e.currentTarget.files[0].name;	
		newProjectFile.fileData = e.target.files[0];
		newProjectFile.isAdded = true;
		newProjectFile.isDeleted = false;
		
		this.projectFiles.push(newProjectFile);
		this.projectFilesGrid.instance.filter(["isDeleted", "=", false]);
		this.projectFilesGrid.instance.refresh();
	}

	delete_projectfile(projectFile: ProjectFile)
	{
		projectFile.isDeleted = true;
		this.projectFilesGrid.instance.filter(["isDeleted", "=", false]);
		this.projectFilesGrid.instance.refresh();
	}
}

