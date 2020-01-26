package com.assessment.phonenumbergenerator.service;

import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("api")
public class PhoneNumberGeneratorController {

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/generate-combinations/{phoneNumber}", method = RequestMethod.GET)
    public List<String> generateCombinations(@PathVariable String phoneNumber){
        return Arrays.asList(phoneNumber);
    }

}
