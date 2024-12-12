'use strict'
const taskField = document.getElementById('add-task');

class Task {
      
    static printMessage(message){
        console.log(`You added ${message}`)

    }

   
    static handleInput(taskField, e){
        if  (e.key === 'Enter' && taskField.value.trim() !== ''){
            Task.printMessage(taskField.value);
            taskField.value = ''
        }
    }

    
}

taskField.addEventListener('keydown', (e) => Task.handleInput(taskField, e))



// Can add to separate ManagerClass using method
// Can use a static method in Task class
// taskField.addEventListener('keydown', (e) => {
//     if(e.key === 'Enter'){
//         console.log('Entered');
//         console.log(taskField.value)

//     }
// })
