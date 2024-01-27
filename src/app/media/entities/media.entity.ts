import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MediaTypeEnum } from '../enums/media-type.enum';
import { IsOptional } from 'class-validator';


@Entity({ name: 'media' })
export class Media {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: true })
    @IsOptional()
    caption: string;

    @Column({ type: 'enum', enum: MediaTypeEnum, default: MediaTypeEnum.IMAGE })
    mediaType: MediaTypeEnum;

    @Column()
    mediaURL: string;

    @Column({ nullable: true })
    thumbnail: string;

    @Column({ nullable: true })
    alt: string;

    @CreateDateColumn()
    createdAt: Date;

}
