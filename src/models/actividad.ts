import {Schema, model} from 'mongoose';

export interface Actividad{
    id: string;
    title: string;
    desc: string;
    date: string;
    time: string;
    img: string;
    price:number;
    stars: number;
}

export const ActividadSchema = new Schema<Actividad>(
    {
        title: {type: String, required:true},
        date: {type: String, required:true},
        time: {type: String, required:true},
        img: {type: String, required:true},
        desc: {type: String, required:true},
        price: {type: Number, required:true},
        stars: {type: Number, required:true},
    },{
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps:true
    }
);

export const ActividadModel = model<Actividad>('actividad', ActividadSchema);