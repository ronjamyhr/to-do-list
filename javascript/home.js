
// Kollar om min localstorage är tom eller null då läggs min lista i localstorage annars hämta det som finns i localstorage.
if(localStorage.getItem("myArrayLocalstorage") == null || localStorage.getItem("myArrayLocalstorage") == "[]" ){

    var myArray = ["Buy clothes", "Vacuum the car", "Go to gym", "Wash clothes"]
    localStorage.setItem("myArrayLocalstorage", JSON.stringify(myArray));
    
}else{

    var myArray = JSON.parse(localStorage.getItem('myArrayLocalstorage'));
}

var myDoneArray = [];

// Om det finns något i min localstorage hämta värderna och spara i en variabel.
if(localStorage.getItem("myDoneArrayLocalstorage")){
    
    var myDoneArray = JSON.parse(localStorage.getItem('myDoneArrayLocalstorage'));
}


//Loopar ut mina listor från localstorage.
function showMyToDoList(){

    var getArray = localStorage.getItem('myArrayLocalstorage');
    var arrayFromLocalstorage = JSON.parse(getArray);

    var myToDoList = '<ul>';
    for(var i = 0; i < arrayFromLocalstorage.length; i++){
        
        myToDoList += '<li class="row justify-content-center">' + '<div class="col-3 text-right">' + '<i id="' + i + '" onclick="removeToDo(' + i + ')" class="trash fas fa-trash"></i>' + ' ' + '<i onclick="moveToDone(' + i + ')" id="' + i + '" class="far fa-square"></i></div><div class="col-6 text-left"><p class="toDoText">' + ' ' +  arrayFromLocalstorage[i] + '</p></div></li>';

    };
    myToDoList += '</ul>';

    document.getElementById("myToDo").innerHTML = myToDoList;

    if(localStorage.getItem("myDoneArrayLocalstorage")){

        var getDoneArray = localStorage.getItem('myDoneArrayLocalstorage');
        var doneArrayFromLocalstorage = JSON.parse(getDoneArray);
        

        var myDoneToDoList = '<ul>';
        for (var i = 0; i < doneArrayFromLocalstorage.length; i++) {

        myDoneToDoList += '<li class="row justify-content-center">' + '<div class="col-3 text-right">' + '<i id="' + i + '" onclick="removeDone(' + i + ')" class="trash fas fa-trash"></i>' + ' ' + '<i onclick="moveBackToDo(' + i + ')" id="' + i + '" class="far fa-check-square"></i></div><div class="col-6 text-left"><p class="doneText">' + ' ' + doneArrayFromLocalstorage[i] + '</p></div></li>';
    
        };
        myDoneToDoList += '</ul>';

        document.getElementById("myDoneToDo").innerHTML = myDoneToDoList; 
    }

}

// Sparar mina listor i localstorage.
function saveToLocalstorage(){

    localStorage.setItem('myArrayLocalstorage', JSON.stringify(myArray));
    localStorage.setItem('myDoneArrayLocalstorage', JSON.stringify(myDoneArray));
}

// Lägger till värde till min array från inputfältet om du skriver in något, annars händer inget.
function addNewToDo(){

    var myTask = document.getElementById("textInputField").value;

    if(myTask === ''){

        return false;

    }else{

       myArray.push(myTask);

       saveToLocalstorage();
       showMyToDoList();

       document.getElementById("textInputField").value = '';
    }   
}

// Flyttar en "att göra" till min färdiga lista 
function moveToDone(id){

    var moveThis = myArray.splice(id, 1);
    var changeToString = moveThis.toString();
    myDoneArray.push(changeToString);

    saveToLocalstorage();
    showMyToDoList();
}

// Flyttar en "att göra" till min att göra lista  
function moveBackToDo(id){

    var moveThis = myDoneArray.splice(id, 1);
    var turnToString = moveThis.toString();
    myArray.push(turnToString);

    saveToLocalstorage();
    showMyToDoList();
}

// Ta bort en "att göra"
function removeToDo(id){
    
    myArray.splice(id, 1);

    saveToLocalstorage();
    showMyToDoList();
}

// Ta bort en färdig "att göra"
function removeDone(id){

    myDoneArray.splice(id, 1);

    saveToLocalstorage();
    showMyToDoList();
}

// Sorterar mina "att göra" och mina "gjorda" i bokstavsordning a-z
function sortMyToDo(){

    myArray.sort(function (x, y) {
        var a = x.toLowerCase();
        var b = y.toLowerCase();
 
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });

    saveToLocalstorage();
    showMyToDoList();
}

// När allt på sidan laddats klart så visas showMyToDoList(); funktionen
document.addEventListener("DOMContentLoaded", function () {

    showMyToDoList();

    // När man klickar på addButton händer funktionen addNewToDo();
    document.getElementById("addButton").addEventListener("click", function () {
        addNewToDo();
    });
});


