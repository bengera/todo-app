"use strict";
const taskField = document.getElementById("task-field");
const list = document.querySelector(".tasks__list");

let listArr = [];

taskField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    Task.handleTask();
  }
});

// make object instance
class Task {
  constructor(id, description) {
    this.id = id;
    this.description = description;
    // taskField.addEventListener("keydown", this._handleTask.bind(this))
  }

  static handleTask() {
    console.log("handling new task");
    let id = Date.now() + Math.floor(Math.random());
    const newTask = new Task(id, taskField.value.trim());
    listArr.push(newTask);
    taskField.value = "";
    Task.addTasks();
  }

  static addTasks() {
    list.innerHTML = ""; // creates issue when refresh, lose checkbox
    let allTasks = listArr
      .map((task) => {
        return `
      <div class="tasks__item-block">
                  <div class="tasks__inner-item-block">
                    <div class="tasks__left-block-content">
                      <input type="checkbox" id="${task.id}" class="tasks__checkbox">
                      <label class="tasks__text truncate" for="${task.id}">
                        ${task.description}
                      </label>
                    </div>
                    <button class="tasks__btn-delete"></button>
                  </div>
                </div>
      `;
      })
      .join("");

    list.innerHTML += allTasks;
    console.log(listArr);
  }
}

// for each array items
// class UI {
//   static addTasks() {
//     list.innerHTML = ''; // creates issue when refresh, lose checkbox
//     let allTasks = listArr.map(task =>{
//       return `
//       <div class="tasks__item-block">
//                   <div class="tasks__inner-item-block">
//                     <div class="tasks__left-block-content">
//                       <input type="checkbox" id="${task.id}" class="tasks__checkbox">
//                       <label class="tasks__text truncate" for="${task.id}">
//                         ${task.description}
//                       </label>
//                     </div>
//                     <button class="tasks__btn-delete"></button>
//                   </div>
//                 </div>
//       `
//     }).join('')

//     list.innerHTML += allTasks;
//     console.log(listArr);

//   }

// }

//Bugs
// each input item must be give a unique id in order to work

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
