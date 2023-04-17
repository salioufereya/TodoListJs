const btnPlus = document.querySelector(".btn-plus")
const modal = document.querySelector(".modal-container")
const closed = document.querySelector(".close")
const saved = document.querySelector(".save")
const titre = document.querySelector(".titre")
const descript = document.querySelector(".descript")
const taskContainer = document.querySelector(".task-container")
const colors = document.querySelectorAll('.color-container .color')

const details = document.querySelector('.details')
const addNewTask = document.querySelector('#add-new-task')
const addTaskBtn = document.querySelector('.add-task-btn')
const tasksBody = document.querySelector(".tasks")

const sortSelect = document.querySelector(".sortSelect");
const tasks = [
    {
        id: 1,
        title: 'Le projet Gestion des étudiants',
        date: '2022-03-13',
        dateEcheance: '2022-03-10',
        time: 8,
        steps: [
            {
                taskName: "Faire une formulaire d'ajout de clients",
                completed: false
            },
            {
                taskName: "Faire un input permettant de rechercher un client",
                completed: false

            }
        ],
        completed: false,
        status: false
    },

    {
        id: 2,
        title: 'Le projet Gestion des profs',
        date: '2022-03-12',
        dateEcheance: '2022-03-09',
        time: 8,
        steps: [
            {
                taskName: "Faire une formulaire d'ajout de clients",
                completed: false
            },
            {
                taskName: "Faire un input permettant de rechercher un client",
                completed: false

            }
        ],
        completed: false,
        status: true
    },

    {
        id: 3,
        title: 'Le projet Gestion des vigiles',
        date: '2022-03-05',
        dateEcheance: '2022-03-29',
        time: 8,
        steps: [
            {
                taskName: "Faire une formulaire d'ajout de clients",
                completed: false
            },
            {
                taskName: "Faire un input permettant de rechercher un client",
                completed: false

            }
        ],
        completed: false,
        status: true
    },
    {
        id: 4,
        title: 'Le projet Gestion des directeurs',
        date: '2022-03-09',
        dateEcheance: '2022-03-25',
        time: 8,
        steps: [
            {
                taskName: "Faire une formulaire d'ajout de clients",
                completed: false
            },
            {
                taskName: "Faire un input permettant de rechercher un client",
                completed: false

            }
        ],
        completed: false,
        status: false
    },
]



// Fonction pour afficher les tâches dans l'interface utilisateur
function displayTasks(tasks) {
    tasksBody.innerHTML = ""
    tasks.forEach((task) => {
        const taskItem = document.createElement("div");
        taskItem.setAttribute("class", "task-item");
        taskItem.innerHTML = `
      <div class="task"> 
      <i class="fa-regular fa-circle" title="Marquer une tàche comme terminée"></i>
                              <div class="task-title">
                                    <h3 class="task-name">${task.title}</h3>
                                    <div class="detail">
                                        <span>Tâches</span>
                                        <span>.</span>
                                        <span>0 sur 4</span>     
                                    </div>
                                </div>
                            </div>
                            <span class="material-symbols-outlined">
                            grade
                        </span>
      `
        tasksBody.appendChild(taskItem)
    });
}

displayTasks(tasks);

//functions qui permettents les tries

sortSelect.addEventListener("change", () => {
    const selectedSort = sortSelect.value;
    if (selectedSort === "dateCreation") {
        tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
   else if (selectedSort === "dateEchea") {
        tasks.sort((a, b) => new Date(a.dateEcheance) - new Date(b.dateEcheance));
    }
    else if (selectedSort === "title") {
        tasks.sort((a, b) => a.title.localeCompare(b.title));
    } else if(selectedSort==="ordre"){
        tasks.sort((a, b) => (b.status) - (a.status));
    }
    
    else {
        tasks.sort((a, b) => a.id - b.id);
    }
    displayTasks(tasks);
});














addNewTask.addEventListener('focus', () => {
    details.style.display = 'flex'
})

addNewTask.addEventListener('input', function () {
    if (this.value == '') {
        addTaskBtn.setAttribute('disabled', true)
    } else {
        addTaskBtn.removeAttribute('disabled')
    }
})

addTaskBtn.addEventListener('click', () => {
    details.style.display = 'none'
})

btnPlus.addEventListener("click", openModal)
closed.addEventListener("click", closeModal)

function closeModal() {
    modal.style.display = "none"
}

function openModal() {
    modal.style.display = "flex"
}

saved.addEventListener("click", () => {
    let titleValue = titre.value
    let descriptValue = descript.value

    const task = createTask(titleValue, descriptValue)
    taskContainer.appendChild(task)

})

/**
 * 
 * @param {string} tagName 
 * @param {*} attributs 
 * @param {*} elementContent 
 * @returns 
 */

function createElement(tagName, attributs, elementContent) {
    const element = document.createElement(tagName);
    for (const cle in attributs) {
        element.setAttribute(cle, attributs[cle]);
    }
    element.textContent = elementContent;
    return element;
}

function createTask(title, descriptions) {
    const taskItem = createElement('div', { class: 'task-item' })
    const taskTitle = createElement('div', { class: 'task-title' }, title)
    const taskContent = createElement('div', { class: 'task-content' }, descriptions)
    const taskFooter = createElement('div', { class: 'task-footer' })
    const date = createElement('div', { class: 'date' }, new Date().toLocaleDateString())
    const detailIcon = createElement('div', { class: 'detail-icon' })
    const editIcon = createElement('i', { class: 'fa-regular fa-pen-to-square' })
    const checkIcon = createElement('i', { class: 'fa-regular fa-circle' })

    taskItem.appendChild(taskTitle);
    taskItem.appendChild(taskContent);
    taskFooter.appendChild(date);
    taskFooter.appendChild(detailIcon);
    detailIcon.appendChild(editIcon);
    detailIcon.appendChild(checkIcon);
    taskItem.appendChild(taskFooter);

    listenerEvenement(editIcon, checkIcon)
    return taskItem
}

function listenerEvenement(editIcon, checkIcon) {
    checkIcon.addEventListener("click", () => {
        toggleCheckIcon(checkIcon)
    })
}

function toggleCheckIcon(checkIcon) {
    if (checkIcon.classList.contains("fa-regular", "fa-circle")) {
        checkIcon.classList.remove('fa-regular', 'fa-circle')
        checkIcon.classList.add('fa-solid', 'fa-circle-check')
        checkIcon.classList.add('checked')
    } else {
        checkIcon.classList.remove('fa-solid', 'fa-circle-check')
        checkIcon.classList.add('fa-regular', 'fa-circle')
        checkIcon.classList.remove('checked')
    }
}

for (const color of colors) {
    color.addEventListener('click', () => {
        const tasks = document.querySelectorAll('.task-item')
        for (const task of tasks) {
            let checkIcon = task.querySelector('.task-footer .detail-icon .checked')
            if (checkIcon != null) {
                task.style.backgroundColor = getComputedStyle(color).getPropertyValue('background-color')
            }
        }
    })
}