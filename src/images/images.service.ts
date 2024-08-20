import { Injectable } from '@nestjs/common';
import * as fs  from 'fs';
import * as path from 'path';

@Injectable()
export class ImagesService {
    constructor(){}

    async openFile(file, surname, name){
        const filePath = path.resolve(__dirname, '..', '..', 'public', 'images' , `${surname}${name}_`+file);
        // console.log(fs.readFileSync(filePath))
        return fs.readFileSync(filePath);
    }

    saveImage(file){
        try{
            const random = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            const random2 = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            const filename = random + random2 + '.jpg';
            const filePath = path.resolve(__dirname, '..', '..', 'public', 'images');
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true});
            }
            fs.writeFileSync(path.join(filePath, filename), file.buffer);
            return filename;
        }catch(e){
            return ''
        }
    }

    async saveVideo(file){
        try{
            const random = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            const random2 = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            const filename = random + random2 + '.mp4';
            const filePath = path.resolve(__dirname, '..', '..', 'public', 'images');
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true});
            }
            fs.writeFileSync(path.join(filePath, filename), file.buffer);
            return filename;
        }catch(e){
            return ''
        }
    }

    async saveFile(file, surname: string, name: string){
        try{
            const filename = surname+name+'_'+file.originalname;
            const filePath = path.resolve(__dirname, '..', '..', 'public', 'images');
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true});
            }
            fs.writeFileSync(path.join(filePath, filename), file.buffer);
            
            let nameSave = filename.slice((surname+name+'_').length);

            return nameSave;
        }catch(e){
            return ''
        }
    }

    async delete(name: string){
        fs.unlinkSync("./public/images/"+name);
    }
}
