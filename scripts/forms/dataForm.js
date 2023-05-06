let data = [
  {
    id: 1,
    name: "Clark",
    lastname: "Kent",
    age: 45,
    alterEgo: "Superman",
    city: "Metropolis",
    published: 2002,
  },
  {
    id: 2,
    name: "Bruce",
    lastname: "Wayne",
    age: 35,
    alterEgo: "Batman",
    city: "Gotica",
    published: 20012,
  },
  {
    id: 3,
    name: "Bart",
    lastname: "Alen",
    age: 30,
    alterEgo: "Flash",
    city: "Central",
    published: 2017,
  },
  {
    id: 4,
    name: "Lex",
    lastname: "Luthor",
    age: 18,
    enemy: "Superman",
    robberies: 500,
    murders: 7,
  },
  {
    id: 5,
    name: "Harvey",
    lastname: "Dent",
    age: 20,
    enemy: "Batman",
    robberies: 750,
    murders: 2,
  },
  {
    id: 6,
    name: "Celina",
    lastname: "kyle",
    age: 23,
    enemy: "Batman",
    robberies: 25,
    murders: 1,
  },
];

const tbody = document.querySelector("#table");
const filterSelect = document.getElementById("filter-select");
const calculateBtn = document.getElementById("calculate-btn");
const headers = table.querySelectorAll("th");
const abmForm = document.getElementById("abm-form");
const averageAge = document.getElementById("average-age");
const idCheckbox = document.getElementById("id-checkbox");
const nameCheckbox = document.getElementById("name-checkbox");
const lastNameCheckbox = document.getElementById("lastname-checkbox");
const ageCheckbox = document.getElementById("age-checkbox");
const alterEgoCheckbox = document.getElementById("alterEgo-checkbox");
const cityCheckbox = document.getElementById("city-checkbox");
const publishedCheckbox = document.getElementById("published-checkbox");
const enemyCheckbox = document.getElementById("enemy-checkbox");
const robberiesCheckbox = document.getElementById("robberies-checkbox");
const murdersCheckbox = document.getElementById("murders-checkbox");
const addButton = document.getElementById("add-btn");
const editButton = document.getElementById("edit-btn");
const cancelButton = document.getElementById("cancel-btn");
const deleteButton = document.getElementById("delete-btn");

const createTableBody = (arr) => {
  tbody.innerHTML = "";
  arr.forEach((person) => {
    const tr = createPersonRow(person);
    tbody.appendChild(tr);
  });
};

const filterPersons = (filter) => {
  return (filteredList = data.filter((person) => {
    if (filter === "hero") return person.alterEgo;
    if (filter === "villain") return person.murders;
    return true;
  }));
};

const filterPersonsAndCreateBody = () => {
  const filter = filterSelect.value;
  const filteredList = filterPersons(filter);
  tbody.innerHTML = "";
  createTableBody(filteredList);
};

const calculateAverageAgeInFilteredPersons = () => {
  const filter = filterSelect.value;
  const filteredData = filterPersons(filter);
  const ages = filteredData.reduce((accumulator, person) => {
    return accumulator + person.age;
  }, 0);
  const average = ages / filteredData.length;
  averageAge.innerHTML = average;
};

const createPersonRow = (person) => {
  const tr = document.createElement("tr");
  const properties = [
    "id",
    "name",
    "lastname",
    "age",
    "alterEgo",
    "city",
    "published",
    "enemy",
    "robberies",
    "murders",
  ];
  for (const prop of properties) {
    const td = document.createElement("td");
    td.textContent = person[prop] || "";
    td.setAttribute("data-column", prop);
    tr.appendChild(td);
  }
  tr.addEventListener("dblclick", () => {
    showABMForm(tr);
  });
  return tr;
};

const toggleColumns = () => {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const columnsToShow = [];

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      columnsToShow.push(checkbox.id.replace("-checkbox", ""));
    }
  });

  const tableHeaders = document.querySelectorAll("th");
  const tableCells = document.querySelectorAll("td");

  tableHeaders.forEach((header) => {
    if (header.hasAttribute("data-column")) {
      const columnName = header.getAttribute("data-column");
      if (columnsToShow.includes(columnName)) {
        header.style.display = "";
      } else {
        header.style.display = "none";
      }
    }
  });

  tableCells.forEach((cell) => {
    if (cell.hasAttribute("data-column")) {
      const columnName = cell.getAttribute("data-column");
      if (columnsToShow.includes(columnName)) {
        cell.style.display = "";
      } else {
        cell.style.display = "none";
      }
    }
  });
};

idCheckbox.addEventListener("change", toggleColumns);
nameCheckbox.addEventListener("change", toggleColumns);
lastNameCheckbox.addEventListener("change", toggleColumns);
ageCheckbox.addEventListener("change", toggleColumns);
alterEgoCheckbox.addEventListener("change", toggleColumns);
cityCheckbox.addEventListener("change", toggleColumns);
publishedCheckbox.addEventListener("change", toggleColumns);
enemyCheckbox.addEventListener("change", toggleColumns);
robberiesCheckbox.addEventListener("change", toggleColumns);
murdersCheckbox.addEventListener("change", toggleColumns);

createTableBody(data);

filterSelect.addEventListener("change", filterPersonsAndCreateBody);

calculateBtn.addEventListener("click", calculateAverageAgeInFilteredPersons);

const tableHeaders = document.querySelectorAll("th[data-column]");

tableHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const columnName = header.getAttribute("data-column");
    const tableRows = document.querySelectorAll("tbody tr");

    const sortedRows = Array.from(tableRows).sort((a, b) => {
      const aValue = a
        .querySelector(`td[data-column="${columnName}"]`)
        .textContent.trim();
      const bValue = b
        .querySelector(`td[data-column="${columnName}"]`)
        .textContent.trim();
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });

    const sortedTable = sortedRows.reduce((acc, row) => {
      return acc + row.outerHTML;
    }, "");

    tbody.innerHTML = sortedTable;
  });
});

const showABMForm = (selectedRow) => {
  const dataForm = document.getElementById("data-form");
  const abmForm = document.getElementById("abm-form");

  if (selectedRow) {
    const id = selectedRow.querySelector("td:first-child").textContent;
  } else {
  }

  dataForm.style.display = "none";
  abmForm.style.display = "block";
};

const handleABMForm = (event) => {
  event.preventDefault();

  const idInput = document.getElementById("abm-id");
  const nameInput = document.getElementById("abm-name");
  const lastnameInput = document.getElementById("abm-lastname");
  const ageInput = document.getElementById("abm-age");
  const alterEgoInput = document.getElementById("abm-alterego");
  const cityInput = document.getElementById("abm-city");
  const publishedInput = document.getElementById("abm-published");
  const enemyInput = document.getElementById("abm-enemy");
  const robberiesInput = document.getElementById("abm-robberies");
  const murdersInput = document.getElementById("abm-murders");

  const operation = event.target.getAttribute("data-operation");
  let newPerson = {};

  switch (operation) {
    case "add":
      // generate unique id for new person

      const uniqueId = Math.floor(Math.random() * 100).toString();

      newPerson = {
        id: uniqueId,
        name: nameInput.value,
        lastname: lastnameInput.value,
        age: ageInput.value,
        alterEgo: alterEgoInput.value,
        city: cityInput.value,
        published: publishedInput.checked,
        enemy: enemyInput.checked,
        robberies: robberiesInput.value,
        murders: murdersInput.value,
      };

      // add new person to the array of data
      data.push(newPerson);
      createTableBody(data);
      break;

    case "edit":
      const id = parseInt(idInput.value);

      // find person in the array of data and update their properties
      data = data.map((person) => {
        if (person.id === id) {
          return {
            ...person,
            name: nameInput.value,
            lastname: lastnameInput.value,
            age: ageInput.value,
            alterEgo: alterEgoInput.value,
            city: cityInput.value,
            published: publishedInput.checked,
            enemy: enemyInput.checked,
            robberies: robberiesInput.value,
            murders: murdersInput.value,
          };
        } else {
          return person;
        }
      });
      break;

    case "delete":
      const deleteConfirmation = confirm(
        "Are you sure you want to delete this person?"
      );
      if (deleteConfirmation) {
        let id = parseInt(idInput.value);
        // remove person from array of data
        data = data.filter((person) => person.id !== id);
        createTableBody(data);
      } else {
        return;
      }
      break;

    default:
      return;
  }

  // hide ABM form and show data form
  const dataForm = document.getElementById("data-form");
  const abmForm = document.getElementById("abm-form");
  abmForm.style.display = "none";
  dataForm.style.display = "block";
};

addButton.addEventListener("click", handleABMForm);
editButton.addEventListener("click", handleABMForm);
deleteButton.addEventListener("click", handleABMForm);
cancelButton.addEventListener("click", handleABMForm);
