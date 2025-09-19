import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATES_PATH = path.resolve(__dirname, '../templates/backend');

export default async function init() {
  try {
    const { projectName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Nome do projeto:',
        default: 'meu-backend'
      }
    ]);

    const projectPath = path.resolve(process.cwd(), projectName);

    fs.copySync(TEMPLATES_PATH, projectPath, {
      overwrite: true, filter: (src) => {
        const basename = path.basename(src);
        return !['node_modules', 'dist', '.git'].includes(basename);
      }
    });

    const pkgPath = path.join(projectPath, 'package.json');
    const pkg = fs.readJsonSync(pkgPath);
    pkg.name = projectName;
    fs.writeJsonSync(pkgPath, pkg, { spaces: 2 });

    console.log(`\n✅ Projeto ${projectName} criado com sucesso!`);
    console.log(`\n👉 Entre na pasta: cd ${projectName}`);
    console.log(`👉 Instale dependências: npm install\n`);
  } catch (error) {
    console.error('❌ Erro ao criar projeto:', error.message);
    process.exit(1);
  }
}
