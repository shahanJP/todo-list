//Slect Elements
const clear = document.querySelector('.clear');   
const dateElement = document.getElementById('date');    
const addBtn = document.querySelector('.btn');
const input = document.getElementById('input'); 
const list = document.getElementById('list');  
 

//Classes Names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough"

//Variables
let LIST, id;

// get item from local storage
let data = localStorage.getItem("TODO");
if (data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST)
}
else{
    LIST = [];
    id = 0;
}

//load item

function loadList(array){
    array.forEach((item)=>{
        addToDo(item.name, item.id, item.done, item.trash)
        
    });
}

//clear localStorage
        clear.addEventListener("click", ()=>{
            localStorage.clear();
            location.reload();
        })
//date
const options = {weekday: "long", month: "short" , day:"numeric"};
const today = new Date();

dateElement.innerText = today.toLocaleDateString("en-US", options)

// add an item

addBtn.addEventListener("click", (event)=>{
   //if(event.keyCode == 13){
         const toDo = input.value;
        if(toDo){
                 addToDo(toDo, id, false, false);
    LIST.push({
        name:toDo,
        id: id,
        done: false,
        trash:false
    });
    localStorage.setItem("TODO" , JSON.stringify(LIST));
    id++;
   
        }
        input.value = "";
    //}
})



function addToDo(toDo, id, done, trash){
    if (trash){
        return 
    }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

const item = ` <li class = "item">
<i class=" fa ${DONE} co"  job="complete" id="${id}"></i>
<p class="text ${LINE}">${toDo} </p>
<i class=" fa fa-trash-o  de"  job="delete" id="${id}"></i>
</li> `

const position = "beforeend";
        list.insertAdjacentHTML(position, item)           
        
        
}   

//Complete Add list

const completeToDo = (element)=>{
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

const removeToDo = (element)=>{
    
    element.parentNode.parentNode.removeChild(element.parentNode)
  
    LIST[element.id].trash = true;
  }


  list.addEventListener('click', (event)=>{
    const element = event.target;
    const elementJob = element.attributes.job.value;
    
    if(elementJob == "complete"){
        completeToDo(element);

    }
    else if (elementJob == "delete"){
        removeToDo(element)
    }
    localStorage.setItem("TODO" , JSON.stringify(LIST))

  })
        
        
        