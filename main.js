"use strict";
const taskField = document.getElementById("task-field");
const list = document.querySelector(".tasks__list");
const remaining = document.getElementById('remaining-items');
const container = document.querySelector('.master-container');

// Buttons
const themeSwitcherButton = document.querySelector('.btn-theme-switcher');

const allItemsButton = document.getElementById('all');
const completedButton = document.getElementById('completed');
const activeButton = document.getElementById('active');
const clearButton = document.getElementById('clear');

let listArr = [];
let counter = 0;
let currentTheme = 'light';

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

  static renderTasks(tasks) {
    list.innerHTML = ""; 
    const allTasks = tasks
      .map((task) => {
        return `
      <div class="tasks__item-block">
                  <div class="tasks__inner-item-block ${currentTheme}">
                    <div class="tasks__left-block-content ${currentTheme}" data-id="${task.id}">
                      <input type="checkbox" id="${task.id}" class="tasks__checkbox" ${task.status ? "checked" : ""}>
                      <label class="tasks__text truncate ${currentTheme}" for="${task.id}">
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
 
       
    
  }

  static addTasks() {
    Task.renderTasks(listArr)
    Task.setLocalStorage()
    Task.updateCounter()
  }

  static showCompleted(completedTasks){
    Task.renderTasks(completedTasks)
  }

  static showActive(activeTasks){
    Task.renderTasks(activeTasks)
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
  remaining.innerText = listItemsUnchecked.length > 1 || listItemsUnchecked.length === 0 ? `${listItemsUnchecked.length} items left` : `${listItemsUnchecked.length} item left`
  
}

static addActiveColor(target){
  const sortingButtons = document.querySelectorAll('.sorting-bar-mobile__button');
  sortingButtons.forEach(button => {
      if(button.classList.contains('active')){
        button.classList.remove('active');
        
      }
      target.classList.add('active')
  })
}

}

document.addEventListener('DOMContentLoaded',()=> {

    // retrieve theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light
    currentTheme = savedTheme;
  
    // apply saved theme
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
      if (element.classList.contains('light') || element.classList.contains('dark')) {
        element.classList.remove('light', 'dark');
        element.classList.add(currentTheme);
      }
    });

  Task.getLocalStorage();
  Task.addTasks();
  Task.updateCounter();

  // Add event listener ONCE for the entire list (event delegation)
  list.addEventListener('click', (e) => { // represents the element clicked
    if (e.target.closest('.tasks__left-block-content')){ // check if block exists
        const targetBlock = e.target.closest('.tasks__left-block-content'); // find the closest block
        const taskId = targetBlock.getAttribute('data-id'); // find the id of that block
        const task = listArr.find((el) => el.id.toString() === taskId); // find the element in the listArray that has the same id

        if (task) {
          task.status = !task.status; // swap the boolean value of found task
          Task.setLocalStorage();
          Task.updateCounter();
          Task.addTasks(); // Re-render tasks
        }
    }

    if(e.target.classList.contains('tasks__btn-delete')){ // checks if clicked item is a delete button
      const taskId = e.target.closest('.tasks__inner-item-block').querySelector('.tasks__left-block-content').getAttribute('data-id'); // Get ID of task to be deleted
      listArr = listArr.filter((el) => el.id.toString() !== taskId);
      Task.setLocalStorage();
      Task.updateCounter();
      Task.addTasks(); 
    }
    

  });

// THEME SWITCHER
function switchTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  const elements = document.querySelectorAll('*');
  elements.forEach(element => {
    if (element.classList.length > 0){
      element.classList.forEach(className => {
        if (className === 'light'){
          element.classList.remove('light');
          element.classList.add('dark');
        }
        else if (className === 'dark'){
          element.classList.remove('dark');
          element.classList.add('light');
        }
      })
    } 
  })
  localStorage.setItem('theme', currentTheme);

}

// EVENT LISTENERS

themeSwitcherButton.addEventListener('click', switchTheme);


  // add event listener to 'all' button
completedButton.addEventListener('click', (e) => {
    const targetEl = e.target;
    const completedTasks = listArr.filter((task) => task.status === true);
    Task.showCompleted(completedTasks);
    Task.addActiveColor(targetEl);
    // console.log('show completed tasks ✅');
});

allItemsButton.addEventListener('click', (e) => {
    const targetEl = e.target;
    Task.addTasks();
    Task.addActiveColor(targetEl);
    console.log('show all tasks');
});

activeButton.addEventListener('click', (e) => {
   const targetEl = e.target;
    const activeTasks = listArr.filter((task) => task.status === false);
    Task.showActive(activeTasks);
    Task.addActiveColor(targetEl);
    // console.log('Show active tasks ▶');
});

clearButton.addEventListener('click', () => {
    listArr = listArr.filter(task => !task.status); 
    Task.setLocalStorage();
    Task.updateCounter();
    Task.addTasks(); 
    // console.log('Clear completed tasks');
    
});

 });
