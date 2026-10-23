class User {
    public age: number
    private myNoteBooks: { notebook: NoteBook, assignedAt: number }[] = []
    
    constructor(public name: string, 
        public id: number,  public email: string,  private password: string,  public phone: string,
        age: number, notebook?: NoteBook,public notes?: Note
    ) {
       
        if (notebook){
              this.myNoteBooks.push({ notebook, assignedAt: Date.now() })
        }
      
        
        if (age >= 18 && age <= 60) {
            this.age = age
        } else {
            console.log("Age must be between 18 and 60");
            this.age = 18
        }
    }

    public addNoteBook(nb: NoteBook):void {
        this.myNoteBooks.push({ notebook: nb, assignedAt: Date.now() })
    }

    public getPassword(): string {
        return this.password
    }

    public displayInfo(): string {
        return `Name: ${this.name}, ID: ${this.id}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this.age}`
    }
}
class Admin extends User {
    constructor(name: string, id: number, email: string, password: string, phone: string, age: number) {
        
        super(name, id, email, password, phone, age)
    }

    public manageNotes(): string {
        console.log("Admin can manage notes")
        return "Notes managed successfully"
    }
}

class Note {
    constructor(public id: number,public title: string,public content: string,public userId: User) {}

    public preview(): string {
        if (this.content.length > 20) {
            return this.content.substring(0, 20) + "...";
        }
        return this.content
    }
}
class NoteBook {
    private notes: Note[] = [];
    constructor(public name: string) {}
 
    addNote(id: number, title: string, content: string, userId: User) {
        const note = new Note(id, title, content, userId)
        this.notes.push(note)
    }

    removeNote(id: number) {
        const index = this.notes.findIndex(n => n.id === id);
        if (index !== -1) {
            this.notes.splice(index, 1);
            return true
        }
        return false
    }
}
class Storage<T>{
    private items: T[] = []
   
    addItem(item: T) {
        this.items.push(item)
    }
    
        removeItem(item: T) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1)
            return true
        }
        return false
    }
       getAllItems() {
       return this.items
    }
}

const mariam = new User("Mariam", 1, "m@mail.com", "1234", "0500", 22)
const adminSara = new Admin("Sara", 2, "s@mail.com", "abcd", "0555", 25)
const myNotebook = new NoteBook("Work Notes")
myNotebook.addNote(101, "Meeting", " new project ", mariam)
mariam.addNoteBook(myNotebook)
const userStorage = new Storage<User>()
userStorage.addItem(mariam)
userStorage.addItem(adminSara)
const noteStorage = new Storage<Note>()
noteStorage.addItem(new Note(102, "Shopping", " bread", mariam))
console.log(mariam.displayInfo())
console.log(adminSara.manageNotes())
console.log("Users in storage:", userStorage.getAllItems().length)
console.log(adminSara)
console.log(new Note(1, "test", "test", mariam))