import {createRequire} from 'node:module';
import {statSync} from 'node:fs';
import {resolve} from 'node:path';

// Pass the installed sharp package directory; originals are never overwritten.
const require=createRequire(import.meta.url);
const sharp=require(process.argv[2] || 'sharp');
const assets=[
 ['agency-grain.png','agency-grain.webp',1536,68],
 ['entity.png','entity-small.webp',128,82],
 ['embrujo-cover.jpeg','embrujo-cover.webp',1280,85],
 ['menos-dolor-cover.png','menos-dolor-cover.webp',1080,85],
 ['concept-raiz.png','concept-raiz.webp',1440,85],
 ['concept-trama.png','concept-trama.webp',1440,87],
 ['embrujo.jpeg','embrujo-detail.webp',1440,86],
 ['menos-dolor.png','menos-dolor-detail.webp',1080,86],
];
for(const [source,target,width,quality] of assets){
 const from=resolve('public/assets',source),to=resolve('public/assets',target);
 await sharp(from).resize({width,withoutEnlargement:true}).webp({quality,effort:5}).toFile(to);
 console.log(`${source} ${statSync(from).size} -> ${target} ${statSync(to).size}`);
}
