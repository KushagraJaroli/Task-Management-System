package com.example.Task_SpringBoot.dto;

import com.example.Task_SpringBoot.enums.TaskStatus;
import lombok.Data;

import java.util.Date;

@Data
public class TaskDTO {

    private Long id;

    private String title, description, priority;

    private Date dueDate;

    private TaskStatus taskStatus;

    private Long employeeId;

    private String employeeName;

}
