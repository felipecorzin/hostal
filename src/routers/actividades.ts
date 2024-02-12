import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { ActividadModel } from '../models/actividad';
const actividadRouter = Router();

actividadRouter.get('/findAll',asyncHandler(async (req, res) => {
      const actividades = await ActividadModel.find();
      res.send(actividades);
    })
);

actividadRouter.get('/:actividadId',asyncHandler(async (req, res) => {
      const actividad = await ActividadModel.findById(req.params.actividadId);
      res.send(actividad);
    })
);
  
export default actividadRouter;