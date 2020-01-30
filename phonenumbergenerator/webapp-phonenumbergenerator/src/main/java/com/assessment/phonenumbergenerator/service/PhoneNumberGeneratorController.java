package com.assessment.phonenumbergenerator.service;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("api")
public class PhoneNumberGeneratorController {

    private static Map<Integer, char[]> keyMapping= new HashMap<>();

    static {
        keyMapping.put(0, new char[]{'0'});
        keyMapping.put(1, new char[]{'1'});
        keyMapping.put(2, new char[]{'A', 'B', 'C'});
        keyMapping.put(3, new char[]{'D', 'E', 'F'});
        keyMapping.put(4, new char[]{'G', 'H', 'I'});
        keyMapping.put(5, new char[]{'J', 'K', 'L'});
        keyMapping.put(6, new char[]{'M', 'N', 'O'});
        keyMapping.put(7, new char[]{'P', 'Q', 'R', 'S'});
        keyMapping.put(8, new char[]{'T', 'U', 'V'});
        keyMapping.put(9, new char[]{'W', 'X', 'Y', 'Z'});
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/generate-combinations/{phoneNumber}", method = RequestMethod.GET)
    public List<String> generateCombinations(@PathVariable String phoneNumber){
        Set<String> combinations = new HashSet<>();
        // Backward
        combinations.addAll(getPhoneNumberCombinations(phoneNumber, phoneNumber.length() - 1, -1, false));
        // Forward
        combinations.addAll(getPhoneNumberCombinations(phoneNumber, 0, 1, false));
        // Skip numbers
        combinations.addAll(getPhoneNumberCombinations(phoneNumber, 0, 1, true));
        List<String> combinationList = Arrays.asList(combinations.toArray(new String[]{}));
        Collections.sort(combinationList);
        return combinationList;
    }

    private Set<String> getPhoneNumberCombinations(String input, int index, int incrementBy, boolean useInput){
        if(index < 0 || index == input.length()){
            return Collections.emptySet();
        }
        int newIndex = index + incrementBy;
        Set<String> alphaNumericNumbers = new HashSet<>();
        char[] alphaNumericChars = input.toCharArray();
        int digit = Integer.valueOf(String.valueOf(alphaNumericChars[index]));
        char[] chars = keyMapping.get(digit);
        for(int i = 0; i < chars.length; i++){
            alphaNumericChars[index] = chars[i];
            String combination = String.valueOf(alphaNumericChars);
            alphaNumericNumbers.add(combination);
            String newInput = useInput ? input : combination;
            alphaNumericNumbers.addAll(getPhoneNumberCombinations(newInput, newIndex, incrementBy, useInput));
        }
        return alphaNumericNumbers;
    }

}
