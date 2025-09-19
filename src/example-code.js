let contador = 0;      // Puede cambiar
const PI = 3.14159;    // No puede reasignarse

function sumar(a, b) {
    return a + b;
}

const restar = (a, b) => {
    return a - b;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}

/**
 * Promesas y async/await
 * 
 * Una promesa representa un valor que estará disponible en el futuro (cuando termine una operación asincrónica).
 * Una función marcada con async devuelve siempre una promesa.
 * La palabra clave await se utiliza dentro de funciones async para esperar el resultado de una promesa antes de continuar.
 * 
*/
async function obtenerUsuarios() {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
    const usuarios = await respuesta.json();
    return usuarios;
}

// obtenerUsuarios().then(usuarios => {
//     console.log(usuarios);
// }).catch(error => {
//     console.log(error);
// });


/**
 * Example of a promise
 * 
 * @returns {Promise<string>} - The result of the promise
 */
function examplePromise() {
    let num = getRandomInt(1, 10);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            num % 2 === 0 ? resolve("Par") : reject("Impar");
        }, 1000);
    });
}

// examplePromise().then(result => {
//     console.log("Resolve: ");
//     console.log(result);
// }).catch(error => {
//     console.log("Reject: ");
//     console.log(error);
// });

const nombre = "Pilar";
const edad = 30;

console.log(`${nombre} tiene ${edad} años.`);
// Salida: Pilar tiene 30 años.

console.time("Etiqueta");
// Bloque de código a medir
setTimeout(() => {
    // console.log("Hola");
}, 1000);
console.timeEnd("Etiqueta");


// Native functions on arrays and objects

// forEach
// Ejecuta una acción para cada elemento del arreglo.

const numerosForEach = [1, 2, 3];
numerosForEach.forEach(n => console.log(n * 2));
// Salida: 2, 4, 6

// map
// Transforma cada elemento y devuelve un nuevo arreglo.

const nombresMap = ["Ana", "Luis", "Sofía"];
const longitudes = nombresMap.map(n => n.length);
console.log(longitudes); // [3, 4, 5]

// filter
// Devuelve un nuevo arreglo con los elementos que cumplen una condición.

const numerosFilter = [5, 10, 15, 20];
const mayoresA10 = numerosFilter.filter(n => n > 10);
console.log(mayoresA10); // [15, 20]

// find
// Devuelve el primer elemento que cumpla la condición.

const usuarios = [{ id: 1, nombre: "Ana" }, { id: 2, nombre: "Luis" }];
const usuario = usuarios.find(u => u.id === 2);
console.log(usuario.nombre); // Luis

// reduce
// Reduce un arreglo a un único valor.

const numerosReduce = [1, 2, 3, 4];
const suma = numerosReduce.reduce((acum, n) => acum + n, 0);
console.log(suma); // 10

// Object.keys, Object.values, Object.entries
// Permiten recorrer y manipular objetos.

const persona = { nombre: "Ana", edad: 30 };
console.log(Object.keys(persona));   // ["nombre", "edad"]
console.log(Object.values(persona)); // ["Ana", 30]
console.log(Object.entries(persona));// [["nombre", "Ana"], ["edad", 30]]
