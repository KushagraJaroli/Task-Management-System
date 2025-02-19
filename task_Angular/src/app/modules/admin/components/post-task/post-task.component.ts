import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './post-task.component.html',
  styleUrls: ['./post-task.component.scss']
})
export class PostTaskComponent {
  taskForm!: FormGroup;
  listOfEmployees: any = [];
  listOfPriorities: any = ["LOW", "MEDIUM", "HIGH"];

  constructor(private adminService: AdminService, 
    private fb: FormBuilder,
    private snackBar:MatSnackBar,
    private router:Router
  ) {
    this.getUsers();
    this.taskForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]]
    });
  }

  getUsers() {
    this.adminService.getUsers().subscribe((res) => {
      this.listOfEmployees = res;
    });
  }

  postTask() {
    this.adminService.postTask(this.taskForm.value).subscribe((res)=>{
      if(res.id != null){
        this.snackBar.open("Task posted successfully","Close",{duration:5000});
        this.router.navigateByUrl("/admin/dashboard");
      }else{
        this.snackBar.open("Something went wrong","ERROR",{duration:5000});
      }
    })
  }
}
