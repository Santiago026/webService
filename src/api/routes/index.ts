import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

const cleanFileName = (fileName: string) => {
  const file = fileName.split(".").shift();
  
  return file;
};

const promises: Promise<any>[] = [];

readdirSync(PATH_ROUTER).filter((fileName) => {
    const cleanName = cleanFileName(fileName);
  if (cleanName !== "index") {
    promises.push(
      import(`./${cleanName}.route`).then((moduleRouter) => {
        const routePath = `/${cleanName}`;
        return router.use(routePath, moduleRouter.router);
      }
    ));
  }
});
  
Promise.all(promises).then(() => {
  console.log('All routes loaded');
});

export { router };