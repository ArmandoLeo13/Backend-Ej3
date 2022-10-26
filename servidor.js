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
            nuevaData = JSON.parse(contenido);
        }
        catch (err){
            console.log("linea 14"+err);
        }
        return nuevaData
    }
    async getRandom(){
        try{
            let nuevaData = await this.getAll();
            let longitud = nuevaData.length;
            let ide = Math.floor((Math.random())*longitud)
            let dataCorregida = nuevaData.find(({ id })=> id === ide)
            return dataCorregida
        }
        catch(err){console.log(err)}
    }
    
}

const prue = new Contenedor('productos.txt');
const pro = await prue.getAll();
const proRandom = await prue.getRandom();

app.get('/productos',(req,res)=>{
    res.end(pro);
});

app.get('/productoRandom',(req,res)=>{
    res.end(proRandom);
});

const server = app.listen(PORT, () => {
  
    console.log(`App escuchando el puerto ${server.address().port}`);
  
  });