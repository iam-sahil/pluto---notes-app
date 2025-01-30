'use strict';
import { generateID, findNotebook, findNotebookIndex, findNote, findNoteIndex } from "./utils.js";
let plutoDB = {};


const initDB = function () {
    const db = localStorage.getItem('plutoDB');
    if(db) {
        plutoDB = JSON.parse(db);
    }
    else {
        plutoDB.notebooks = [];
        localStorage.setItem('plutoDB', JSON.stringify(plutoDB));
    }
}
initDB();

const readDB = function () {
    plutoDB = JSON.parse(localStorage.getItem('plutoDB'));
}
const writeDB = function () {
    localStorage.setItem('plutoDB', JSON.stringify(plutoDB));
}

/**  
* @namespace
* @property {Object} get
* @property {Object} post
* @property {Object} update
* @property {Object} delete
*/
export const db = {
    post: {
        /**  
        * @function 
        * @param {string} name
        * @returns {Object}
        */
        notebook(name) {
            readDB();
            const notebookData = {
                id: generateID(),
                name,
                notes: []
            }
            plutoDB.notebooks.push(notebookData);
            writeDB();
            return notebookData;
        },
        /**
         * @function
         * @param {string} notebookId 
         * @param {Object} Object 
         * @returns {Object}
         */
        note(notebookId, object) {
            readDB();
            const notebook = findNotebook(plutoDB, notebookId);
            const noteData = {
                id: generateID(), 
                notebookId, 
                ...object, 
                postedOn: new Date().getTime()
            }
            notebook.notes.unshift(noteData);
            writeDB();
            return noteData;
        }
    },
    get: {
        /**  
        * @function 
        * @returns {Array<Object>}
        */
       notebook() {
        readDB();
        return plutoDB.notebooks;
       },
       /**
        * @function 
        * @param {string} notebookId 
        * @returns {Array<Object>}
        */
       note(notebookId) {
        readDB();
        const notebook = findNotebook(plutoDB, notebookId);
        return notebook.notes;
       }
    },
    update: {
        /**  
        * @function 
        * @param {string} notebookId
        * @param {string} name
        * @returns {Object}
        */
        notebook(notebookId, name) {
            readDB();
            const notebook = findNotebook(plutoDB, notebookId);
            notebook.name = name;
            writeDB();
            return notebook;
        },
        note(noteId, object) {
            readDB();
            const oldNote = findNote(plutoDB, noteId);
            const newNote = Object.assign(oldNote, object);
            writeDB();
            return newNote;
        }
    },
    delete: {
        /**
         * @function
         * @param {string} notebookId 
         */
        notebook(notebookId) {
            readDB();
            const notebookIndex = findNotebookIndex(plutoDB, notebookId);
            plutoDB.notebooks.splice(notebookIndex, 1);
            writeDB();
        },

        /**
         * @function
         * @param {string} notebookId 
         * @param {string} noteId 
         * @returns {Arrya<Object>}
         */
        note(notebookId, noteId) {
            readDB();
            const notebook = findNotebook(plutoDB, notebookId);
            const noteIndex = findNoteIndex(notebook, noteId);
            notebook.notes.splice(noteIndex, 1);
            writeDB();
            return notebook.notes;
        }
    }
}