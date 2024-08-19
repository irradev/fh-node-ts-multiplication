import { argsPlugin } from "./config/plugins/args.plugin";
import { ServerApp } from "./presentation/server-app";

// console.log(process.argv);

// console.log(argsPlugin.b);

(async () => {
    await main();
})();


async function main() {
    const { b:base, l:limit, s:showTable, n:fileName, d:fileDestination } = argsPlugin;
    ServerApp.run({ base, limit, showTable, fileName, fileDestination });
}