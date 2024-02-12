import {Schema, model} from 'mongoose';

export interface User{
    id:string;
    avatar: string;
    name:string;
    address:string;
    city: string;
    email:string;
    password: string;
    phone: string;
    lat: number;
    lng: number;
    
}

export const UserSchema = new Schema<User>({
    avatar: {type: String,default:'assets/img/avatar.png' },
    name: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String },
    lat: {type: Number },
    lng: {type: Number },
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const UserModel = model<User>('user', UserSchema);