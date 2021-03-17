const fs = require('fs');

let listadoPorHacer = [];


const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    const info = new Uint8Array(Buffer.from(data));
    fs.writeFile('db/data.json', info, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
        console.log('La tarea ha sido guardada exitosamente');
    });
}


const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }


}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

// const borrar = (descripcion) => {
//     cargarDB();

//     let index = listadoPorHacer.findIndex(tarea => {
//         return tarea.descripcion === descripcion;
//     });

//     if (index >= 0) {
//         listadoPorHacer.pop(index);
//         guardarDB();
//         return true;
//     } else {
//         return false;
//     }

// }

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

}
module.exports = {
    crear,
    guardarDB,
    getListado,
    actualizar,
    borrar
}