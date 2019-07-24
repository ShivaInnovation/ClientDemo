import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Table } from '../Models/table';
import { LookUpData } from '../Models/lookupData';
import { TableColumn } from '../Models/tableColumn';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private projectUrl = 'http://localhost:50136/api/tables'; 
   
  constructor(private http: HttpClient) { }

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(this.projectUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }  

  getTableData() {
    return this.http.get(this.projectUrl);
  }

  getTableColumn(tblId: string): Observable<TableColumn[]>
  {
    let params1 = new HttpParams().set('tblId', tblId);
    //const url = `${this.projectUrl}/${tblId}`;
    return this.http.get<TableColumn[]>('http://localhost:50136/api/tables', {params: params1});
  }

  getTable(id: number): Observable<Table[]> {    
    const url = `${this.projectUrl}/${id}`;
    return this.http.get<Table[]>(url)
      .pipe(
        tap(data => console.log('getTable: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );    
  } 

  getTableDataId(id: number) {
    const url = `${this.projectUrl}/${id}`;
    return this.http.get(url);
  }

  createTable(table: Table): Observable<Table> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //project.id = null;    
     return this.http.post<Table>(this.projectUrl, table, { headers: headers })
     .pipe(
          tap(data => console.log('createTable: ' + JSON.stringify(data))),
          catchError(this.handleError)
       );
  }

  createLookupTable(lookUpData: LookUpData): Observable<LookUpData> {   
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LookUpData>('http://localhost:50136/api/LookUp', lookUpData, { headers: headers })
    .pipe(
         tap(data => console.log('createTable: ' + JSON.stringify(data))),
         catchError(this.handleError)
      );
  }

  private handleError(err) {
    console.log(err);
    // // in a real world app, we may send the server to some remote logging infrastructure
    // // instead of just logging it to the console
    //let errorMessage: string;
    // if (err.error instanceof ErrorEvent) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   errorMessage = `An error occurred: ${err.error.message}`;
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong,
    //   errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    // }
    // console.error(err);
    return throwError(err);
  }

}
