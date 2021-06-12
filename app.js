textarea = document.querySelector("#textInput");
textarea.addEventListener('input', autoResize, false);

function autoResize() {
    this.style.height ='auto';
    this.style.height = this.scrollHeight + 'px';
}

let addNote = document.querySelector("#addNote");
addNote.addEventListener('click',function(e){

    let addText = document.querySelector("#textInput");
    let notes = localStorage.getItem("notes");
    if(notes === null)
        notesObj = [];
    else
        notesObj = JSON.parse(notes);

    // addText.value.replace('/','');
    notesObj.push(addText.value);

    localStorage.setItem("notes", JSON.stringify(notesObj));

    addText.value = "";
    console.log(notesObj);

    showNotes();
})

function showNotes(){
    let notes = localStorage.getItem("notes");

    if(notes === null)
        notesObj = [];
    else
        notesObj = JSON.parse(notes);

    let html = "";
    notesObj.forEach(function(element,index){
        html += `
            <div class="note">
                <div class="note-body">
                    <h3>Note ${index}</h3>
                    <p>${element}</p>
                    <button id="deleteNote">Delete Note</button>
                </div>
            </div>  
            `
    });

    let noteElement = document.getElementById("notes");
    if(notes.length !== 0)
        noteElement.innerHTML = html;
}
