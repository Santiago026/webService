const fs = require("fs");
/**Validamos el número de datos por municipio de nuestro Json */
const countObjects = (filePath) => {
    try {
        const jsonString = fs.readFileSync(filePath, "utf8");
        const data = JSON.parse(jsonString);
        // Contar los objetos que contengan el parámetro "municipio": "Riosucio"
        const countRiosucio = data.filter(object => object.municipio === "Riosucio").length;
        console.log(`Hay ${countRiosucio} objetos con el municipio Riosucio.`);
        // Contar los objetos que contengan el parámetro "municipio": "Manizales"
        const countManizales = data.filter(object => object.municipio === "Manizales").length;
        console.log(`Hay ${countManizales} objetos con el municipio Manizales.`);
    } catch (err) {
        console.error(err);
    }
}

// Ejecutar la función y pasarle la ruta del archivo JSON
countObjects('/home/susuerte/Documents/JavaScript/Projects/webService/webService-back/src/Json/data-v1.json');