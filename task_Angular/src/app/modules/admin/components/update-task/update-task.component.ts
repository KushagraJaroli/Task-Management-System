import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-update-task',
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
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent {

  id!:number ;
  updateTaskForm!: FormGroup;
  listOfEmployees: any = [];
  listOfPriorities: any = ["LOW", "MEDIUM", "HIGH"];
  listOfTaskStatus: any = ["PENDING", "INPROGRESS", "COMPLETED", "DEFERRED", "CANCELLED"];

  constructor(private service: AdminService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ){
    this.id = this.route.snapshot.params["id"];
    this.getTaskById();
    this.getUsers();
    this.updateTaskForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      taskStatus: [null, [Validators.required]]
    });
  }

  getTaskById(){
    this.service.getTaskById(this.id).subscribe((res)=>{
      this.updateTaskForm.patchValue(res);
      console.log(res);
    })
  }

  getUsers() {
    this.service.getUsers().subscribe((res) => {
      this.listOfEmployees = res;
      console.log(res);
    });
  }

  updateTask() {
    this.service.updateTask(this.id, this.updateTaskForm.value).subscribe((res)=>{
      if(res.id != null){
        this.snackBar.open("Task updated successfully","Close",{duration:5000});
        this.router.navigateByUrl("/admin/dashboard");
      }else{
        this.snackBar.open("Something went wrong","ERROR",{duration:5000});
      }
    })
  }

}
