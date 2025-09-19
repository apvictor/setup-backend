#!/usr/bin/env node
import { Command } from 'commander';
import init from '../src/init.js';
import update from '../src/update.js';

const program = new Command();

program
  .name('setup')
  .description('CLI para gerar e atualizar backends Node.js')
  .version('1.0.0');

program
  .command('i')
  .description('Cria um novo projeto backend com estrutura padrão')
  .action(init);

program
  .command('u')
  .description('Atualiza a estrutura do backend existente para a versão mais recente')
  .action(update);

program.parse(process.argv);
