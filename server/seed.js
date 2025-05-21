/******************************************************************************************************/
/****     Database Initialization Script for Gild & Threads E-Commerce Capstone Project           ****/
/****     Populates the PostgreSQL DB with Sample Users and Products                              ****/
/******************************************************************************************************/
const {
    client,
    createTables,
    createUsers,
    createProduct,
    } = require("./db");
  
  const init = async () => {
    await client.connect();
    console.log("connected to database");

  // Create tables (DROP IF EXISTS → CREATE)
    createTables();
    console.log("tables created ");

    // Create sample users
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
      createUsers({
          username: "john.doe@example.com",
          password: "John123",
          admin: false,
          name: "John Doe",
          e_add: "john.doe@example.com",
          m_add: "123 Maple St, Springfield, IL",
          ph_no: 5551234567,
          b_add: "456 Oak St, Springfield, IL"
        }),

      createUsers({
          username: "jane.smith@example.com",
          password: "Jane123",
          admin: false,
          name: "Jane Smith",
          e_add: "jane.smith@example.com",
          m_add: "789 Pine St, Austin, TX",
          ph_no: 5559876543,
          b_add: "321 Cedar St, Austin, TX"
        }),

      createUsers({
          username: "alex.lee@example.com",
          password: "Alex123",
          admin: true,
          name: "Alex Lee",
          e_add: "alex.lee@example.com",
          m_add: "456 Elm St, Denver, CO",
          ph_no: 5556789123,
          b_add: "654 Birch St, Denver, CO"
        }),

      createUsers({
          username: "emma.jones@example.com",
          password: "Emma123",
          admin: false,
          name: "Emma Jones",
          e_add: "emma.jones@example.com",
          m_add: "159 Oakridge Dr, Orlando, FL",
          ph_no: 5552468101,
          b_add: "753 Pineview Dr, Orlando, FL"
        }),

      createUsers({
          username: "michael.brown@example.com",
          password: "Mike123",
          admin: false,
          name: "Michael Brown",
          e_add: "michael.brown@example.com",
          m_add: "908 Cherry Ln, Seattle, WA",
          ph_no: 5551357913,
          b_add: "120 Walnut Ave, Seattle, WA"
        }),

      createUsers({
          username: "olivia.taylor@example.com",
          password: "Olivia123",
          admin: false,
          name: "Olivia Taylor",
          e_add: "olivia.taylor@example.com",
          m_add: "333 Seaside Blvd, Miami, FL",
          ph_no: 5551122334,
          b_add: "444 Bayshore Dr, Miami, FL"
        }),

      createUsers({
          username: "william.clark@example.com",
          password: "Will123",
          admin: false,
          name: "William Clark",
          e_add: "william.clark@example.com",
          m_add: "222 Brookside Dr, Portland, OR",
          ph_no: 5556677889,
          b_add: "333 Highland Ave, Portland, OR"
        }),

      createUsers({
          username: "ava.martin@example.com",
          password: "Ava123",
          admin: false,
          name: "Ava Martin",
          e_add: "ava.martin@example.com",
          m_add: "144 Sunrise Ln, Tucson, AZ",
          ph_no: 5557788990,
          b_add: "899 Sunset Blvd, Tucson, AZ"
        }),

      createUsers({
          username: "james.wilson@example.com",
          password: "James123",
          admin: true,
          name: "James Wilson",
          e_add: "james.wilson@example.com",
          m_add: "310 Mountain View Rd, Boulder, CO",
          ph_no: 5554455667,
          b_add: "760 Valley Rd, Boulder, CO"
        }),

      createUsers({
          username: "sophia.davis@example.com",
          password: "Sophia123",
          admin: false,
          name: "Sophia Davis",
          e_add: "sophia.davis@example.com",
          m_add: "998 Riverbend Way, Charlotte, NC",
          ph_no: 5559988776,
          b_add: "109 Greenway Dr, Charlotte, NC"
        }),

      ]);
    // Create sample products
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
    createProduct({
        description: "Gold ring with 4 sides craved",
        image_url: "https://images.unsplash.com/photo-1655707063473-3ee2e5b5eeb8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 120.00,
        category: "ring"
    }),
    createProduct({
        description: "Close-up of a silver ring with intricate design",
        image_url: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516",
        price: 95.00,
        category: "ring"
    }),
    createProduct({
        description: "Couple of ring with Diamond in the center",
        image_url: "https://images.unsplash.com/photo-1662376992957-8e3a5cf91c69?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 400.00,
        category: "ring"
    }),
    createProduct({
        description: "Small stones diamond ring",
        image_url: "https://images.unsplash.com/photo-1679156271376-3a69ba96a2dc?q=80&w=2480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 300.00,
        category: "ring"
    }),
    createProduct({
        description: "Silver ring with gemstones",
        image_url: "https://images.unsplash.com/photo-1561995734-ef4b62bb6586?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 100.00,
        category: "ring"
    }),
    createProduct({
         description: "Diamond hoop earring", 
         image_url: "https://plus.unsplash.com/premium_photo-1680181362119-5c9bf196805f?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" , 
         price: 180.00,
         category: "earring"
    }),
     createProduct({
         description: "Crystal drop earring", 
         image_url: "https://images.unsplash.com/photo-1674329042475-de1a95b4ca62?q=80&w=2674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" , 
         price: 100.00,
         category: "earring"
    }),
    createProduct({
         description: "Green emrald with diamond around earring", 
         image_url: "https://plus.unsplash.com/premium_photo-1681276170598-8ad7feaf918e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" , 
         price: 600.00,
         category: "earring"
    }),
    createProduct({
         description: "Pearl earring", 
         image_url: "https://images.unsplash.com/photo-1583167616102-d8d4b7d02c6c?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" , 
         price: 600.00,
         category: "earring"
    }),
     createProduct({
         description: "Red & white earring", 
         image_url: "https://images.unsplash.com/photo-1671642883395-0ab89c3ac890?q=80&w=2666&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" , 
         price: 370.00,
         category: "earring"
    }),
    createProduct({
         description: "Antique Jhumka earrings", 
         image_url: "https://images.unsplash.com/photo-1714733831162-0a6e849141be?q=80&w=2635&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" , 
         price: 250.00,
         category: "earring"
    }),
    createProduct({
         description: "Necklace with heart shaped pendant", 
         image_url: "https://plus.unsplash.com/premium_photo-1681276170092-446cd1b5b32d?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" , 
         price: 609.00,
         category: "necklace"
    }),
    createProduct({
         description: "Luxury gold crown necklace", 
         image_url: "https://images.unsplash.com/photo-1685970731194-e27b477e87ba?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" , 
         price: 899.00,
         category: "necklace"
    }),
    createProduct({
         description: "White & Green gemstones necklace", 
         image_url: "https://images.unsplash.com/photo-1721103418939-5112f0ccfac8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" , 
         price: 754.00,
         category: "necklace"
    }),
     createProduct({
         description: "White pearl necklace with stone pendant", 
         image_url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" , 
         price: 476.00,
         category: "necklace"
    }),
     createProduct({
         description: "Antique necklace with earring", 
         image_url: "https://images.unsplash.com/photo-1721034917345-d17c5405ead0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" , 
         price: 1000.00,
         category: "necklace"
    }),
     createProduct({
         description: "Blue, white & red scarf", 
         image_url: "https://images.unsplash.com/photo-1635417198137-75d31b8045e2?q=80&w=2565&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" , 
         price: 100.00,
         category: "scarf"
    }),
     createProduct({
         description: "Blue scarf with gold speckles", 
         image_url: "https://plus.unsplash.com/premium_photo-1672337320487-c8512299699f?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" , 
         price: 190.00,
         category: "scarf"
    }),
      createProduct({
         description: "Brown silk scarf", 
         image_url: "https://images.unsplash.com/photo-1619043599502-b078bb23e34f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" , 
         price: 150.00,
         category: "scarf"
    }),
      createProduct({
         description: "Brown silk scarf", 
         image_url: "https://images.unsplash.com/photo-1619043599502-b078bb23e34f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" , 
         price: 150.00,
         category: "scarf"
    }),
       createProduct({
         description: "Multicolored strap scarf", 
         image_url: "https://images.unsplash.com/photo-1562176603-48b2cf0d96b3?q=80&w=2273&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" , 
         price: 150.00,
         category: "scarf"
    }),
     createProduct({
         description: "Blue & white floral scarf", 
         image_url: "https://images.unsplash.com/photo-1600166942889-b768d22cd037?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" , 
         price: 140.00,
         category: "scarf"
    }),

    
  ]);
  
    await client.end();
  };
  
  init();