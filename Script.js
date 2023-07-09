// const form = document.getElementById("my-form");
// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   // Get form values
//   const name = document.getElementById("name").value;
//   const profile = document.querySelector('input[name="profile"]:checked').value;
//   const gender = document.querySelector('input[name="gender"]:checked').value;
//   const departmentCheckboxes = document.querySelectorAll('input[name="department"]:checked');
//   const departments = Array.from(departmentCheckboxes).map(checkbox => checkbox.value);
//   const salary = document.getElementById("salary").value;
//   const startDate =
//     document.getElementById("day").value +
//     "-" +
//     document.getElementById("month").value +
//     "-" +
//     document.getElementById("year").value;
//   const notes = document.getElementById("notes").value;

//   const formData = {
//     name: name,
//     profile: profile,
//     gender: gender,
//     department: departments,
//     salary: salary,
//     startDate: startDate,
//     notes: notes
//   };

//   console.log("Script.js form data:", formData);

//   let existingData = localStorage.getItem("formData");
//   console.log("EXISTING DATA:", existingData);
//   localStorage.removeItem("formData");

//   if (existingData) {
//     try {
//       existingData = JSON.parse(existingData);

//       if (Array.isArray(existingData)) {
//         existingData.push(formData);
//       } else {
//         existingData = [existingData, formData];
//       }
//     } catch (error) {
//       console.error("Error parsing existing data:", error);
//     }
//   } else {
//     existingData = [formData];
//   }

//   console.log("UPDATED DATA:", existingData);

//   localStorage.setItem("formData", JSON.stringify(existingData));
//   console.log("My Form data stored in localStorage successfully:", existingData);
//   form.reset();
//   window.location.href = "EmpDetail.html";
// });









const form = document.getElementById("my-form");
const submitButton = document.getElementById("submitButton");
const updateButton = document.getElementById("updateButton");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitForm();
});

updateButton.addEventListener("click", (e) => {
   e.preventDefault(); 
  updateForm();
});

// Get form values
const nameInput = document.getElementById("name");
const profileInputs = document.querySelectorAll('input[name="profile"]');
const genderInputs = document.querySelectorAll('input[name="gender"]');
const departmentInputs = document.querySelectorAll('input[name="department"]');
const salaryInput = document.getElementById("salary");
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const notesInput = document.getElementById("notes");

let formDataArray = JSON.parse(localStorage.getItem("formData")) || [];
let editRowIndex = -1;

// Check if edit mode
const urlParams = new URLSearchParams(window.location.search);
const editIndex = urlParams.get("edit");
if (editIndex) {
  editRowIndex = parseInt(editIndex);
  if (formDataArray[editRowIndex]) {
    const editData = formDataArray[editRowIndex];

    nameInput.value = editData.name;
    profileInputs.forEach((input) => {
      if (input.value === editData.profile) {
        input.checked = true;
      }
    });
    genderInputs.forEach((input) => {
      if (input.value === editData.gender) {
        input.checked = true;
      }
    });
    departmentInputs.forEach((input) => {
      if (editData.department.includes(input.value)) {
        input.checked = true;
      }
    });
    salaryInput.value = editData.salary;
    dayInput.value = editData.startDate.split("-")[0];
    monthInput.value = editData.startDate.split("-")[1];
    yearInput.value = editData.startDate.split("-")[2];
    notesInput.value = editData.notes;

    submitButton.style.display = "none";
    updateButton.style.display = "inline-block";
  }
}

function submitForm() {
  const name = nameInput.value;
  const profile = document.querySelector('input[name="profile"]:checked').value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const departments = Array.from(departmentInputs)
    .filter((input) => input.checked)
    .map((input) => input.value);
  const salary = salaryInput.value;
  const startDate = `${dayInput.value}-${monthInput.value}-${yearInput.value}`;
  const notes = notesInput.value;

  const formData = {
    name: name,
    profile: profile,
    gender: gender,
    department: departments,
    salary: salary,
    startDate: startDate,
    notes: notes,
  };

  if (editRowIndex !== -1) {
    formDataArray[editRowIndex] = formData;
  } else {
    formDataArray.push(formData);
  }

  localStorage.setItem("formData", JSON.stringify(formDataArray));

  form.reset();
  window.location.href = "EmpDetail.html";
}

function updateForm() {
  submitForm();
}
