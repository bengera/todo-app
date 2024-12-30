"use strict";
const taskField = document.getElementById("task-field");
const list = document.querySelector(".tasks__list");
const remaining = document.getElementById('remaining-items');

let listArr = [];
let counter = 0;

// By using static classes we can call them methods without having an instance of class
taskField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    Task.handleTask();
  }
});

// make object instance
class Task {
  
  constructor(id, description, status = false) {
    this.id = id;
    this.description = description;
    this.status = status;
          
  }

  static handleTask() {
    
    let id = Date.now() + Math.floor(Math.random());
    const newTask = new Task(id, taskField.value.trim());
    listArr.push(newTask);
    taskField.value = "";
    Task.addTasks();
    // Task.updateCounter();
  }

  static addTasks() {
    list.innerHTML = ""; // creates issue when refresh, lose checkbox
    let allTasks = listArr
      .map((task) => {
        return `
      <div class="tasks__item-block">
                  <div class="tasks__inner-item-block">
                    <div class="tasks__left-block-content">
                      <input type="checkbox" id="${task.id}" class="tasks__checkbox" ${task.status ? "checked" : ""}>
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
    Task.updateCounter()
    list.innerHTML += allTasks;

     // event listener to see if inputs are checked
     const checkboxes = document.querySelectorAll('.tasks__checkbox');
     checkboxes.forEach((checkbox) => {
         checkbox.addEventListener('change', (e) => {
        const targetId = e.target.id;
        const found = listArr.find((el) => el.id.toString() === targetId)
        found.status ? found.status = false : found.status = true;
        console.log(found);
        Task.setLocalStorage()
        
       })
     })

    
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

static updateCounter(){
  //before updating update remaining text to include only items with status of false

  
  const listItemsTotal = listArr.length
  console.log(`${listItemsTotal}`);

  
  remaining.innerText = `${listItemsTotal} items left`
  
}

// old counter
  // static updateCounter(){
  //      if(listArr.length <= 0){
  //       remaining.innerText = `0 items left`
  //      } else {
  //         listArr.forEach((task)=> {
  //         task.status ? Task.countUp() : Task.countDown();
  //         remaining.innerText = `${counter} items left`
  //       })
  //      }
   
   
  // }

  static countUp() {
    counter++;
  }

  static countDown() {
    counter--;
  }
}


document.addEventListener('DOMContentLoaded',()=> {
  Task.getLocalStorage();
  Task.addTasks();
  Task.updateCounter();
})

