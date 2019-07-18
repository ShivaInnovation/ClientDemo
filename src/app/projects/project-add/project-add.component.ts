import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControlName, FormControl } from '@angular/forms';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { Project } from 'src/app/Models/project';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  project: Project;
  pageTitle = 'Project Edit';
  public projectForm: FormGroup;
  errorMessage: string;
  private sub: Subscription; 
  get columns(): FormArray {
    return <FormArray>this.projectForm.get('columns');
  }  

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  //private genericValidator: GenericValidator;

  constructor(private _fb: FormBuilder, 
              private projectService: ProjectService, 
              private router: Router,
              private route: ActivatedRoute) {}   
  
  ngOnInit() {
    this.projectForm = this._fb.group({
        id: 0,
        name: ['', [Validators.required, Validators.minLength(5)]],
        description:[''],
        active:['', [Validators.required]]      
    });

     // Read the project Id from the route parameter
     this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getProject(id);
      }
    );
}

ngOnDestroy(): void {
  this.sub.unsubscribe();
}

getProject(id: number): void {
  this.projectService.getProject(id)
    .subscribe(
      (project: Project) => this.displayProject(project),
      (error: any) => this.errorMessage = <any>error
    );
}

displayProject(project: Project): void {
  if (this.projectForm) {
    this.projectForm.reset();
  }
  this.project = project;

  if (this.project.id === 0) {
    this.pageTitle = 'Add Project';
  } else {
    this.pageTitle = `Edit Project: ${this.project.name}`;
  }

  // Update the data on the form
  this.projectForm.patchValue({    
    name: this.project.name,
    description: this.project.description,
    active: this.project.active,
    //lookupType: this.project.lookupType
  });
  //this.project.columns = this.project.columnNames.split(",");
  //this.projectForm.setControl['active'].setValue(this.active);
  //this.projectForm.setControl('columns', this._fb.array(this.project.columns || []));
}

changeLookup(e) {
  this.lookupName.setValue(e.target.value, {
    onlySelf: true
  })
}

get lookupName() {
  return this.projectForm.get('lookupType');
}

addColumn(): void {
  this.columns.push(new FormControl());  
}

deleteColumn(index: number): void {
  this.columns.removeAt(index);
  this.columns.markAsDirty();
}

saveProject(): void {
  if (this.projectForm.valid) {
    if (this.projectForm.dirty) {
      const p = { ...this.project, ...this.projectForm.value };      
      this.sub = this.route.paramMap.subscribe(
        params => {
          const id = +params.get('id'); 
          p.id = id;       
        }
      );
      console.log(p);
      if (p.id === 0) {
        this.projectService.createProject(p)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      } else {
        this.projectService.updateProject(p)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
      }
    } else {
      this.onSaveComplete();
    }
  } else {
    this.errorMessage = 'Please correct the validation errors.';
  }
}

onSaveComplete(): void {
  // Reset the form to clear the flags
  //this.productForm.reset();
  this.router.navigate(['/projects']);
}
 
}
