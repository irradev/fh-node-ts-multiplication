import { ArgsPlugin } from "./config/plugins/args.plugin";
import { ServerApp } from "./presentation/server-app";

// console.log(process.argv);

// console.log(argsPlugin.b);

(async () => {
    await main();
})();


async function main() {
    const argsPlugin = new ArgsPlugin();
    const args = argsPlugin.getArgs();
    if (!args) return;
    const { b:base, l:limit, s:showTable, n:fileName, d:fileDestination } = args;
    ServerApp.run({ base, limit, showTable, fileName, fileDestination });
}