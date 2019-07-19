import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError, observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Project } from '../Models/project';
import { Config } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  formData: Project; 
  private projectUrl = 'http://localhost:50136/api/projects'

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getProjectsData() {
    return this.http.get(this.projectUrl);
  }

  getProject(id: number): Observable<Project> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    const url = `${this.projectUrl}/${id}`;
    return this.http.get<Project>(url)
      .pipe(
        tap(data => console.log('getProject: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createProject(project: Project): Observable<Project> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //project.id = null;    
     return this.http.post<Project>(this.projectUrl, project, { headers: headers })
     .pipe(
          tap(data => console.log('createProject: ' + JSON.stringify(data))),
          catchError(this.handleError)
       );
  }

  createProjectConfig(config: Config): Observable<Config> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //project.id = null;    
     return this.http.post<Project>(this.projectUrl, config, { headers: headers })
     .pipe(
          tap(data => console.log('createProject: ' + JSON.stringify(data))),
          catchError(this.handleError)
       );
  }

  updateProject(project: Project): Observable<Project> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.projectUrl}/${project.id}`;
    return this.http.put<Project>(url, project, { headers: headers })
      .pipe(
        tap(() => console.log('updateProject: ' + project.id)),
        // Return the product on an update
        map(() => project),
        catchError(this.handleError)
      );
  }
  
  private handleError(error : HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', error.error.message);
    } else {
      console.error('Server Side Error: ', error);
    }
   return Observable.throw(error.message || 'server Error');   
  }

  private initializeProduct(): Project {   
    return {
      id: 0,
      name: null,
      description: null,     
      active: null      
    };
  }
}
