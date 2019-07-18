import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  createProjectTable(data) {
    return this.http.post('http://localhost:50136/api/projects', data);
  }
}
