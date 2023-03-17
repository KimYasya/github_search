"use strict"


// Переменные
const container = document.querySelector(".container");
const errorInput = document.querySelector(".search__error");
const input = document.querySelector(".search__input");
const searchBtn = document.querySelector(".search__btn");


// Выполняем поиск
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  getRequest(input.value);
});
input.addEventListener("input", (event) => validateInput(event.target.value));
input.onfocus = () => errorInput.classList.remove("active");

// Валидация
let validate = false;

function validateInput(value) {
  value.length < 3
    ? (errorInput.classList.add("active"), (validate = false))
    : (errorInput.classList.remove("active"), (validate = true));
}

// Создаем список репозиториев по ответу
function responseList(array) {
  if (validate) {
    if (array.length < 1) {
      let item = document.createElement("div");
      item.innerHTML = ` 
          <div class="response">
            <p class="response__info">Ничего не найдено</p>
          </div>`;
      container.append(item);
    } else {
      array.map((obj, _) => {
        let item = document.createElement("div");
        item.innerHTML = ` 
            <div class="response">
              <div class="response__list">
                <span style="color: #3D4F9F">&#10004;</span>

                <div class="response__item">
                  <p class="response__info">Репозиторий:
                  <a class="response__link" target="_blank" href="${obj.html_url}"><span>${obj.name}</span></a>
                  </p>
                </div>
                
                <div class="response__item">
                  <p class="response__info">Владелец: <span class="owner">${obj.owner.login}</span></p>
                </div>

                <div class="response__item">
                  <p class="response__info">Описание: <em><span class="description">${obj.description}</span></em></p>
                </div>
              </div>
            </div>`;
        container.append(item);
      });
    }
  } else {
    errorInput.classList.add("active");
  }
}

// Запрос GitHub
async function request(search) {
  try {
    const getReps = await fetch(
      `https://api.github.com/search/repositories?per_page=10&q=${search}`
    );
    let response = await getReps.json();

    responseList(response.items);
  } catch (err) {
    alert("Что-то пошло не так, попробуйте позже");
  }
}

function getRequest(value) {
  let search = value;
  request(search);
  const item = [...document.querySelectorAll("item")];
  if (validate
  ) {
    item.map((obj, _) => {
      obj.remove();
    });
  }
}
