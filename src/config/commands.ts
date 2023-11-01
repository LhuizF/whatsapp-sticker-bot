import fs from 'fs';
import path from 'path';
import { ICommand } from '../interfaces';

interface ICommandObject {
  [key: string]: ICommand;
}

export const getCommands = async () => {
  const commandsFolder = path.join(__dirname, '../', './commands');
  const commands = await Promise.resolve(
    fs.readdirSync(commandsFolder).reduce(
      async (acc, file) => {
        const commands = await acc;
        const CommandClass = (await import(`../commands/${file}`)).default;

        const command: ICommand = new CommandClass();

        commands[command.name] = command;

        return commands;
      },
      Promise.resolve({} as ICommandObject),
    ),
  );

  return commands;
};
