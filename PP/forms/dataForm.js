let rawData = [
  {
    id: 1,
    name: "Marcelo",
    lastname: "Luque",
    age: 45,
    title: "Ingeniero",
    university: "UTN",
    graduated: 2002,
  },
  {
    id: 2,
    name: "Ramiro",
    lastname: "Escobar",
    age: 35,
    title: "Medico",
    university: "UBA",
    graduated: 20012,
  },
  {
    id: 3,
    name: "Facundo",
    lastname: "Cairo",
    age: 30,
    title: "Abogado",
    university: "UCA",
    graduated: 2017,
  },
  {
    id: 4,
    name: "Fernando",
    lastname: "Nieto",
    age: 18,
    team: "Independiente",
    position: "Delantero",
    goals: 7,
  },
  {
    id: 5,
    name: "Manuel",
    lastname: "Loza",
    age: 20,
    team: "Racing",
    position: "Volante",
    goals: 2,
  },
  {
    id: 6,
    name: "Nicolas",
    lastname: "Serrano",
    age: 23,
    team: "Boca",
    position: "Arquero",
    goals: 1,
  },
];

class Person {
  constructor(id, name, lastname, age) {
    if (!id) {
      throw new Error("ID is mandatory");
    }
    if (!name) {
      throw new Error("Name is mandatory");
    }
    if (!lastname) {
      throw new Error("Lastname is mandatory");
    }
    if (!age) {
      throw new Error("Age is mandatory");
    }
    if (age < 15) {
      throw new Error("Age should be above 15");
    }
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.age = parseInt(age);
  }
}

class SoccerPlayer extends Person {
  constructor(id, name, lastname, age, team, position, goals) {
    super(id, name, lastname, age);
    if (!team || !position) {
      throw new Error("Invalid SoccerPlayer. ");
    }
    if (goals <= -1) {
      throw new Error("Goals should be more than -1");
    }
    this.team = team;
    this.position = position;
    this.goals = goals;
  }
}

class Professional extends Person {
  constructor(id, name, lastname, age, title, university, graduated) {
    super(id, name, lastname, age);
    if (!title || !university) {
      throw new Error("Invalid professional");
    }
    if (graduated < 1950) {
      throw new Error("Graduated date should be above 1950");
    }
    this.title = title;
    this.university = university;
    this.graduated = graduated;
  }
}

let data = rawData.map((item) => {
  if (item.title) {
    return new Professional(
      item.id,
      item.name,
      item.lastname,
      item.age,
      item.title,
      item.university,
      item.graduated
    );
  } else if (item.team) {
    return new SoccerPlayer(
      item.id,
      item.name,
      item.lastname,
      item.age,
      item.team,
      item.position,
      item.goals
    );
  } else {
    return new Person(item.id, item.name, item.lastname, item.age);
  }
});

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
const teamCheckbox = document.getElementById("team-checkbox");
const positionCheckbox = document.getElementById("position-checkbox");
const goalsCheckbox = document.getElementById("goals-checkbox");
const titleCheckbox = document.getElementById("title-checkbox");
const universityCheckbox = document.getElementById("university-checkbox");
const graduatedCheckbox = document.getElementById("graduated-checkbox");
const addButton = document.getElementById("add-btn");
const editButton = document.getElementById("edit-btn");
const cancelButton = document.getElementById("cancel-btn");
const deleteButton = document.getElementById("delete-btn");
const idInputContainer = document.getElementById("abm-id-container");
const nameInputContainer = document.getElementById("abm-name-container");
const lastnameInputContainer = document.getElementById(
  "abm-lastname-container"
);
const typeInputContainer = document.getElementById("abm-type-container");
const ageInputContainer = document.getElementById("abm-age-container");
const teamInputContainer = document.getElementById("abm-team-container");
const positionInputContainer = document.getElementById(
  "abm-position-container"
);
const goalsInputContainer = document.getElementById("abm-goals-container");
const titleInputContainer = document.getElementById("abm-title-container");
const universityInputContainer = document.getElementById(
  "abm-university-container"
);
const graduatedInputContainer = document.getElementById(
  "abm-graduated-container"
);
const idInput = document.getElementById("abm-id");
const nameInput = document.getElementById("abm-name");
const lastnameInput = document.getElementById("abm-lastname");
const typeSelect = document.getElementById("abm-type");
const ageInput = document.getElementById("abm-age");
const teamInput = document.getElementById("abm-team");
const positionInput = document.getElementById("abm-position");
const goalsInput = document.getElementById("abm-goals");
const titleInput = document.getElementById("abm-title");
const universityInput = document.getElementById("abm-university");
const graduatedInput = document.getElementById("abm-graduated");

const createTableBody = (arr) => {
  tbody.innerHTML = "";
  arr.forEach((person) => {
    const tr = createPersonRow(person);
    tbody.appendChild(tr);
  });
};

const filterPersons = (filter) => {
  return (filteredList = data.filter((person) => {
    if (filter === "soccerPlayer") return person instanceof SoccerPlayer;
    if (filter === "professional") return person instanceof Professional;
    return true;
  }));
};

const filterPersonsAndCreateBody = () => {
  const filter = filterSelect.value;
  const filteredList = filterPersons(filter);
  console.log(filteredList);
  tbody.innerHTML = "";
  createTableBody(filteredList);
};

const calculateAverageAgeInFilteredPersons = () => {
  const filter = filterSelect.value;
  const filteredData = filterPersons(filter);
  console.log(filteredData);
  const ages = filteredData.reduce((accumulator, person) => {
    return accumulator + person.age;
  }, 0);
  const average = ages / filteredData.length;
  averageAge.innerHTML = average.toFixed(1);
};

const createPersonRow = (person) => {
  const tr = document.createElement("tr");
  const properties = [
    "id",
    "name",
    "lastname",
    "age",
    "team",
    "position",
    "goals",
    "title",
    "university",
    "graduated",
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
teamCheckbox.addEventListener("change", toggleColumns);
positionCheckbox.addEventListener("change", toggleColumns);
goalsCheckbox.addEventListener("change", toggleColumns);
titleCheckbox.addEventListener("change", toggleColumns);
universityCheckbox.addEventListener("change", toggleColumns);
graduatedCheckbox.addEventListener("change", toggleColumns);

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

const changeType = () => {
  const filter = typeSelect.value;
  if (filter === "") {
    teamInputContainer.style.display = "none";
    positionInputContainer.style.display = "none";
    goalsInputContainer.style.display = "none";
    titleInputContainer.style.display = "none";
    universityInputContainer.style.display = "none";
    graduatedInputContainer.style.display = "none";
  }
  if (filter === "soccerPlayer") {
    teamInputContainer.style.display = "block";
    positionInputContainer.style.display = "block";
    goalsInputContainer.style.display = "block";
    titleInputContainer.style.display = "none";
    universityInputContainer.style.display = "none";
    graduatedInputContainer.style.display = "none";
  }
  if (filter === "professional") {
    titleInputContainer.style.display = "block";
    universityInputContainer.style.display = "block";
    graduatedInputContainer.style.display = "block";
    teamInputContainer.style.display = "none";
    positionInputContainer.style.display = "none";
    goalsInputContainer.style.display = "none";
  }
};

const resetForm = () => {
  const inputs = [
    { container: idInputContainer, input: idInput },
    { container: nameInputContainer, input: nameInput },
    { container: lastnameInputContainer, input: lastnameInput },
    { container: ageInputContainer, input: ageInput },
    { container: typeInputContainer, input: typeSelect },
    { container: teamInputContainer, input: teamInput },
    { container: goalsInputContainer, input: goalsInput },
    { container: positionInputContainer, input: positionInput },
    { container: titleInputContainer, input: titleInput },
    { container: universityInputContainer, input: universityInput },
    { container: graduatedInputContainer, input: graduatedInput },
  ];

  inputs.forEach(({ container, input }) => {
    container.style.display = "none";
    input.value = "";
  });
};

const showABMForm = (selectedRow, type) => {
  const dataForm = document.getElementById("data-form");
  const abmForm = document.getElementById("abm-form");

  dataForm.style.display = "none";
  abmForm.style.display = "block";

  if (selectedRow) {
    resetForm();
    const id = selectedRow.querySelector("td:first-child").textContent;
    const name = selectedRow.querySelector("td:nth-child(2)").textContent;
    const lastname = selectedRow.querySelector("td:nth-child(3)").textContent;
    const age = selectedRow.querySelector("td:nth-child(4)").textContent;
    const team = selectedRow.querySelector("td:nth-child(5)").textContent;
    const position = selectedRow.querySelector("td:nth-child(6)").textContent;
    const goals = selectedRow.querySelector("td:nth-child(7)").textContent;
    const title = selectedRow.querySelector("td:nth-child(8)").textContent;
    const university = selectedRow.querySelector("td:nth-child(9)").textContent;
    const graduated = selectedRow.querySelector("td:nth-child(10)").textContent;

    idInputContainer.style.display = "block";
    idInput.disabled = true;
    nameInputContainer.style.display = "block";
    lastnameInputContainer.style.display = "block";
    ageInputContainer.style.display = "block";
    typeInputContainer.style.display = "block";
    addButton.style.display = "none";
    editButton.style.display = "flex";
    idInput.value = id;
    nameInput.value = name;
    lastnameInput.value = lastname;
    ageInput.value = age;
    if (team !== "") {
      typeSelect.value = "soccerPlayer";
      teamInputContainer.style.display = "block";
      positionInputContainer.style.display = "block";
      goalsInputContainer.style.display = "block";
      titleInputContainer.style.display = "none";
      universityInputContainer.style.display = "none";
      graduatedInputContainer.style.display = "none";
      teamInput.value = team;
      positionInput.value = position;
      goalsInput.value = goals;
      titleInput.value = "";
      universityInput.value = "";
      graduatedInput.value = "";
    } else {
      typeSelect.value = "professional";
      teamInputContainer.style.display = "none";
      positionInputContainer.style.display = "none";
      goalsInputContainer.style.display = "none";
      titleInputContainer.style.display = "block";
      universityInputContainer.style.display = "block";
      graduatedInputContainer.style.display = "block";
      titleInput.value = title;
      universityInput.value = university;
      graduatedInput.value = graduated;
    }
  }
  typeSelect.addEventListener("change", changeType);

  switch (type) {
    case "add":
      resetForm();
      idInputContainer.style.display = "block";
      idInput.disabled = true;
      nameInputContainer.style.display = "block";
      lastnameInputContainer.style.display = "block";
      ageInputContainer.style.display = "block";
      typeInputContainer.style.display = "block";
      addButton.style.display = "block";
      editButton.style.display = "none";
      deleteButton.style.display = "none";
      break;
    case "edit":
      resetForm();
      idInputContainer.style.display = "block";
      idInput.disabled = false;
      nameInputContainer.style.display = "block";
      lastnameInputContainer.style.display = "block";
      ageInputContainer.style.display = "block";
      typeInputContainer.style.display = "block";
      addButton.style.display = "none";
      editButton.style.display = "block";
      deleteButton.style.display = "none";
      break;
    case "delete":
      resetForm();
      idInputContainer.style.display = "block";
      idInput.disabled = false;
      addButton.style.display = "none";
      editButton.style.display = "none";
      deleteButton.style.display = "block";
      break;
    default:
      break;
  }
};

const handleABMForm = (event) => {
  event.preventDefault();

  const operation = event.target.getAttribute("data-operation");

  switch (operation) {
    case "add":
      const uniqueId = Math.floor(Math.random() * 100);
      if (typeSelect.value === "soccerPlayer") {
        let name = nameInput.value;
        let lastname = lastnameInput.value;
        let age = ageInput.value;
        let team = teamInput.value;
        let position = positionInput.value;
        let goals = goalsInput.value;
        const newSoccerPlayer = new SoccerPlayer(
          uniqueId,
          name,
          lastname,
          age,
          team,
          position,
          goals
        );
        data.push(newSoccerPlayer);
      }
      if (typeSelect.value === "professional") {
        let name = nameInput.value;
        let lastname = lastnameInput.value;
        let age = ageInput.value;
        let title = titleInput.value;
        let university = universityInput.value;
        let graduated = graduatedInput.value;
        const newProfessional = new Professional(
          uniqueId,
          name,
          lastname,
          age,
          title,
          university,
          graduated
        );
        data.push(newProfessional);
      }

      // add new person to the array of data
      createTableBody(data);
      break;

    case "edit":
      const id = parseInt(idInput.value);
      let modified = false;
      data = data.map((person) => {
        if (person.id === id) {
          modified = true;
          if (typeSelect.value === "soccerPlayer") {
            let name = nameInput.value;
            let lastname = lastnameInput.value;
            let age = ageInput.value;
            let team = teamInput.value;
            let position = positionInput.value;
            let goals = goalsInput.value;
            const newSoccerPlayer = new SoccerPlayer(
              person.id,
              name,
              lastname,
              age,
              team,
              position,
              goals
            );
            return newSoccerPlayer;
          }
          if (typeSelect.value === "professional") {
            let name = nameInput.value;
            let lastname = lastnameInput.value;
            let age = ageInput.value;
            let title = titleInput.value;
            let university = universityInput.value;
            let graduated = graduatedInput.value;
            const newProfessional = new Professional(
              person.id,
              name,
              lastname,
              age,
              title,
              university,
              graduated
            );
            return newProfessional;
          }
        } else {
          return person;
        }
      });
      if (!modified) {
        alert("No se encontró una persona con ese ID");
      } else {
        alert("Persona modificada");
      }
      createTableBody(data);
      break;

    case "delete":
      const deleteConfirmation = confirm(
        "Estás seguro que quieres eliminar a esta persona?"
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

    case "cancel":
      const cancelConfirmation = confirm(
        "¿Estás seguro que quieres cancelar la operación?"
      );
      if (cancelConfirmation) {
        createTableBody(data);
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

addButton.addEventListener("click", obtenerListaDesdeAPI);
editButton.addEventListener("click", handleABMForm);
deleteButton.addEventListener("click", handleABMForm);
cancelButton.addEventListener("click", handleABMForm);
