import {JsonController, Post, Param, Get, Body, Put, NotFoundError} from "routing-controllers";
import User from './entity';

@JsonController()
export default class UserController {

    @Get('/users/:id')
    getUser(@Param('id') id:number){
        return User.findOne(id)
    }

    @Get('/users/')
    async allUsers(){
        const users = await User.findOne()
        return {users}
    }

    @Put('/users/:id')
    async updateUser(@Param('id') id:number, @Body() update:Partial<User>){
        const user = await User.findOne(id)
        if(!user){
            throw new NotFoundError('Cnnot found user')
        } else {
            return User.merge(user, update).save()
        }
    }

    @Post('/users')
    async createUser(@Body() data: User) {
        //const {password, ...rest} = data
        const entity = User.create(data)
        await entity.setPassword(data.password)
        const user = await entity.save()

        return user
    }

  /*  @Authorized()
    @Get('/users/:id')
    getUser(@Param('id') id:number) {
        return User.findOne(id)
    }*/

   /* @Authorized()
    @Get('/users')
    allUsers(){
        return User.find()
    }*/
}