import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule} from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    MatCardModule, 
    MatDividerModule, 
    MatIconModule, 
    RouterModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  listOfTasks: any = [];
  searchForm!:FormGroup;

  constructor(private service: AdminService,
    private snackbar:MatSnackBar,
    private fb: FormBuilder
  ) { 
    this.getTasks();
    this.searchForm = this.fb.group({
      title: [null]
    })
  }

  getTasks() {
    this.service.getAllTasks().subscribe((res) => {
      this.listOfTasks = res;
    });
  }

  deleteTask(id:number){
    this.service.deleteTask(id).subscribe((res)=>{
      this.snackbar.open("Task deleted successfully","Close", {duration:5000});
      this.getTasks();
    })
  }

  searchTask(){
    this.listOfTasks=[];
    const title = this.searchForm.get('title')!.value;
    this.service.searchTask(title).subscribe((res)=>{
      this.listOfTasks=res;
    });
    if(title=="")
        this.getTasks();
  }

}
