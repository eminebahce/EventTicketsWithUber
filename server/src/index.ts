import 'reflect-metadata';
import {Action, BadRequestError, createKoaServer} from "routing-controllers";
import setupDb from './db';
import UserController from './users/controller';
import LoginController from './login/controller'
import User from "./users/entity";
import {verify} from "./jwt";

const port = process.env.PORT || 4000;

const app = createKoaServer({
    cors: true,
    controllers: [
        UserController,
        LoginController
    ],
    authorizationChecker:(action: Action) => {
        const header: string = action.request.headers.authorization
        if(header && header.startsWith('Bearer ')){
            const [, token] = header.split(' ')

            try{
                return  !!(token && verify(token))
            }
            catch (e) {
                throw new BadRequestError(e)
            }
        }
        return false
    },
    currentUserChecker: async (action: Action) => {
        const header: string = action.request.headers.authorization
        if (header && header.startsWith('Bearer ')){
            const [, token] = header.split(' ')

            if(token){
                const {id} = verify(token)
                return User.findOne(id)
            }
        }
        return undefined
    }
})

setupDb()
    .then(() => app.listen(port, () => console.log(`Listening on port ${port}`))
        .catch(err => console.error(err)));
