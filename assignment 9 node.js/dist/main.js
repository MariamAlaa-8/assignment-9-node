"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    name;
    id;
    email;
    password;
    phone;
    notes;
    age;
    myNoteBooks = [];
    constructor(name, id, email, password, phone, age, notebook, notes) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.notes = notes;
        if (notebook) {
            this.myNoteBooks.push({ notebook, assignedAt: Date.now() });
        }
        if (age >= 18 && age <= 60) {
            this.age = age;
        }
        else {
            console.log("Age must be between 18 and 60");
            this.age = 18;
        }
    }
    addNoteBook(nb) {
        this.myNoteBooks.push({ notebook: nb, assignedAt: Date.now() });
    }
    getPassword() {
        return this.password;
    }
    displayInfo() {
        return `Name: ${this.name}, ID: ${this.id}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this.age}`;
    }
}
class Admin extends User {
    constructor(name, id, email, password, phone, age) {
        super(name, id, email, password, phone, age);
    }
    manageNotes() {
        console.log("Admin can manage notes");
        return "Notes managed successfully";
    }
}
class Note {
    id;
    title;
    content;
    userId;
    constructor(id, title, content, userId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
    }
    preview() {
        if (this.content.length > 20) {
            return this.content.substring(0, 20) + "...";
        }
        return this.content;
    }
}
class NoteBook {
    name;
    notes = [];
    constructor(name) {
        this.name = name;
    }
    addNote(id, title, content, userId) {
        const note = new Note(id, title, content, userId);
        this.notes.push(note);
    }
    removeNote(id) {
        const index = this.notes.findIndex(n => n.id === id);
        if (index !== -1) {
            this.notes.splice(index, 1);
            return true;
        }
        return false;
    }
}
class Storage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }
    getAllItems() {
        return this.items;
    }
}
const mariam = new User("Mariam", 1, "m@mail.com", "1234", "0500", 22);
const adminSara = new Admin("Sara", 2, "s@mail.com", "abcd", "0555", 25);
const myNotebook = new NoteBook("Work Notes");
myNotebook.addNote(101, "Meeting", " new project ", mariam);
mariam.addNoteBook(myNotebook);
const userStorage = new Storage();
userStorage.addItem(mariam);
userStorage.addItem(adminSara);
const noteStorage = new Storage();
noteStorage.addItem(new Note(102, "Shopping", " bread", mariam));
console.log(mariam.displayInfo());
console.log(adminSara.manageNotes());
console.log("Users in storage:", userStorage.getAllItems().length);
console.log(adminSara);
console.log(new Note(1, "test", "test", mariam));
