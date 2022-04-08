package com.proyecto.app.util;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

@Data
public class Message {
    Map<String, String> response;

    public ResponseEntity<Optional> viewMessage(HttpStatus status, String title, String detail){
        response = new LinkedHashMap<>();
        response.put("status", status.toString());
        response.put("title", title);
        response.put("detail", detail);
        return new ResponseEntity(response, status);
    }
}
