import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule, 
    MatDividerModule,
    CommonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  listOfTasks: any = [];

  constructor(private service:EmployeeService,
    private matsnackbar:MatSnackBar
  ) {
    this.getTasks();
   }

  getTasks(){
    this.service.getEmployeeTasksById().subscribe((res)=>{
      this.listOfTasks = res;
    });
  }

  updateStatus(id: number, status: string){
    this.service.updateStatus(id,status).subscribe((res)=>{
      if(res.id!=null){
        this.matsnackbar.open("Task status updated successfully", "Close", {duration: 5000});
        this.getTasks();
      }else{
        this.matsnackbar.open("Getting error while updating task", "Close", {duration: 5000});
      }
    })
  }

}
