const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  if (!fs.existsSync(dir)) return filelist;
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

const dirs = [
  'public/images',
  'public/images/aprovados',
  'public/images/depoimentos',
  'public/images/vendas-temp'
];

async function convert() {
  console.log("Iniciando OptiSharp-Lite (Engine Local)...");
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isFile());
    
    for (const file of files) {
      if (file === 'ad-4.png') {
        console.log(`Pulando OG_IMAGE: ${file}`);
        continue; // Ignorar OG_IMAGE
      }
      
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const fullPath = path.join(dir, file);
        const webpPath = fullPath.replace(ext, '.webp');
        
        console.log(`Convertendo: ${fullPath} -> ${webpPath}`);
        
        try {
          // Effort 6 = Max compression effort, quality 85 (excelente visual/tamanho)
          await sharp(fullPath)
            .webp({ quality: 85, effort: 6 })
            .toFile(webpPath);
            
          fs.unlinkSync(fullPath); // Deleta original
        } catch (e) {
          console.error(`Erro ao converter ${fullPath}:`, e);
        }
      }
    }
  }
}

convert().then(() => {
  console.log('✅ Otimização WebP Concluída com Sucesso!');
}).catch(console.error);
