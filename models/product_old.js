// const fs = require('fs');
// const path = require('path');
const Cart=require('../models/cart');
const db=require('../util/database')
//const p = path.join(__dirname,'../','data','products.json');

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  //save() {



  
//     getProductsFromFile(products => {

//       if(this.id)
//     {

// const existingProductIndex=products.findIndex(prod => prod.id === this.id);
// const updatedProduct=[...products];
// updatedProduct[existingProductIndex]=this;
// fs.writeFile(p, JSON.stringify(updatedProduct), err => {
//   console.log(err);
// });


//     }
//     else{
//       this.id=Math.random().toString();
//       products.push(this);
//       fs.writeFile(p, JSON.stringify(products), err => {
//         console.log(err);
//       });
      
//     }

    

//     })







  //}
    
     
      save() {
        return db.execute('INSERT INTO product (title, price, description,image_url) VALUES (?, ?, ?, ?)', [this.title, this.price, this.imageUrl, this.description]);
      }
      
     
  

  // static fetchAll(cb) {
  //   getProductsFromFile(cb);
  // }

  static fetchAll()
  {
return db.execute('select * from product');
  }
static deleteById(id)
{
return db.execute('select * from products where id!=?',[id])
}

// static deleteById(id){
//   getProductsFromFile(products=>{
//     const product=products.find(prod=>prod.id===id)
//     if(!product)
//     {
//       return;
//     }
//     const updatedProducts=products.filter(prod=>prod.id!==id);
//     fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
//       if(!err)
//       {
//         Cart.deleteProduct(id,product.price)
//       }
//     })
//   })
// }





  // static findById(id,cb)
  // {
  //   getProductsFromFile(products=>{
  //     const product=products.find(p=>p.id===id)
  //     cb(product);
  //   })
  // }


 

static findById(id) {
  return db.execute('SELECT * FROM products WHERE id = ?', [id]);
}
}
