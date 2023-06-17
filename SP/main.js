class Vehiculo {
  constructor(id, modelo, anoFab, velMax) {
    if (!id) {
      throw new Error("ID es obligatorio");
    }
    if (!modelo) {
      throw new Error("Modelo es obligatorio");
    }
    if (!anoFab) {
      throw new Error("Año fabricado es obligatorio");
    }
    if (!velMax) {
      throw new Error("Velocidad máxima es obligatoria");
    }
    if (anoFab <= 1885) {
      throw new Error("El año fabricado debe ser mayor a 1885");
    }
    if (velMax < 0) {
      throw new Error("La velocidad máxima debe ser mayor a 0");
    }
    this.id = id;
    this.model = model;
    this.anoFab = anoFab;
    this.velMax = parseInt(velMax);
  }
}

class Aereo extends Vehiculo {
  constructor(id, modelo, anoFab, velMax, altMax, autonomia) {
    super(id, modelo, anoFab, velMax);
    if (!altMax || !autonomia) {
      throw new Error("Vehículo aereo inválido. ");
    }
    if (altMax <= 0 || autonomia <= 0) {
      throw new Error("La altura máxima y la autonomía deben ser mayores a 0");
    }
    this.altMax = altMax;
    this.autonomia = autonomia;
  }
}

class Terrestre extends Vehiculo {
  constructor(id, modelo, anoFab, velMax, cantPue, cantRue) {
    super(id, modelo, anoFab, velMax);
    if (!altMax || !autonomia) {
      throw new Error("Vehículo aereo inválido. ");
    }
    if (cantPue <= -1) {
      throw new Error(
        "El número de puertas no puede ser menor o igual que menos uno."
      );
    }
    if (cantRue <= 0) {
      throw new Error("La cantidad de ruedas debe ser mayor a 0");
    }
    this.altMax = altMax;
    this.autonomia = autonomia;
  }
}

function $(id) {
  return document.getElementById(id);
}

const form = $("form_datos");
const table = $("tabla_datos");
const tbody = $("tbody");
const addBtn = $("btnAgregar");
const editBtn = $("btnEditar");
const cancelBtn = $("btnCancelar");
const acceptBtn = $("btnAceptar");
const modifyBtn = $("btnModificarAceptar");
const deleteBtn = $("btnEliminarAceptar");
const filterType = $("selecTipo");
const divSpinner = $("spinner-container");

//ABM Variables
const formABM = $("formABM");
const idAbm = $("abm-id");
const modelAbm = $("abm-modelo");
const yearAbm = $("abm-anoFab");
const maxVelAbm = $("abm-velMax");
const doorsAbm = $("abm-cantPue");
const wheelsAbm = $("abm-cantRue");
const heightAbm = $("abm-altMax");
const autonomyAbm = $("abm-autonomia");
const abmContainerTer = $("abm-container-ter");
const abmContainerAer = $("abm-container-aer");

var vehicleList = [];
document.addEventListener("DOMContentLoaded", function () {
  fetchData();
});

const createTableBody = (arr) => {
  tbody.innerHTML = "";
  arr.forEach((person) => {
    const tr = createVehicleRow(person);
    tbody.appendChild(tr);
  });
};

const setSpinner = () => {
  divSpinner.style.display = "flex";
  form.style.display = "none";
  formABM.style.display = "none";
  addBtn.style.display = "none";
};

const hideSpinner = (form) => {
  divSpinner.style.display = "none";
  form.style.display = "block";
  addBtn.style.display = "block";
};

const createVehicleRow = (vehicle) => {
  const tr = document.createElement("tr");
  const properties = [
    "id",
    "modelo",
    "anoFab",
    "velMax",
    "cantPue",
    "cantRue",
    "altMax",
    "autonomia",
  ];
  for (const prop of properties) {
    const td = document.createElement("td");
    td.textContent = vehicle[prop] || "N/A";
    td.setAttribute("data-column", prop);
    tr.appendChild(td);
  }
  // Botón de Modificar
  const tdModificar = document.createElement("td");
  const btnModificar = document.createElement("button");
  btnModificar.textContent = "Modificar";
  btnModificar.addEventListener("click", (e) => {
    // Lógica para modificar el item
    e.preventDefault();
    showABMForm("edit");
    idAbm.value = vehicle.id;
    console.log("Modificar", vehicle);
  });
  tdModificar.appendChild(btnModificar);
  tr.appendChild(tdModificar);

  // Botón de Eliminar
  const tdEliminar = document.createElement("td");
  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.addEventListener("click", async (e) => {
    // Lógica para eliminar el item
    e.preventDefault();
    await deleteElement(vehicle.id);
    createTableBody(vehicleList);
  });
  tdEliminar.appendChild(btnEliminar);
  tr.appendChild(tdEliminar);
  return tr;
};

function showABMForm(action) {
  resetForm();
  if (action === "add") {
    formABM.style.display = "block";
    addBtn.style.display = "none";
    form.style.display = "none";
    idAbm.disabled = true;
    editBtn.style.display = "none";
    acceptBtn.style.display = "block";
  }
  if (action === "edit") {
    formABM.style.display = "block";
    addBtn.style.display = "none";
    form.style.display = "none";
    editBtn.style.display = "block";
    acceptBtn.style.display = "none";
    idAbm.disabled = true;
  }
}

function hideABMForm() {
  formABM.style.display = "none";
  form.style.display = "block";
  addBtn.style.display = "block";
  createTableBody(vehicleList);
  console.log(vehicleList);
}

const changeType = () => {
  const filter = filterType.value;
  if (filter === "vehiculo") {
    abmContainerAer.style.display = "none";
    abmContainerTer.style.display = "none";
  }
  if (filter === "aereo") {
    abmContainerAer.style.display = "block";
    abmContainerTer.style.display = "none";
  }
  if (filter === "terrestre") {
    abmContainerAer.style.display = "none";
    abmContainerTer.style.display = "block";
  }
};

function fetchData() {
  setSpinner();
  fetch("http://localhost/Lab-3/VehiculoAereoTerrestre.php", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error en la respuesta de la solicitud");
      }
    })
    .then((data) => {
      if (data.length > 0) {
        console.log(data);
        vehicleList = data;
        createTableBody(data);
      } else {
        console.log("No hay vehículos");
      }
    })
    .catch((e) => console.error(e))
    .finally(() => {
      hideSpinner(form);
    });
}

function registerVehicle() {
  const valid = validateForm();
  if (!valid) return;
  let element = {};
  if (filterType.value === "aereo") {
    element = {
      modelo: modelAbm.value,
      anoFab: yearAbm.value,
      velMax: maxVelAbm.value,
      altMax: heightAbm.value,
      autonomia: autonomyAbm.value,
    };
  }
  if (filterType.value === "terrestre") {
    element = {
      modelo: modelAbm.value,
      anoFab: yearAbm.value,
      velMax: maxVelAbm.value,
      cantPue: doorsAbm.value,
      cantRue: wheelsAbm.value,
    };
  }
  if (filterType.value === "vehiculo") {
    element = {
      modelo: modelAbm.value,
      anoFab: yearAbm.value,
      velMax: maxVelAbm.value,
    };
  }
  const jsonElement = JSON.stringify(element);
  const xhr = new XMLHttpRequest();
  setSpinner();
  xhr.open("PUT", "http://localhost/Lab-3/VehiculoAereoTerrestre.php", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    hideSpinner(form);

    if (xhr.status >= 200 && xhr.status < 400) {
      const response = JSON.parse(xhr.responseText);
      element.id = response.id;
      vehicleList.push(element);
      hideABMForm();
    } else {
      throw new Error("Error al realizar el alta");
    }
  };

  xhr.onerror = function () {
    alert("Error al realizar el alta");
    hideABMForm();
  };

  xhr.send(jsonElement);
}

async function editElement() {
  // Construir el objeto a enviar al servidor
  let object = {
    id: idAbm.value,
    modelo: modelAbm.value,
    anoFab: yearAbm.value,
    velMax: maxVelAbm.value,
  };
  if (filterType.value == "aereo") {
    object = {
      id: idAbm.value,
      modelo: modelAbm.value,
      anoFab: yearAbm.value,
      velMax: maxVelAbm.value,
      altMax: heightAbm.value,
      autonomia: autonomyAbm.value,
    };
  }
  if (selecTipo.value == "terrestre") {
    object = {
      id: idAbm.value,
      modelo: modelAbm.value,
      anoFab: yearAbm.value,
      velMax: maxVelAbm.value,
      cantPue: doorsAbm.value,
      cantRue: wheelsAbm.value,
    };
  }
  const index = vehicleList.findIndex(
    (vehicle) => vehicle.id === parseInt(idAbm.value)
  );

  try {
    setSpinner();
    const response = await fetch(
      "http://localhost/Lab-3/VehiculoAereoTerrestre.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      }
    );
    if (response.ok) {
      vehicleList[index].modelo = object.modelo;
      vehicleList[index].anoFab = object.anoFab;
      vehicleList[index].velMax = object.velMax;

      if (vehicleList[index] instanceof Aereo) {
        vehicleList[index].altMax = heightAbm.value;
        vehicleList[index].autonomia = autonomyAbm.value;
      }
      if (vehicleList[index] instanceof Terrestre) {
        vehicleList[index].cantPue = doorsAbm.value;
        vehicleList[index].cantRue = wheelsAbm.value;
      }
      hideABMForm();
    } else {
      throw new Error("Error al realizar la modificación");
    }
  } catch (error) {
    alert("Error al realizar la modificación: " + error.message);

    hideABMForm();
  }
  hideSpinner(form);
}

async function deleteElement(id) {
  const index = vehicleList.findIndex((vehicle) => vehicle.id === id);
  const object = { id: parseInt(id) };
  try {
    setSpinner();
    const response = await fetch(
      "http://localhost/Lab-3/VehiculoAereoTerrestre.php",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      }
    );

    if (response.ok) {
      if (index !== -1) {
        vehicleList.splice(index, 1);
      }
    } else {
      throw new Error("Error al realizar la eliminación");
    }
  } catch (error) {
    alert("Error al realizar la eliminación: " + error.message);
  }
  hideSpinner(form);
}

function resetForm() {
  idAbm.value = "";
  modelAbm.value = "";
  yearAbm.value = "";
  maxVelAbm.value = "";
  doorsAbm.value = "";
  wheelsAbm.value = "";
  heightAbm.value = "";
}

function validateForm() {
  if (modelAbm.value.trim() === "") {
    modelAbm.classList.add("error");
    modelAbm.nextElementSibling.textContent = "El modelo es obligatorio";
    return false;
  } else {
    modelAbm.classList.remove("error");
    modelAbm.nextElementSibling.textContent = "";
  }

  if (yearAbm.value.trim() === "") {
    yearAbm.classList.add("error");
    yearAbm.nextElementSibling.textContent = "El año es obligatorio";
    return false;
  } else {
    yearAbm.classList.remove("error");
    yearAbm.nextElementSibling.textContent = "";
  }

  if (
    maxVelAbm.value.trim() === "" ||
    isNaN(maxVelAbm.value) ||
    maxVelAbm.value < 0
  ) {
    maxVelAbm.classList.add("error");
    maxVelAbm.nextElementSibling.textContent =
      "La velocidad debe ser un número mayor a 0";
    return false;
  } else {
    maxVelAbm.classList.remove("error");
    maxVelAbm.nextElementSibling.textContent = "";
  }

  if (filterType.value == "vehiculo") {
    filterType.classList.add("error");
    filterType.nextElementSibling.textContent =
      "El tipo de vehiculo es obligatorio";
    return false;
  } else {
    filterType.classList.remove("error");
    filterType.nextElementSibling.textContent = "";
  }

  if (filterType.value == "aereo") {
    if (heightAbm.value.trim() === "") {
      heightAbm.classList.add("error");
      heightAbm.nextElementSibling.textContent =
        "La altura maxima es obligatoria";
      return false;
    } else {
      heightAbm.classList.remove("error");
      heightAbm.nextElementSibling.textContent = "";
    }
    if (autonomyAbm.value.trim() === "") {
      autonomyAbm.classList.add("error");
      autonomyAbm.nextElementSibling.textContent =
        "La autonomía es obligatoria";
      return false;
    } else {
      autonomyAbm.classList.remove("error");
      autonomyAbm.nextElementSibling.textContent = "";
    }
  }
  if (filterType.value == "terrestre") {
    if (
      doorsAbm.value.trim() === "" ||
      isNaN(wheelsAbm.value) ||
      wheelsAbm.value < 0
    ) {
      doorsAbm.classList.add("error");
      doorsAbm.nextElementSibling.textContent =
        "La cantidad de puertas es obligatoria y debe ser mayor a 0";
      return false;
    } else {
      doorsAbm.classList.remove("error");
      doorsAbm.nextElementSibling.textContent = "";
    }
    if (
      wheelsAbm.value.trim() === "" ||
      isNaN(wheelsAbm.value) ||
      wheelsAbm.value < 0
    ) {
      wheelsAbm.classList.add("error");
      wheelsAbm.nextElementSibling.textContent =
        "La cantidad de ruedas es obligatoria y debe ser mayor a 0";
      return false;
    } else {
      wheelsAbm.classList.remove("error");
      wheelsAbm.nextElementSibling.textContent = "";
    }
  }

  return true;
}
filterType.addEventListener("change", changeType);

addBtn.addEventListener("click", () => {
  showABMForm("add");
});

editBtn.addEventListener("click", () => {
  editElement();
});

acceptBtn.addEventListener("click", () => {
  registerVehicle();
});
