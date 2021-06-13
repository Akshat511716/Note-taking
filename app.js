showNotes();

// Resize the textInput and the headingInput with the text
textInput = document.querySelector("#textInput");
headingInput = document.querySelector("#headingInput");
headingInput.addEventListener("input", autoResize, false);
textInput.addEventListener("input", autoResize, false);

function autoResize() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
}

let addNote = document.querySelector("#addNote");
addNote.addEventListener("click", function (e) {
  let addText = document.querySelector("#textInput");
  let notes = localStorage.getItem("notes");
  if (notes === null) notesObj = [];
  else notesObj = JSON.parse(notes);

  // addText.value.replace('/','');
  notesObj.push(addText.value);

  localStorage.setItem("notes", JSON.stringify(notesObj));

  addText.value = "";

  showNotes();
});

function showNotes() {
  let addText = document.querySelector("#textInput");
  let notes = localStorage.getItem("notes");
  if (notes === null) notesObj = [];
  else notesObj = JSON.parse(notes);

  let html = "";
  notesObj.reverse().forEach(function (element, index) {
    html += `
            <div class="note">
                 <div class="note-body">
                    <h3>Note ${index + 1}</h3>
                     <p>${element}</p>
                    <button id="${index}"onclick="deleteNote(this.id)">Delete Note</button>
                     <button id="${index}"onclick="editNote(this.id)">Edit Note</button>
                 </div>
             </div>
                `;
  });
  let noteElement = document.getElementById("notes");
  if (notesObj.length !== 0) noteElement.innerHTML = html;
  else noteElement.innerHTML = "Nothing to show!";
}

function deleteNote(index) {
  // console.log("I am deleting");
  let notes = localStorage.getItem("notes");
  if (notes == null) notesObj = [];
  else notesObj = JSON.parse(notes);

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

function editNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) notesObj = [];
  else notesObj = JSON.parse(notes);
  let addText = document.querySelector("#textInput");
  addText.value = notesObj[index];

  deleteNote(index);
}
