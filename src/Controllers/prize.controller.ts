import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Prize from "../schemas/prize.schema";
const fs = require("fs");


const createPrize = (req: Request, res: Response, _next: NextFunction) => {
  const { 
    fecha, 
    id_transaccion, 
    punto_venta, 
    municipio, 
    documento, 
    producto, 
    valor_premio 

  } = req.body;

  const prize = new Prize({
    _id: new mongoose.Types.ObjectId(),
    fecha,      
    id_transaccion,
    punto_venta,
    municipio,
    documento,
    producto,
    valor_premio
  });

  return prize
    .save()
    .then((prize) => res.status(201).json({prize}))
    .catch((err) => res.status(500).json({err}));

};


const readMatchPrize = (req: Request, res: Response, _next: NextFunction) => {
    
  const dateMatch = req.params.dateMatch;

  return Prize.find({fecha: {$regex: dateMatch}})
    .then((prizes) => res.status(200).json({prizes}))
    .catch((err) => res.status(500).json({err}));
};

const readPrize = (req: Request, res: Response, _next: NextFunction) => {
  const { fecha_inicial, fecha_final } = req.body;

  (!fecha_inicial || !fecha_final) ? res.status(400).json({ message: "Faltan parametros" }) : null;
  
  return Prize.find({
    fecha: {
      $gte: fecha_inicial,
      $lte: fecha_final
    }
  })
    .then((prizes) => res.status(200).json({ prizes }))
    .catch((err) => res.status(500).json({ err }));
};
const readAllPrize = (_req: Request, res: Response, _next: NextFunction) => {

  return Prize.find()
    .then((prizes) => res.status(200).json({prizes}))
    .catch((err) => res.status(500).json({err}));

};


const createManyPrizesFile = (req: Request, res: Response, _next: NextFunction) => {
    const filePath = req.body.file;
  
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err:string, jsonString:string) => {
        if (err) return reject(err);
  
        const prizesData = JSON.parse(jsonString);
        const prizes = prizesData.map((prize: any) => {
          return new Prize({
            ...prize,
            _id: new mongoose.Types.ObjectId(),
          });
        });
  
        Prize.insertMany(prizes)
          .then(() => {
            res.status(201).json({ message: "Prizes created successfully" });
            resolve(prizes);
          })
          .catch((error) => {
            res.status(500).json({ error });
            reject(error);
          });
      });
    });
};

export default {createPrize ,readPrize,readAllPrize,readMatchPrize,createManyPrizesFile};
