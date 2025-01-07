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
    
  }

  static addTasks() {
    list.innerHTML = ""; 
    let allTasks = listArr
      .map((task) => {
        return `
      <div class="tasks__item-block">
                  <div class="tasks__inner-item-block">
                    <div class="tasks__left-block-content" data-id="${task.id}">
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
  const listItemsUnchecked = listArr.filter(item => item.status === false)
  remaining.innerText = `${listItemsUnchecked.length} items left`
  
}

}


document.addEventListener('DOMContentLoaded',()=> {
  Task.getLocalStorage();
  Task.addTasks();
  Task.updateCounter();

  // Add event listener ONCE for the entire list (event delegation)
  list.addEventListener('click', (e) => { 
    if (e.target.closest('.tasks__left-block-content')){ // check if block exists
        const targetBlock = e.target.closest('.tasks__left-block-content'); // find the closest block
        const taskId = targetBlock.getAttribute('data-id'); // find the id of that block
        const task = listArr.find((el) => el.id.toString() === taskId); // find the element in the listArray that has the same id

        if (task) {
          task.status = !task.status; // swap the boolean value
          Task.setLocalStorage();
          Task.updateCounter();
          Task.addTasks(); // Re-render tasks
        }
    }
  })

})

