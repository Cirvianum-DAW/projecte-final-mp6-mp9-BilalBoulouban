const sharp = require('sharp');
const fs = require('fs');

const imagesToOptimize = [
    //cafe
  {
    input: './src/img/cafe/pexels-pratik-gupta-2748538.jpg',
    output: './src/img/cafe/pexels-pratik-gupta-2748538_optimized.jpg',
  },
  {
    input: './src/img/cafe/pexels-valeriia-miller-3020919.jpg',
    output: './src/img/cafe/pexels-valeriia-miller-3020919_optimized.jpg',
  },
  {
    input: './src/img/cafe/04BBF290-02E4-4D86-8BE1-DF0C4F105472.jpeg',
    output: './src/img/cafe/04BBF290-02E4-4D86-8BE1-DF0C4F105472_optimitzed.webp',
  },
  {
    input: './src/img/cafe/pexels-karolina-grabowska-4226806.jpg',
    output:'./src/img/cafe/pexels-karolina-grabowska-4226806_optimitzed.jpg',
  },
  //cake
  {
    input: './src/img/cake/pexels-valeria-boltneva-14107.jpg',
    output: './src/img/cake/pexels-valeria-boltneva-14107_optimitzed.jpg',
  },
  {
    input: './src/img/cake/pexels-valeria-boltneva-827513.jpg',
    output: './src/img/cake/pexels-valeria-boltneva-827513_optimitzed.jpg',
  },
  {
    input: './src/img/cafe/pexels-lisa-fotios-1833320.avif',
    output: './src/img/cafe/pexels-lisa-fotios-1833320_optimitzed.avif',
  }
];

// Función para optimizar una imagen
const optimizeImage = ({ input, output }) => {
  sharp(input)
    .resize({ width: 800 }) 
    .toFile(output, (err, info) => {
      if (err) {
        console.error(`Error al optimizar la imagen ${input}:`, err);
      } else {
        console.log(`Imatge optimizada y guardada correctamente: ${output}`);
        console.log(info);
      }
    });
};

imagesToOptimize.forEach(optimizeImage);


