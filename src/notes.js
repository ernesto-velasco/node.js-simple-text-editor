const fs = require("fs");
const chalk = require("chalk");

const log = console.log;

const path = "./storage/docs/"

const index = function () {
    const notes = loadNotes();
    notes.forEach((element) => displayNote(element.title, element.body));
    return notes
};

const show = function (title) {
    try {
        if (fs.existsSync(path + title)) {
          dataBuffer = fs.readFileSync(path + title)
          data = dataBuffer.toString();
          return data
        }
    } catch(err) {
        console.error(err)
    }
};

const store = function (title, body) {
    try {
        if (! fs.existsSync(path + title)) {
            fs.writeFileSync(path + title, body)
        } else {
            log("The file already exists")
        }
    } catch(err) {
        console.error(err)
    }
};

const update = function (title, newTitle, newBody) {
    try {
        if (fs.existsSync(path + title)) {
            fs.writeFileSync(path + title, newBody)
            if (title != newTitle) {
                fs.rename(path + title, path + newTitle, function(err) {
                    if ( err ) console.log('ERROR: ' + err);
                })
            }
        } else {
            log("no exsite")
        }
    } catch(err) {
        console.error(err)
    }
};

const destroy = function (title) {
    try {
        if (fs.existsSync(path + title)) {
            fs.unlinkSync(path + title)
        } else {
            log("no exsite")
        }
    } catch(err) {
        console.error(err)
    }
    let notes = loadNotes();
    noteIndex = notes.findIndex((element) => element.title === title);
    if (noteIndex === -1) return log(chalk.red("We couldn't find the note you were looking for"));
    notes.splice(noteIndex, 1), log("The note was removed")
    saveNotes(notes);
};

const loadNotes = function () {
    try {
        const data = fs.readdirSync(path)
        return data;
    } catch (error) {
        log("Error, directory does not exists!");
        return [];
    }
};

const saveNotes = function (notes) {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", notesJSON);
};

const displayNote = function (title = '', body = '') {
    log(chalk.blue(title) + "\t" + body)
}

module.exports = {
    index: index,
    show: show,
    store: store,
    update: update,
    destroy: destroy,
};
