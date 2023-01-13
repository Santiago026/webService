import mongoose, { Schema,Document } from 'mongoose';

export interface IPrize extends Document {
  fecha: string;
  id_transaccion: string;
  punto_venta: string;
  municipio: string;
  documento: string;
  producto: string;
  valor_premio: string;
}

export interface IPrizeModel extends IPrize {}

const PrizeSchema = new Schema({
  fecha: { type: String, required: true },
  id_transaccion: { type: String, required: true },
  punto_venta: { type: String, required: true },
  municipio: { type: String, required: true },
  documento: { type: String, required: true},
  producto: { type: String, required: true },
  valor_premio: { type: String, required: true },
});

export default mongoose.model<IPrizeModel>('Prizes', PrizeSchema);