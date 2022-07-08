package com.proyecto.app.controllers;

import com.proyecto.app.entity.User;
import com.proyecto.app.repository.UserRepository;
import com.proyecto.app.util.JWTUtil;
import com.proyecto.app.util.Message;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;
    private Message message = new Message();
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTUtil jwtUtil;
    private boolean validarToken(String token){
        String id = jwtUtil.getKey(token);
        return id != null;

    }
    @Operation(summary = "Get a User by its id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the User",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = User.class)) }),
            @ApiResponse(responseCode = "400", description = "Invalid id supplied",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "User not found",
                    content = @Content) })
    @RequestMapping(value = "api/users/{id}", method = RequestMethod.GET)
    public Optional<User> getUser(@PathVariable Long id, @RequestHeader(value = "Authorization") String token){
        if(!validarToken(token)){ return null;}

        Optional<User> foundUser = userRepository.findById(id);
        if(foundUser.isPresent()){
            return foundUser;
        }
        return null;
    }


    @RequestMapping(value = "api/users", method = RequestMethod.POST)
    public ResponseEntity createUser(@RequestBody User user){
        Map<String,String> response = new LinkedHashMap<>();
        try{
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return message.viewMessage(HttpStatus.OK,"success","registered user success!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.INTERNAL_SERVER_ERROR,"error","An error occurred while registering the user!");
        }

    }

    @RequestMapping(value = "api/users", method = RequestMethod.GET)
    public List<User> listUsers(@RequestHeader(value = "Authorization") String token){
        if(!validarToken(token)){ return null;}
        return userRepository.findAll();
    }

    @RequestMapping(value = "api/users/{id}", method = RequestMethod.PUT)
    public ResponseEntity editUser(@RequestBody User newUser, @PathVariable Long id, @RequestHeader(value = "Authorization") String token){
        if(!validarToken(token)){ return null;}
        Map<String, String> response = new HashMap<>();
        try {
            User user = userRepository.findById(id).get();
            user.setFirstName(newUser.getFirstName());
            user.setLastName(newUser.getLastName());
            user.setEmail(newUser.getEmail());
            user.setFechaNacimiento(newUser.getFechaNacimiento());
            user.setEstadoCivil(newUser.getEstadoCivil());
            user.setTienHermano(newUser.getTienHermano());
            user.setEstado(newUser.getEstado());
            user.setRoles(newUser.getRoles());
            user.setPassword(passwordEncoder.encode(newUser.getPassword()));
            userRepository.save(user);

            return message.viewMessage(HttpStatus.OK,"success","user edit success!!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","User not found!");
        }
    }

    @Operation(summary = "Delete a User by its id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Delete the User",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = User.class)) }),
            @ApiResponse(responseCode = "400", description = "Invalid id supplied",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "User not found",
                    content = @Content) })
    @RequestMapping(value = "api/users/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteUser(@PathVariable Long id, @RequestHeader(value = "Authorization") String token){
        if(!validarToken(token)){ return null;}
        Map<String, String> response = new HashMap<>();
        try {
            User user = userRepository.findById(id).get();
            userRepository.delete(user);
            return message.viewMessage(HttpStatus.OK,"success","user delete success!!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","User not found!");
        }


    }
}











