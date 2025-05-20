const {
    client,
    createTables,
    createUsers,
    createProduct,
    fetchUsers,
    fetchProducts,
    fetchUserProducts,
    createUserProducts,
    destroyUserProducts,
    authenticate,
    findUserWithToken,
    signToken
    } = require("./db");
  
  const init = async () => {
    await client.connect();
    console.log("connected to database");
  
    createTables();
    console.log("tables created ");

      const [user1, user2, user3] = await Promise.all([
        createUsers({
          username: "muk@gmail.com",
          password: "Muk1",
          admin: false,
          name: "Muk",
          e_add: "muk@gmail.com",
          m_add: "3435 Payne Dr, San Jose",
          ph_no: 21212121,
          b_add: "767 Albany Dr, San Jose"
        }),
        createUsers({
            username: "sri@gmail.com",
            password: "Sri1",
            admin: true,
            name: "Sri",
            e_add: "sri@gmail.com",
            m_add: "3423 Hyde Dr, San Jose",
            ph_no: 343434334,
            b_add: "3423 Hyde Dr, San Jose"
        }),
        createUsers({
          username: "pari@gmail.com",
          password: "Pari1",
          admin: false,
          name: "Parimala",
          e_add: "pari@gmail.com",
          m_add: "31, Postal drive, San Jose, CA",
          ph_no: 76474586,
          b_add: "31, Postal drive, San Jose, CA"
      }),
      createUsers({
          username: "ethan@gmail.com",
          password: "Ethan1",
          admin: false,
          name: "Ethan",
          e_add: "ethan@gmail.com",
          m_add: "31, Strawberry drive, San Jose, CA",
          ph_no: 65474586,
          b_add: "3891, Hyde drive, San Jose, CA"
      }),
      createUsers({
          username: "ram@gmail.com",
          password: "Ram1",
          admin: true,
          name: "Ram",
          e_add: "ram@gmail.com",
          m_add: "31, Norwalk drive, San Jose, CA",
          ph_no: 65474586,
          b_add: "135, Bowers avenue, San Jose, CA"
      }),
      ]);

      const [product1, product2, product3, product4] = await Promise.all([
        createProduct({
            description: "3 Gold colored studded rings", 
            image_url: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" , 
            price: 50.00,
            category: "ring"
        }),
        createProduct({
            description: "Green batik scarf", 
            image_url: "https://media.istockphoto.com/id/1163936174/photo/patterns-and-colors-of-batik-scarves-fabric-and-textile-background.jpg?s=2048x2048&w=is&k=20&c=apFfyi09uHeHiX7acgmLTx_eD5sgpTcqCbwWNmlLR10=" , 
            price: 20.00,
            category: "scarf"
        }),
        createProduct({
          description: "Red and Green Silk Scarf", 
          image_url: "https://t3.ftcdn.net/jpg/09/05/87/90/240_F_905879026_6aZ0Cf3tSurY5Kq6mKIe8dwSpljBw3uw.jpg" , 
          price: 100.00,
          category: "scarf"
      }),
       createProduct({
         description: "Gold Pendant Necklace", 
         image_url: "https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D" , 
         price: 200.00,
         category: "necklace"
    }),
      createProduct({
         description: "Orange and Green Silk Scarf", 
         image_url: "https://t3.ftcdn.net/jpg/09/31/74/58/240_F_931745834_DWj34eGZpyackm2p1HZJEaj9dy33NjA1.jpg" , 
         price: 50.00,
         category: "scarf"
    }),
       createProduct({
         description: "Orange and Gold Silk scarf", 
         image_url: "https://t3.ftcdn.net/jpg/08/59/39/44/240_F_859394428_FHV4sxCEzWT8gTQo4prui9dWfPak44yu.jpg" , 
         price: 75.00,
         category: "scarf"
    }),
       createProduct({
         description: "2 set of Silk scarf", 
         image_url: "https://t4.ftcdn.net/jpg/08/30/81/53/240_F_830815331_dDEaII8ytQXaT3JVRJk2JwXgJNK2enfW.jpg" , 
         price: 40.00,
         category: "scarf"
    }),
      createProduct({
         description: "Blue and Gold Silk scarf", 
         image_url: "https://t4.ftcdn.net/jpg/03/63/89/41/240_F_363894186_OarHk52b7Tm6es8s6krfzWUYonUadYrs.jpg" , 
         price: 35.00,
         category: "scarf"
    }),
      createProduct({
         description: "Couple Diamond Rings", 
         image_url: "https://t4.ftcdn.net/jpg/01/61/51/83/240_F_161518373_XGGH1iaWGeeqyEdQljXyiYU1pYUAvxeJ.jpg" , 
         price: 400.00,
         category: "ring"
    }),
    createProduct({
         description: "Diamond and Blue Gemstones Earrings", 
         image_url: "https://t3.ftcdn.net/jpg/01/97/26/18/240_F_197261881_faCTOMtH7yGtSOzEkrnGd3ptRLnI4YWZ.jpg" , 
         price: 200.00,
         category: "earring"
    }),
    createProduct({
         description: "Golden ring and pair of earrings with green Emerald and Diamonds gemstones", 
         image_url: "https://as2.ftcdn.net/v2/jpg/02/03/29/87/1000_F_203298773_sIIrPnXZSFgafhA6qjjfSvbDhgQjx6mf.jpg" , 
         price: 250.00,
         category: "earring"
    }),
    createProduct({
         description: "Old moccasins and turquoise necklace", 
         image_url: "https://as1.ftcdn.net/v2/jpg/05/27/37/64/1000_F_527376458_Q9XS3jyrQz8Qj6yr09oplHNsBHRb7MpK.jpg" , 
         price: 150.00,
         category: "necklace"
    }),
     createProduct({
         description: "Pearl necklace", 
         image_url: "https://as1.ftcdn.net/v2/jpg/00/17/27/34/1000_F_17273412_Y9sKXS1Z82ZKSsjCHyZa0oD1NdP8cSi0.jpg" , 
         price: 100.00,
         category: "necklace"
    }),
      createProduct({
         description: "Gold necklace with heart shaped pendant", 
         image_url: "https://as2.ftcdn.net/v2/jpg/01/43/95/55/1000_F_143955590_DrWJeNOrPyOp5QLyAZODORfVGbqYwxp0.jpg" , 
         price: 175.00,
         category: "necklace"
    }),
      createProduct({
         description: "Colorful gemstone ring with a shiny silver band", 
         image_url: "https://as1.ftcdn.net/v2/jpg/11/82/18/30/1000_F_1182183033_cpjbeEMWqVJ6H1X4wRQGJmkvdXaDVWsK.jpg" , 
         price: 90.00,
         category: "ring"
    }),
     createProduct({
         description: "Solitaire diamond engagement ring", 
         image_url: "https://as1.ftcdn.net/v2/jpg/02/47/22/18/1000_F_247221856_CnBMUTmhIlzj79zCP19kRBSINYJimO9p.jpg" , 
         price: 120.00,
         category: "ring"
    }),
    createProduct({
         description: "Elegant ruby stud earrings set in gold", 
         image_url: "https://as2.ftcdn.net/v2/jpg/10/46/63/77/1000_F_1046637719_nkwCEnR9i6ETWYgSAht8KpsCV4l2aUxH.jpg" , 
         price: 140.00,
         category: "earring"
    }),
    createProduct({
         description: "Silver earrings with sapphires", 
         image_url: "https://as2.ftcdn.net/v2/jpg/01/07/01/29/1000_F_107012967_PN2QLTWDLWx0JFzkrhwKBNQmbcCkjnjy.jpg" , 
         price: 65.00,
         category: "earring"
    }),
  ]);
  
    await client.end();
  };
  
  init();