package com.example.Task_SpringBoot.dto;

import com.example.Task_SpringBoot.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {

    private Long id;

    private String name,email,password;

    private UserRole userRole;

}
