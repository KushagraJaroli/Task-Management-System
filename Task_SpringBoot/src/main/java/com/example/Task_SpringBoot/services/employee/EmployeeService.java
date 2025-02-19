package com.example.Task_SpringBoot.services.employee;

import com.example.Task_SpringBoot.dto.TaskDTO;

import java.util.List;

public interface EmployeeService {

    List<TaskDTO> getTasksByUserId();

    TaskDTO updateTask(Long id, String status);

}
