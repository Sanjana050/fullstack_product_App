const fs=require('fs');
const path=require('path');
const p=path.join(__dirname,'../','data','cart.json');

module.exports=class Cart{
    
    static addProduct(id,productPrice)
    {
        fs.readFile(p,(err,data)=>{
            if (err) {
                console.log('Error reading file:', err);
                return;
            }

            let cart={products:[],totalPrice:0};
            if(!err && data.length>0) {
                cart=JSON.parse(data);
            }

            const existingProductIndex=cart.products.findIndex(p=>
                p.id===id
            )

            const existingProduct=cart[existingProductIndex];
            let updatedProduct;

            if(existingProduct) {
                updatedProduct={...existingProduct}
                updatedProduct.qty=updatedProduct.qty+1;
                cart.products=[...cart.products];
                cart.products[existingProductIndex]=updatedProduct;
            } else {
                updatedProduct={id:id,qty:1};
                cart.products=[...cart.products, updatedProduct];
            }

            cart.totalPrice=cart.totalPrice+ +productPrice;
            fs.writeFile(p,JSON.stringify(cart),(err)=>{
                console.log(err);
            })
        })
    }

    static deleteProduct(id,productPrice){
        fs.readFile(p,(err,data)=>{
            if(err)
            {
                return;

            }
            const updatedCart={...JSON.parse(data)};

           const product=updatedCart.products.find(prod=>prod.id===id);
           if(!product)
           {
            return;
           }


            const productQty=product.productQty;
           updatedCart.products=updatedCart.products.filter(prod=>prod.id!==id);
           updatedCart.totalPrice=updatedCart.totalPrice-productPrice*productQty;
           fs.writeFile(p,JSON.stringify(updatedCart),(err)=>{
console.log(err);
           })
        })

    }

    static getCart(cb){
        fs.readFile(p,(err,data)=>{
            const cart=JSON.parse(data);
            
            if(err)
            {
                cb(null);
            }
            else{
                cb(cart);
            }
        })

    }
}
