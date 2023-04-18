const Product = require('../models/product');
const Cart=require('../models/cart')

exports.getProducts = (req, res, next) => {
 
    

  Product.findAll().then((products)=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'all products',
      path: '/products'
    });
      }).catch(err=>{
        console.log(err)
      });
  
};
exports.getProduct=(req,res,next)=>{
  const prodId=req.params.productId;
  
  Product.findByPk(prodId).then((product)=>{
  
    res.render('shop/product-detail',{product:product,pageTitle:product.title,path:'/products'})
    
  }).catch((err)=>{
    console.log(err)
  })
}


exports.postCart=(req,res,next)=>{
  const prodId=req.body.productId;
  Product.findById(prodId).then((product)=>{
    if(!product)
    {
    return  res.redirect('/')
    }
  Cart.addProduct(prodId,product.price);
  res.redirect('/cart');
  }).catch(err=>{
    console.log(err)
  })
  
 

}
exports.postCartDeleteProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  Product.findById(prodId,product=>{
    Cart.deleteProduct(prodId,product.price);
    res.redirect('/cart')
  
  })
  
}

exports.getIndex = (req, res, next) => {
  Product.findAll().then((products)=>{
res.render('shop/index', {
  prods: products,
  pageTitle: 'Shop',
  path: '/'
});
  }).catch(err=>{
    console.log(err)
  });
  
  
};



exports.getCart = (req, res, next) => {
  Cart.getCart(cart=>{
    Product.findAll().then(([rows,dataField])=>{
      const cartProducts=[];
      for(pr of rows)
      {
        const cartProductData=cart.products.find(prod=>prod.id===pr.id)
        if(cartProductData)
        {
          cartProducts.push({productData:pr,qty:cartProductData.qty});
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products:cartProducts

      });
  
    }).catch(err=>{
      console.log(err)
    })

   
  })
 
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
}

