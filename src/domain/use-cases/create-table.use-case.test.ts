import { CreateTable } from "./create-table.use-case";

describe('use case: CreateTable', () => {
    
    test('should create table with default values', () => {
        const createTable = new CreateTable();
        const table = createTable.execute({ base: 2 });
        const rows = table.split('\n').length;

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain('2 x 1 = 2');
        expect(table).toContain('2 x 10 = 20');
        expect(rows).toBe(14);
    });

    test('should create table with custom values', () => {
        const createTable = new CreateTable();
        const table = createTable.execute({ base: 2, limit: 5 });
        const rows = table.split('\n').length;

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain('2 x 1 = 2');
        expect(table).toContain('2 x 2 = 4');
        expect(table).toContain('2 x 3 = 6');
        expect(table).toContain('2 x 4 = 8');
        expect(table).toContain('2 x 5 = 10');
        expect(rows).toBe(9);
    });
});