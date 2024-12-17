"use strict";
const taskField = document.getElementById("task-field"); // input field

let listArr = [];

// event listener
taskField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // without this, attempt made to submit form
    let id = Date.now() + Math.floor(Math.random());
    const newTask = new Task(id, taskField.value.trim())
    listArr = [...listArr, newTask] // expand array and add newTask
    taskField.value = "";
    console.log(listArr);
  }
});


// make object instance
class Task {
  constructor(id, task){
    this.id = id;
    this.task = task;
  }
}

class UI {

}



















// class Task { // no constructor to initialize?

//     static printMessage(message){
//         console.log(`You added ${message}`)

//     }

//     // static handleInput(taskField, e){
//     //     if  (e.key === 'Enter' && taskField.value.trim() !== ''){
//     //         Task.printMessage(taskField.value);
//     //         taskField.value = ''
//     //     }
//     // }

// }

// // taskField.addEventListener('keydown', (e) => Task.handleInput(taskField, e))

// Task.greeting = function(){
//     console.log('Hello everyone star')
// }
