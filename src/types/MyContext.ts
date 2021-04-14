import {Request, Response} from 'express';

export interface MyContext {
    req: Request & {
        session: {
            userID: any;
        }
    };
    res: Response & {
        session: {
            userID: any;
        }
    }
}