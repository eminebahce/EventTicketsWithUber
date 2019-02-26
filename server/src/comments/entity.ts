import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {BaseEntity} from "typeorm/repository/BaseEntity";
import User from '../users/entity';
import Ticket from '../tickets/entity';

@Entity()
export default class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @Column({nullable: true})
    createDate: Date

    @ManyToOne(() => Ticket, ticket => ticket.comments)
    ticket: Ticket;

    @ManyToOne(() => User, user => user.events)
    user: User;
}