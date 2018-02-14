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
	@ViewChild('projectFilesGrid') projectGrid: DxDataGridComponent;
	project: Project;
	projectFiles: ProjectFile[] = new Array<ProjectFile>();

	constructor(private service: TaskManagerService, dialogService: DialogService) {
		super(dialogService);
	}

	private ngOnInit() {
		this.fillDatasource();
	}

	fillDatasource() {
		if (this.project != null) {
			this.service.getProjectFiles(this.project.projectID)
				.then(res => {
					this.projectFiles = res;
				})
				.catch(error => console.error(error));
		}
	}

	addnew() {
		this.projectFiles.push(new ProjectFile());
	}

	confirm() {
		for (let p of this.projectFiles) {
			p.projectFileID = 0;
		}
		this.result = this.projectFiles.filter(pf => pf.filePath.trim() != '');
		this.close();
	}

	onContentReady(e: any) {
		e.component.columnOption("command:edit", {
			visibleIndex: -1,
			width: 80
		});
	}

	onCellPrepared(e: any) {
		if (e.rowType === "data" && e.column.command === "edit") {
			var cellElement = e.cellElement;

			var deleteLink = cellElement.querySelector(".dx-link-delete");
			deleteLink.classList.add("dx-icon-trash");
			deleteLink.textContent = "";
		}
	}

	onFilePathChanged(e: any, pf: ProjectFile)
	{
		pf.filePath = e.currentTarget.files[0].name;
	}
}

