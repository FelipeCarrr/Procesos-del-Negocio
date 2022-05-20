package com.proyecto.app;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class UsuariosApplicationTests {

	@Autowired
	private SaludoController saludo;
	@Test
	void contextLoads() {
		assertEquals(saludo.verSaludo( "Mundo").getContenido(), "Hola, Mundo!");
	}

}
