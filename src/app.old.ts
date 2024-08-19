
import fs from 'fs';
import { argsPlugin } from './config/plugins/args.plugin';

interface Props {
    base: number;
    limit: number;
    showTable: boolean;
}
const generateMultiplicationTable = ({ base, limit, showTable }: Props) => {
    let template = '====================================\n';
    template += `           Tabla del ${base}\n`;
    template += '====================================\n\n';

    for (let i = 1; i <= limit; i++) {
        template += `${base} x ${i} = ${base * i}\n`;
    }
    
    if (showTable) console.log(template);

    const outputPath = 'outputs';

    try {
        fs.mkdirSync(outputPath, { recursive: true });
        fs.writeFileSync(`./${outputPath}/tabla-${base}.txt`, template);
    } catch (error) {
        console.log('Error creating directory:', error);
    }
    console.log('File created!')
}

const { b:base, l:limit, s:showTable } = argsPlugin;

generateMultiplicationTable({ base, limit, showTable });