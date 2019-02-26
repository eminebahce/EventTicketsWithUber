import Comment from './entity';
import {Get, Post, JsonController, Body} from "routing-controllers";

@JsonController()
export default class CommentController {

    @Get('/comments')
    async getComments(){
        const comments = await Comment.find()
        return comments
    }

    @Post('/comments')
    async createComment(@Body() comment:Comment){
        const commentEntity = Comment.create(comment)
        await commentEntity.save()
    }
}