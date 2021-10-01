"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  //  let searchType = promptFor('Enter 1 if you know the name of the person you are looking for, Enter 2 to look up by eyecolor. Enter 3 to lookup by gender. Enter 4 to lookup by occupation. Enter 5 to lookup by weight, Enter 6 to lookup by height.',autoValid)
  //  let eyeResults = searchForEyeColor(people);
  //  let genderResults = searchByGender(people);
  //  let occupationResults = searchByOccupation(people);
  //  let weightResults = searchByWeight(people);
  //  let heightResults = searchByHeight(people);
  let searchResults = people

  while (searchResults.length > 1) {
    let searchType = promptFor('Enter 1 if you know the name of the person you are looking for, Enter 2 to look up by eyecolor. Enter 3 to lookup by gender. Enter 4 to lookup by occupation. Enter 5 to lookup by weight, Enter 6 to lookup by height.',autoValid)
    
    
      
 
  switch(searchType){
    case '1':
      searchResults = searchByName(people);
      break;
    case '2':
      searchResults = searchForEyeColor(searchResults);
      displayPeople(searchResults);
      break;
      //return app(eyeResults);
    case '3':  
      searchResults = searchByGender(searchResults);
      displayPeople(searchResults);
      break;
      //return app(genderResults);
    case '4':  
      searchResults = searchByOccupation(searchResults);
      displayPeople(searchResults);
      break;
      //return app(occupationResults);
    case '5':  
      searchResults = searchByWeight(searchResults);
      displayPeople(searchResults);
      break;
      //return app(weightResults);
    case '6': 
      searchResults = searchByHeight(searchResults);
      displayPeople(searchResults);
      break;
      //return app(heightResults);
      // TODO: search by traits
      default:
    app(people); // restart app
      break;
  }
}


  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
  

}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(person.length === 0){
    alert("Could not find that individual.");
    return app(people); // restart
  }





  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    //TODO 
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // 
  return (foundPerson)
}

//Trait filter for Eye Color

function searchForEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", autoValid);

  let foundEyeColor = people.filter(function(potentialEyeColorMatch){
    if(potentialEyeColorMatch.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
   }
})
return foundEyeColor;
}

// Trait Filter for Gender

function searchByGender(people){
  let gender = promptFor("What is the person's gender?", autoValid);

  let foundGender = people.filter(function(potentialGenderMatch){
    if(potentialGenderMatch.gender === gender){
      return true;
    }
    else{
      return false;
   }
})
return foundGender;
}

// Trait Filter for occupation

function searchByOccupation(people){
  let occupation = promptFor("What is the person's occupation?", autoValid);

  let foundOccupation = people.filter(function(potentialOccupationMatch){
    if(potentialOccupationMatch.occupation === occupation){
      return true;
    }
    else{
      return false;
   }
})
return foundOccupation;
}

//Trait Filter for Weight

function searchByWeight(people){
  let weight = promptFor("What is the person's weight?", autoValid);
  
  let foundWeight = people.filter(function(potentialWeightMatch){
    if(potentialWeightMatch.weight === parseInt(weight)){
      return true;
    }
    else{
      return false;
   }
})
return foundWeight;
}

//Trait Filter for Height

function searchByHeight(people){
  let height = promptFor("What is the person's height?", autoValid);
  
  let foundHeight = people.filter(function(potentialHeightMatch){
    if(potentialHeightMatch.height === parseInt(height)){
      return true;
    }
    else{
      return false;
   }
})
return foundHeight;
}

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}



function displayPerson(person){
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "id" + person.id + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "D.O.B: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personinfo += "Eye Color: " + person.eyeColor + "\n"
  personInfo += "Occupation: " + person.occupation + "\n"
  personInfo += "Parents: " + person.parents + "\n"
  personInfo += "Current Spouse: " + person.currentSpouse + "\n"

  alert(personInfo);
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 


//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

// #endregion