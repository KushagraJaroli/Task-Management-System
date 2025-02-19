package com.example.Task_SpringBoot.services.admin;

import com.example.Task_SpringBoot.dto.TaskDTO;
import com.example.Task_SpringBoot.dto.UserDto;
import com.example.Task_SpringBoot.entities.Task;

import java.util.List;

public interface AdminService {

    List<UserDto> getUsers();

    TaskDTO createTask(TaskDTO taskDTO);

    List<TaskDTO> getAllTask();

    void deleteTask(Long id);

    TaskDTO getTaskById(Long id);

    TaskDTO updateTask(Long id, TaskDTO taskDTO);

    List<TaskDTO> searchTaskByTitle(String title);

}
