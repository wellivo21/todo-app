// element selectors
const modalTitleInputEl = document.querySelector('.modal-title-input');
const modalDateInputEl = document.querySelector('.modal-date-input');
const modalTextareaEl = document.querySelector('.modal-textarea');
const submitTaskBtnEl = document.querySelector('.submit-task-btn');
const modifyTaskBtnEl = document.querySelector('.modify-task-btn');
const deleteTaskBtnEl = document.querySelector('.delete-task-btn');
const taskFormEl = document.querySelector('.task-form');
const titleErrorMsgEl = document.querySelector('.title-error-msg');
const dateErrorMsgEl = document.querySelector('.date-error-msg');
const textErrorMsgEl = document.querySelector('.text-error-msg');
const tasksSectionEl = document.querySelector('.tasks-section');
const modalEl = document.querySelector('#taskModal');

// event listeners
taskFormEl.addEventListener('submit', (event) => {
  event.preventDefault();
  createTask();
});

const formValidation = () => {
  const titleData = modalTitleInputEl.value;
  const dateData = modalDateInputEl.value;
  const textareaData = modalTextareaEl.value;

  !titleData
    ? (titleErrorMsgEl.innerHTML = 'Please type in a title')
    : (titleErrorMsgEl.innerHTML = '');

  !dateData
    ? (dateErrorMsgEl.innerHTML = 'Please set a date')
    : (dateErrorMsgEl.innerHTML = '');

  !textareaData
    ? (textErrorMsgEl.innerHTML = 'Please type in a text')
    : (textErrorMsgEl.innerHTML = '');

  if (titleData && dateData && textareaData) {
    const data = {
      title: '',
      date: '',
      text: '',
    };
    data.title = titleData;
    data.text = textareaData;

    // separating date to format in day/month/year
    const dateParts = dateData.split('-');
    const [year, month, day] = dateParts;
    data.date = `${day}-${month}-${year}`;

    return data;
  }

  return false;
};

const createTask = () => {
  if (!formValidation()) return;

  const { title, date, text } = formValidation();
  const markup = `
  <article class="task">
    <h3 class="task-title">${title}</h3>
    <p class="task-date">${date}</p>
    <p class="task-text">
      ${text}
    </p>
    <i class="icon modify-task-btn fa-solid fa-pen-to-square" data-toggle="modal"
    data-target="#taskModal"></i>
    <i class="icon delete-task-btn fa-solid fa-trash-can"></i>
  </article>
  `;
  tasksSectionEl.insertAdjacentHTML('beforeend', markup);

  // hiding modal
  $('.modal').modal('hide');

  // reseting inputs
  modalTitleInputEl.value = '';
  modalDateInputEl.value = '';
  modalTextareaEl.value = '';
};

const modifyTask = () => {
  tasksSectionEl.addEventListener('click', (event) => {
    if (event.target.classList.contains('modify-task-btn')) {
      const clickedTask = event.target.closest('.task');

      const currentTaskTitle =
        clickedTask.querySelector('.task-title').innerHTML;
      const currentTaskDate = clickedTask.querySelector('.task-date').innerHTML;
      const currentTaskText = clickedTask.querySelector('.task-text').innerHTML;

      modalTitleInputEl.value = currentTaskTitle;
      modalTextareaEl.value = currentTaskText.trim();

      // code for preseting date on date input field
      const currentTaskDateParts = currentTaskDate.split('-');
      const [day, month, year] = currentTaskDateParts;
      const currentDateObj = new Date(year, month - 1, day);
      modalDateInputEl.value = currentDateObj.toISOString().substring(0, 10);

      // when submit button is clicked, remove task and replace it by the new one
      if (formValidation) {
        submitTaskBtnEl.addEventListener('click', () => {
          clickedTask.remove();
        });
      }
    }
  });
};

const deleteTask = () => {
  tasksSectionEl.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-task-btn')) {
      const currentTask = event.target.closest('.task');
      currentTask.remove();
    }
  });
};

const init = () => {
  deleteTask();
  modifyTask();
};

init();
