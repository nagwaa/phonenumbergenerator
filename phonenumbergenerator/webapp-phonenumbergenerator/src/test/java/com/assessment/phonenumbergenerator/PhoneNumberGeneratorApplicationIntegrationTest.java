package com.assessment.phonenumbergenerator;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class PhoneNumberGeneratorApplicationIntegrationTest {

    @LocalServerPort
    private int port;


    private TestRestTemplate restTemplate = new TestRestTemplate();

    @Test
    void testRestEndPoint() {
        String url = "http://localhost:"+port+"/api/generate-combinations/1111111";
        ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, null, List.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().contains("1111111"));
    }

    @Test
    void testRestEndPoint_InvalidInput() {
        String url = "http://localhost:"+port+"/api/generate-combinations/123";
        ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, null, List.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().size() == 0);
    }


}
