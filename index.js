let arrTasks = [];
let inputEl = document.getElementById("input-task");
let inputElDate = document.getElementById("input-date");
let containerTaskEl = document.getElementById("container-task");
let buttonAddEl = document.getElementById("btn-add");
let buttonxEl = document.getElementById("btn-filterCompleted");
let buttonyEl = document.getElementById("btn-filterIncompleted");
let buttonAll = document.getElementById("btn-filterAll");

function addTask() {
    if (inputEl.value === '') {
        alert("You should write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputElDate.value + "  " + inputEl.value;
        containerTaskEl.appendChild(li);

        let img= document.createElement("img");
        img.src ="./edit-info.png";
        li.appendChild(img);

        let span= document.createElement("span");
        span.innerHTML = "\u00D7";
        li.appendChild(span);

        arrTasks.push(li); // Guardamos el elemento <li> en lugar de su innerHTML
        inputEl.value = "";
    }
}

    containerTaskEl.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
        } else if (e.target.tagName === "SPAN") {
            const listItem = e.target.parentElement;
            const index = arrTasks.indexOf(listItem);
            if (index !== -1) {
                arrTasks.splice(index,1);
            }
            listItem.remove();
            
        } else if (e.target.tagName ==="IMG"){
            editTask(e.target.parentElement);
        }
    }, false);

    function editTask(li) {
        // Verificar si el elemento LI ya tiene la clase "editing"
        const isEditing = li.classList.contains("editing");

        // Si no está en modo de edición, agregar la clase "editing"
        if (!isEditing) {
            li.classList.add("editing");

            
            const originalContent = li.innerHTML;

            // Crear un campo de entrada para la edición y configurarlo con el texto actual
            const inputElement = document.createElement("input");
            inputElement.type = "text";
            inputElement.value = li.textContent;

            // Limpiar el contenido actual del LI
            li.innerHTML = "";

            // Agregar el campo de entrada al LI
            li.appendChild(inputElement);

            // Enfocar el campo de entrada
            inputElement.focus();

            // Agregar un evento de cambio al campo de entrada para guardar los cambios
            inputElement.addEventListener("blur", function () {
                // Al perder el foco, guardar el valor del campo de entrada en el texto del LI
                const editedValue = inputElement.value;

                // Restaurar el contenido original, incluyendo cualquier otro elemento que pueda haber
                li.innerHTML = originalContent;

                // Agregar el valor editado al LI sin afectar el contenido original
                li.textContent = editedValue;


                let img= document.createElement("img");
                img.src ="./edit-info.png"
                li.appendChild(img);
                let span= document.createElement("span");
                span.innerHTML = "\u00D7";
                li.appendChild(span);

                    // Quitar la clase "editing" para salir del modo de edición
                    li.classList.remove("editing");
            });
        }
    }

buttonxEl.addEventListener("click", function () {
    showCompletedTask();
});

function showCompletedTask() {
    let activeTask = [];

    for (let i = 0; i < arrTasks.length; i++) {
        let task = arrTasks[i];

        // Verifica si el elemento <li> tiene la clase "checked"
        if (task.classList.contains("checked")) {
            // Si es así,  agrego al array activeTask
            activeTask.push(task);
            task.classList.add("completed-style"); // Agrega la clase "completed-style" al elemento
        }
    }
    // Actualiza el contenido de containerTaskEl con las tareas activas
    containerTaskEl.innerHTML = ""; // Limpia el contenido actual

    // Agrega las tareas activas al contenedor (llamando al array poniendole for each) y aplica el estilo
    activeTask.forEach(function(task) {
    containerTaskEl.appendChild(task);
    });

    // Puede hacer algo con el array activeTask si es necesario
    console.log(activeTask);
}

buttonyEl.addEventListener("click", function() {
    showIncompletedTask();

});

function showIncompletedTask() {
    let inactiveTask = [];

    for (let i=0; i < arrTasks.length ; i ++ ){
        let inactTask = arrTasks[i]

        if(!inactTask.classList.contains("checked")) {
            inactiveTask.push(inactTask);
        }
    }
    containerTaskEl.innerHTML ="";

    inactiveTask.forEach(function(inactTask){
        containerTaskEl.appendChild(inactTask);
    });
}

buttonAll.addEventListener("click", function() {
    showAllTask();
});

function showAllTask() {
    containerTaskEl.innerHTML = "";
    for(let i=0; i < arrTasks.length ; i++){
        let currentTask = arrTasks[i];
        containerTaskEl.appendChild(currentTask);
    }
}


