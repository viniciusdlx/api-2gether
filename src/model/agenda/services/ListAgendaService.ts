import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agenda } from '../entities/Agenda.entity';

@Injectable()
export default class ListAgendaService {
    public constructor(
        @InjectRepository(Agenda)
        private agendaRepository: Repository<Agenda>
    ) {}

    public async execute(params: { id: number }): Promise<any> {
        const users = await this.buildQuery(params);

        return users;
    }

    private async buildQuery(params: { id: number }) {
        const builder = this.agendaRepository
            .createQueryBuilder('agenda')
            .leftJoinAndSelect('agenda.agendaItems', 'agendaItems')
            .where({ id: params.id });

        const [data, total] = (await builder.getManyAndCount()) as any;

        return { data, meta: { total } };
    }
}