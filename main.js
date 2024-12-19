"use strict";
const taskField = document.getElementById("task-field");
const list = document.querySelector(".tasks__list");

let listArr = [];

// By using static classes we can call them methods without having an instance of class
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

      Task.setLocalStorage()
    list.innerHTML += allTasks;
    console.log(listArr);
    
  }

  static setLocalStorage(){
    localStorage.setItem('allTasks',JSON.stringify(listArr));
    console.log('data stored')
  }

  static getLocalStorage(){
    const data = JSON.parse(localStorage.getItem('allTasks'))
    if (data){
      listArr = [...data]; // merge data into listArr
      console.log(`${data.length} tasks retrieved`)
    }
    
    
  }
}


document.addEventListener('DOMContentLoaded',()=> {
  Task.getLocalStorage();
  Task.addTasks();
})

