package com.proyecto.app.entity;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "users")
@Data
public class User {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    @Column(nullable = false, unique = true, length = 50)
    private String email;

    @Column(nullable = false, length = 64)
    private String password;

    @Column(name = "first_name",nullable = false,length = 100)
    private String firstName;

    @Column(name = "last_name",nullable = false,length = 100)
    private String lastName;

    @Column(name = "fecha_nacimiento",nullable = false,length = 100)
    private String fechaNacimiento;

    @Column(name = "estado_civil",nullable = false,length = 100)
    private String estadoCivil;

    @Column(name = "tien_hermano",nullable = false,length = 100)
    private String tienHermano;

    @Column(name = "estado",nullable = false,length = 100)
    private String estado;

    @Column(name = "roles",nullable = false,length = 100)
    private String roles;
}
