import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import {BaseEntity} from "typeorm/repository/BaseEntity";
import User from '../users/entity';
import Ticket from '../tickets/entity';

@Entity()
export default class Event extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    picture: string

    @Column()
    startDate: Date

    @Column()
    endDate: Date

    @Column({nullable: true})
    createDate: Date

    @OneToMany(() => Ticket, ticket => ticket.event)
    tickets: Ticket[]

    @ManyToOne(() => User, user => user.events)
    user: User
}

