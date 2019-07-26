import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/Models/project';
import { ProjectService } from '../project.service';
import { ConfigProject } from 'src/app/Models/configProject';

@Component({
  selector: 'app-project-client-config',
  templateUrl: './project-client-config.component.html',
  styleUrls: ['./project-client-config.component.css']
})
export class ProjectClientConfigComponent implements OnInit {
  pageTitle = "Configuration";
  errorMessage: string;
  configTableshow = false;
  configFormshow = false;
  projectId: number;
  private _allconfigProjects: ConfigProject[] = [];
  private projectDetails: ConfigProject[] = [];
  private submitModel: any = {};
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.configTableshow = false;
    this.configFormshow = false;
    this.getProjectDetails();
  }

  getProjectDetails() {  
    this.projectService.getConfigProjectsByUser('vuppalap')
    .subscribe(res => {
      this._allconfigProjects = res;
    });      
  }

  getProjects(filterVal: any){
    this.projectId = filterVal;
    this.projectService.getConfigDetails(filterVal)
    .subscribe(res => {
      this.projectDetails = res;      
    });   
    this.configTableshow = true;  
  }

  showConfigForm() {
    this.configFormshow = true;
  }
  onCancel() {
    this.configFormshow = false;
  }

  onFormSubmit(): void {
        const p = { ...this._allconfigProjects, ...this.submitModel };   
        p.Project_Id = this.projectId;      
          this.projectService.createConfig(p)
            .subscribe(
              () => {this.onSaveComplete()},
               (error: any) =>{ this.errorMessage = error.error.Message
                alert(this.errorMessage);
               }     
            );           
       }
       
       onSaveComplete(): void {    
        alert('Config Name added successfully');
        this.configFormshow = false;
        this.getProjects(this.projectId);      
      }  
}
