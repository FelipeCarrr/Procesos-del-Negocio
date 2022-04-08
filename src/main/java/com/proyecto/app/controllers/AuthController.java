package com.proyecto.app.controllers;

import com.proyecto.app.entity.User;
import com.proyecto.app.repository.UserRepository;
import com.proyecto.app.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    private UserRepository  userRepository;
    private User user;
    private Message message;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value = "api/auth/login", method = RequestMethod.POST)
    public ResponseEntity login(@RequestBody User userReq){
        try {
            message = new Message();
            user = userRepository.findByEmail(user.getEmail());
            if (passwordEncoder.matches(userReq.getPassword(), user.getPassword())){
                return message.viewMessage(HttpStatus.OK,"Logiin", "The user logged in");
            }
            return message.viewMessage(HttpStatus.UNAUTHORIZED, "UNAUTHORIZED", "invalid username or password");
        }catch (Exception e){

            return message.viewMessage(HttpStatus.INTERNAL_SERVER_ERROR,"error","An error occurred!");

        }

    }
}
