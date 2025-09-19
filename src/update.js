import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { diffLines } from 'diff';
import inquirer from 'inquirer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATES_PATH = path.resolve(__dirname, '../templates/backend');

const IGNORE_DIFF = ['package.json', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'node_modules', 'dist', '.git'];

async function askOverwrite(filePath, differences) {
  const fileName = path.relative(process.cwd(), filePath); // apenas nome relativo
  console.log(`\n⚠️ O arquivo \x1b[33m${fileName}\x1b[0m foi modificado:\n`);

  differences.forEach((part) => {
    const color = part.added ? '\x1b[32m' : part.removed ? '\x1b[31m' : '\x1b[0m';
    process.stdout.write(color + part.value + '\x1b[0m');
  });

  console.log();

  const { overwrite } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'overwrite',
      message: `Deseja sobrescrever \x1b[33m${fileName}\x1b[0m?`,
      default: false,
    },
  ]);

  return overwrite;
}

// Função recursiva para atualizar arquivos
async function updateRecursive(srcDir, destDir) {
  const entries = fs.readdirSync(srcDir);

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry);
    const destPath = path.join(destDir, entry);
    const basename = path.basename(srcPath);

    if (IGNORE_DIFF.includes(basename)) continue;

    if (fs.lstatSync(srcPath).isDirectory()) {
      if (!fs.existsSync(destPath)) fs.mkdirSync(destPath);
      await updateRecursive(srcPath, destPath);
    } else {
      if (fs.existsSync(destPath)) {
        const templateContent = fs.readFileSync(srcPath, 'utf-8');
        const projectContent = fs.readFileSync(destPath, 'utf-8');

        if (templateContent !== projectContent) {
          const differences = diffLines(projectContent, templateContent);
          const overwrite = await askOverwrite(destPath, differences);

          if (overwrite) {
            fs.writeFileSync(destPath, templateContent);
            console.log(`✅ ${destPath} sobrescrito com sucesso!\n`);
          } else {
            console.log(`⏩ Mantido arquivo existente: ${destPath}\n`);
          }
        }
      } else {
        fs.copyFileSync(srcPath, destPath);
        console.log(`📄 Criado novo arquivo: ${destPath}`);
      }
    }
  }
}

export default async function update() {
  try {
    await updateRecursive(TEMPLATES_PATH, process.cwd());
    console.log('\n🔄 Estrutura do backend atualizada com sucesso!\n');
  } catch (error) {
    console.error('❌ Erro ao atualizar o projeto:', error.message);
    process.exit(1);
  }
}
