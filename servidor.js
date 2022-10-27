const express = require('express');
const fs = require('fs');
const PORT = 8080;
const app = express();

class Contenedor {
    constructor(nombreArchivo){
        this.nombreArchivo='./'+nombreArchivo;
    }
    
    async getAll(){
        let contenido 
        let nuevaData 
        try{
            contenido = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            //nuevaData = JSON.parse(contenido);
        }
        catch (err){
            console.log("linea 14"+err);
        }
        return contenido
    }
    async getRandom(){
        try{
            let nuevaData = await this.getAll();
            let dataCorregida = JSON.parse(nuevaData);
            let longitud = dataCorregida.length;
            let ide = Math.floor((Math.random())*longitud)
            let dataCorregida2 = dataCorregida.find(({ id })=> id === ide)
            let dataFinal = JSON.stringify(dataCorregida2);
            
            return dataFinal
        }
        catch(err){console.log(err)}
    }
    
}

let data = [];
let data2 = [];

(async () => {
    const prue = new Contenedor('productos.txt');
  
    data = await prue.getAll();
    data2 = await prue.getRandom();

  })();

app.get('/productos',(req,res)=>{

    res.end(data);
});

app.get('/productoRandom',(req,res)=>{
    
    res.end(data2);
});

const server = app.listen(PORT, () => {
  
    console.log(`App escuchando el puerto ${server.address().port}`);
  
  });