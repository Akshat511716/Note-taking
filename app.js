// showNotes();

// Resize the textInput and the headingInput with the text
textInput = document.querySelector("#textInput");
headingInput = document.querySelector("#headingInput");
headingInput.addEventListener("input", autoResize, false);
textInput.addEventListener("input", autoResize, false);

function autoResize() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
}

const noteListDiv = document.querySelector(".container");
let noteID = 1;
class Note {
  constructor(id, heading, content) {
    this.id = id;
    this.heading = heading;
    this.content = content;
  }
}

function eventListeners() {
  document.addEventListener("DOMContentLoaded", displayNotes);
  document.getElementById("addNote").addEventListener("click", addNewNote);

  noteListDiv.addEventListener("click", deleteNote);
}

eventListeners();

function getDataFromStorage() {
  return localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [];
}

function addNewNote() {
  if (validateInput(headingInput, textInput)) {
    let notes = getDataFromStorage();

    let noteItem = new Note(noteID, headingInput.value, textInput.value);
    noteID++;
    notes.push(noteItem);
    createNote(noteItem);

    localStorage.setItem("notes", JSON.stringify(notes));
    headingInput.value = "";
    textInput.value = "";
  }
}

function validateInput(title, content) {
  if (title.value !== "" && content.value !== "") {
    return true;
  } else {
    if (title.value === "") title.classList.add("warning");
    if (content.value === "") title.classList.add("warning");
    setTimeout(() => {
      title.classList.remove("warning");
      content.classList.remove("warning");
    }, 2000);
  }
}

function createNote(noteItem) {
  const div = document.createElement("div");
  div.classList.add("note-body");
  div.setAttribute("data-id", noteItem.id);
  div.innerHTML = `
           <h3>${noteItem.heading}</h3>
                       <p>${noteItem.content}</p>
                      <button class="delete-note-btn">Delete Note</button>
                       <button ">Edit Note</button>
                  
    `;
  noteListDiv.appendChild(div);
}

function displayNotes() {
  let notes = getDataFromStorage();
  if (notes.length > 0) {
    noteID = notes[notes.length - 1].id;
    noteID++;
  } else {
    noteID = 1;
  }
  notes.forEach((item) => {
    createNote(item);
  });
}

function deleteNote(e) {
  if (e.target.classList.contains("delete-note-btn")) {
    e.target.parentElement.remove();
    let divID = e.target.parentElement.dataset.id;
    let notes = getDataFromStorage();
    let newNotesList = notes.filter((item) => {
      return item.id !== parseInt(divID);
    });
    localStorage.setItem("notes", JSON.stringify(newNotesList));
  }
}
// let addNote = document.querySelector("#addNote");
// addNote.addEventListener("click", function (e) {
//   let addText = document.querySelector("#textInput");
//   let notes = localStorage.getItem("notes");
//   if (notes === null) notesObj = [];
//   else notesObj = JSON.parse(notes);

//   // addText.value.replace('/','');
//   notesObj.push(addText.value);

//   localStorage.setItem("notes", JSON.stringify(notesObj));

//   addText.value = "";

//   showNotes();
// });

// function showNotes() {
//   let addText = document.querySelector("#textInput");
//   let notes = localStorage.getItem("notes");
//   if (notes === null) notesObj = [];
//   else notesObj = JSON.parse(notes);

//   let html = "";
//   notesObj.reverse().forEach(function (element, index) {
//     html += `
//             <div class="note">
//                  <div class="note-body">
//                     <h3>Note ${index + 1}</h3>
//                      <p>${element}</p>
//                     <button id="${index}"onclick="deleteNote(this.id)">Delete Note</button>
//                      <button id="${index}"onclick="editNote(this.id)">Edit Note</button>
//                  </div>
//              </div>
//                 `;
//   });
//   let noteElement = document.getElementById("notes");
//   if (notesObj.length !== 0) noteElement.innerHTML = html;
//   else noteElement.innerHTML = "Nothing to show!";
// }

// function deleteNote(index) {
//   // console.log("I am deleting");
//   let notes = localStorage.getItem("notes");
//   if (notes == null) notesObj = [];
//   else notesObj = JSON.parse(notes);

//   notesObj.splice(index, 1);
//   localStorage.setItem("notes", JSON.stringify(notesObj));
//   showNotes();
// }

// function editNote(index) {
//   let notes = localStorage.getItem("notes");
//   if (notes == null) notesObj = [];
//   else notesObj = JSON.parse(notes);
//   let addText = document.querySelector("#textInput");
//   addText.value = notesObj[index];

//   deleteNote(index);
// }
