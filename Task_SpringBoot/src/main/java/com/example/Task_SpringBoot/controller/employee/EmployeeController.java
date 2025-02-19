package com.example.Task_SpringBoot.controller.employee;

import com.example.Task_SpringBoot.dto.TaskDTO;
import com.example.Task_SpringBoot.services.employee.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("/tasks")
    private ResponseEntity<List<TaskDTO>> getTasksByUserId(){
        return ResponseEntity.ok(employeeService.getTasksByUserId());
    }

    @GetMapping("/task/{id}/{status}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long id, @PathVariable String status){
        TaskDTO updatedTaskDTO = employeeService.updateTask(id, status);
        if(updatedTaskDTO == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.ok(updatedTaskDTO);
    }

}
