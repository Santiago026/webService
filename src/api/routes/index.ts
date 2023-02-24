import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
const router = Router();


const cleanFileName = (fileName: string) => {
    const file = fileName.split(".").shift();
    // file.join(".");
    return file;
};

/**
 * readdirSync(PATH_ROUTER): Escanea todos los archivos de carpeta 
 * donde se encuentra el archivo index.ts
*/

readdirSync(PATH_ROUTER).filter((fileName) => {
 
    const cleanName = cleanFileName(fileName);
    if (cleanName !== "index") { 
        import(`./${cleanName}.route.ts`).then((moduleRouter) => {
            router.use(`/${cleanName}`, moduleRouter.router);
        });
    }
});

export { router };