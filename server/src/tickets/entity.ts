import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import {BaseEntity} from "typeorm/repository/BaseEntity";
import User from '../users/entity';
import Comment from '../comments/entity';
import Event from '../events/entity';

@Entity()
export default class Ticket extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    picture: string

    @Column('int')
    price: number

    @Column({nullable: true})
    endDate: Date

    @OneToMany(() => Comment, comment => comment.ticket)
    comments: Comment[]

    @ManyToOne(() => Event, event => event.tickets)
    event: Event

    @ManyToOne(() => User, user => user.tickets)
    user: User

}