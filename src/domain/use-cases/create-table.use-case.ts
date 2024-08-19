export interface CreateTableUseCase {
    execute(options: CreateTableOptions): string
}

export interface CreateTableOptions {
    base: number
    limit?: number
}

export class CreateTable implements CreateTableUseCase {

    constructor(
        /**
         * DI - Dependency Injection
         */
    ) {}

    execute({ base, limit = 10 }: CreateTableOptions) {
        let template = '====================================\n';
        template += `           Tabla del ${base}\n`;
        template += '====================================\n\n';

        for (let i = 1; i <= limit; i++) {
            template += `${base} x ${i} = ${base * i}\n`;
        }
        return template;
    }
}