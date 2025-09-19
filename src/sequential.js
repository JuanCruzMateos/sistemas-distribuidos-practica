
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
 * Main function, sequentially fetches users and their publications
 */
async function main() {
    try {
        const num = 3;
        const users = await getAllUsers(); // await espera a que la promesa se resuelva antes de continuar, como si fuera síncrono
        
        console.log("--- Ejecución Secuencial ---");
        if (num <= users.length) {
            for (let i = 0; i < num; i++) {
                const publications = await getPublicationsByUser(users[i].id); // espera a que se resuelva la promesa antes de continuar
                console.log(`${users[i].name} tiene ${publications.length} publicaciones.`);
            }
        }
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

main();