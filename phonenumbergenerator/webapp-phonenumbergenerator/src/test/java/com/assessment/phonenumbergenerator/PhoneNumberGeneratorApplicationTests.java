package com.assessment.phonenumbergenerator;

import com.assessment.phonenumbergenerator.service.PhoneNumberGeneratorController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class PhoneNumberGeneratorApplicationTests {

	@Autowired
	private PhoneNumberGeneratorController controller;

	@Test
	void validatePhoneNumber(){
		assertTrue(controller.generateCombinations(null).size() == 0);
		assertTrue(controller.generateCombinations("").size() == 0);
		assertTrue(controller.generateCombinations(" ").size() == 0);
		assertTrue(controller.generateCombinations("1").size() == 0);
		assertTrue(controller.generateCombinations("12").size() == 0);
		assertTrue(controller.generateCombinations("123").size() == 0);
		assertTrue(controller.generateCombinations("1234").size() == 0);
		assertTrue(controller.generateCombinations("12345").size() == 0);
		assertTrue(controller.generateCombinations("123456").size() == 0);
		// Valid, size = 7
		assertTrue(controller.generateCombinations("1234567").size() > 0);
		assertTrue(controller.generateCombinations("12345678").size() == 0);
		assertTrue(controller.generateCombinations("123456789").size() == 0);
		// Valid, size = 10
		assertTrue(controller.generateCombinations("1234567890").size() > 0);
		assertTrue(controller.generateCombinations("12345678901").size() == 0);
	}

	@Test
	void validateCombinations_withInput1s(){
		String input = "1111111";
		List<String> output = controller.generateCombinations(input);
		assertTrue(output.size() == 1);
		assertTrue(output.get(0).equals(input));
	}

	@Test
	void validateCombinations_withInputAll0s(){
		String input = "0000000";
		List<String> output = controller.generateCombinations(input);
		assertTrue(output.size() == 1);
		assertTrue(output.get(0).equals(input));
	}

	@Test
	void validateCombinations_withInput_7000000000(){
		String input = "7000000000";
		List<String> output = controller.generateCombinations(input);
		assertTrue(output.size() == 5);
		assertTrue(output.contains("7000000000"));
		assertTrue(output.contains("P000000000"));
		assertTrue(output.contains("Q000000000"));
		assertTrue(output.contains("R000000000"));
		assertTrue(output.contains("S000000000"));
	}

	@Test
	void validateCombinations(){
		String input = "7046124892";
		List<String> output = controller.generateCombinations(input);
		assertTrue(output.size() > 0);
		assertTrue(output.contains("704612489A"));
		assertTrue(output.contains("704612489B"));
		assertTrue(output.contains("704612489C"));
		assertTrue(output.contains("P046124892"));
		assertTrue(output.contains("P0GM1AGTWA"));
	}

}
