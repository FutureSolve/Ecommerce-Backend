import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

    @Entity({name:'offer'})
    export class Offer{
        @PrimaryGeneratedColumn('increment')
        @ApiProperty({ example: 1 })
        id: number;
    
        @Column({ nullable: false })
        @ApiProperty({ example: 'title' })
        title: string;
    
        @Column({ nullable: false })
        @ApiProperty({ example: 'desc' })
        desc: string;

        @Column({ nullable: false })
        @ApiProperty({ example: 'pic url' })
        cover: string;

        constructor(partial: Partial<Offer>) {
            Object.assign(this, partial);
        }
    }