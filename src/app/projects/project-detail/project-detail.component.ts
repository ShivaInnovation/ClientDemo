import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableService } from '../table.service';
import { Table } from 'src/app/Models/table';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  pageTitle = "Table Details"
  private sub: Subscription; 
  tableId: number;
  tables: any[] = [];
  constructor( private router: Router,
               private route: ActivatedRoute,
               private tableService: TableService,
               private projectService: ProjectService) { }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id'); 
        this.tableId = id;       
      }
    );  
    this.getTableColumns();  
    console.log(this.tables);
  }

  getTableColumns() {
    this.projectService.getTableColumn(this.tableId)
          .subscribe(res => {
            this.tables.push(res)}
            ); 

  }

 

  onBack(): void {
    this.router.navigate(['/projects-table', this.tableId]);
  }
}
