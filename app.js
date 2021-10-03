"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  
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





  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);
  
  switch(displayOption){
    case "info":
    displayPerson(person)
    break;
    case "family":
    displayFamily(person, people)
    break;
    case "descendants":
    displayParents(person, people)
    break;
    case "restart":
    app(people);
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
  let personInfo = "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  personInfo += "id" + person[0].id + "\n";
  personInfo += "Gender: " + person[0].gender + "\n";
  personInfo += "D.O.B: " + person[0].dob + "\n";
  personInfo += "Height: " + person[0].height + "\n";
  personInfo += "Weight: " + person[0].weight + "\n";
  personInfo += "Eye Color: " + person[0].eyeColor + "\n"
  personInfo += "Occupation: " + person[0].occupation + "\n"
  personInfo += "Parents: " + person[0].parents + "\n"
  personInfo += "Current Spouse: " + person[0].currentSpouse + "\n"
  
  alert(personInfo);
}

function displayFamily(person, people){
let currentSpouse = people.filter(function(currentSpouse){
  if(person[0].currentSpouse === currentSpouse.id){
    return true;
  }
  else{
    return false;
  }
})
alert(person[0].firstName + " " + person[0].lastName + " " + "is a spouse of" + " " + currentSpouse[0].firstName + " " + currentSpouse[0].lastName);
}

function displayParents(person, people){
  let parents = people.filter(function(parents){
    if(person[0].parents >= parents[0].id){
      return true;
    }
    else{
      return false;
    }
  })
  alert(person[0].firstName + " " + person[0].lastName + " " + "is related to" + " " + parents[0].firstName + " " + parents[0].lastName || parents[0].firstName + " " + parents[0].lastName);
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