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
    data.date = dateData;
    data.text = textareaData;

    return data;
  }
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
    <i class="icon modify-task-btn fa-solid fa-pen-to-square"></i>
    <i class="icon delete-task-btn fa-solid fa-trash-can"></i>
  </article>
  `;
  tasksSectionEl.insertAdjacentHTML('beforeend', markup);
};

const deleteTask = () => {
  tasksSectionEl.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-task-btn')) {
      const task = document.querySelector('.task');
      task.remove();
    }
  });
};

const init = () => {
  deleteTask();
};

init();
