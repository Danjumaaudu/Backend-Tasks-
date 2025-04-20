import express from "express"



export interface user {
    id:number;
    username:string;
    email:string;
    phoneNumber:number;
    password:string;

};

export const users : user[] = [];