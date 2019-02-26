import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {BaseEntity} from "typeorm/repository/BaseEntity";
import {IsEmail, IsString, MinLength} from 'class-validator';
import {Exclude} from 'class-transformer'
import * as bcrypt from 'bcrypt'
import Comment from '../comments/entity';
import Event from '../events/entity';
import Ticket from '../tickets/entity';

@Entity()
export default class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @IsEmail()
    @Column('text', {nullable: true})
    email: string

    @IsString()
    @MinLength(8)
    @Column('text', {nullable: true})
    @Exclude({toPlainOnly: true})
    password: string

    @Column({nullable: true})
    userType: string

    async setPassword(rawPassword: string){
        const hash = await bcrypt.hash(rawPassword,10)
        this.password = hash
    }

    checkPassword(rawPassword: string): Promise<boolean>{
        return bcrypt.compare(rawPassword, this.password)
    }

    @OneToMany(() => Event, event => event.user )
    events: Event[]

    @OneToMany(() => Ticket, ticket => ticket.user)
    tickets: Ticket[]

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[]
}