
/**
 * Fetch all users from the API
 * 
 * @returns {Promise<Array>} - Array of users
 */
async function getAllUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users"); // devuelve una promesa
    const users = await response.json(); // devuelve una promesa
    return users;
}

/**
 * Fetch publications by a specific user
 * 
 * @param {number} userId - ID of the user 
 * @returns {Promise<Array>} - Array of publications by the user
 */
async function getPublicationsByUser(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const publications = await response.json();
    return publications;
}

/**
 * Main function, fetches users and their publications in parallel
 */
async function main() {
    try {
        const users = await getAllUsers(); // await espera a que la promesa se resuelva antes de continuar, como si fuera síncrono
        const num = 3;

        let promises = [];
        for (let i = 0; i < num; i++) {
            let promise = getPublicationsByUser(users[i].id); // devuelve una promesa, sin el await no espera a que la promesa se resuelva
            promises.push(promise);
        }

        console.log("--- Ejecución Paralela ---");
        // opcion 1: usando async/await
        try {
            const results = await Promise.all(promises); // espera a que todas las promesas se resuelvan, preserva el orden
            for (let i = 0; i < results.length; i++) {
                console.log(`${users[i].name} tiene ${results[i].length} publicaciones.`);
            }
        } catch (error) {
            console.error("Error fetching publications:", error);
        }

        // opcion 2: usando .then/.catch
        // Promise.all(promises).then(results => {
        //     for (let i = 0; i < results.length; i++) {
        //         console.log(`${users[i].name} tiene ${results[i].length} publicaciones.`);
        //     }
        // }).catch(error => {
        //     console.error("Error fetching publications:", error);
        // });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

main();
