const faker = require("faker");

const homeAudio = [
  "https://iconic.systems/images/easyblog_articles/11/Blog-High-End-Audio-FINAL.jpg",
  "https://media.angieslist.com/s3fs-public/styles/widescreen_large/public/surround%20sound%20speakers%20and%20TV.jpeg?itok=94QGKhJJ",
  "https://i.insider.com/5b0836901ae66220008b46fa?width=750&format=jpeg&auto=webp",
];
const bathroom = [
  "https://i.pinimg.com/originals/26/8a/19/268a199d479629d55a6a9f7c68f71130.jpg",
  "https://idealbathrooms.ie/wp-content/uploads/2019/01/bathroom-design-dublin.jpg",
  "https://i.pinimg.com/originals/b3/56/df/b356df3b8b9fe2bdd43f9beabea9aa2f.jpg",
];
const kitchen = [
  "https://www.ikea.com/images/a-white-kitchen-with-white-drawers-and-cabinets-with-glass-d-44ee69846ee7b4c479e3b7846fa56216.jpg?f=xxxl",
  "https://www.ikea.com/images/a-kitchen-with-kitchen-doors-in-anthracite-a-walnut-veneer-c-7a0e38fb85f217f2a1d66ed2e0746158.jpg?f=xxxl",
  "https://www.ikea.com/images/a-small-kitchen-with-white-cabinets-at-the-bottom-and-chalk--ee46c2978d4bc358e6bd11a84bbccb99.jpg?f=xxxl",
];

const banner = [homeAudio, bathroom, kitchen];
const bannername = ["home-audio", "bathroom", "kitchen"];

const Seed = (User, Category, Product) => {
  for (let i = 0; i < 5; i++) {
    const user = new User({
      name: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      address: faker.address.streetName(),
      telephone: faker.phone.phoneNumber(),
      password: "1234",
      admin: false,
    });
    user.save();
  }

  for (let j = 0; j < 3; j++) {
    const category = new Category({
      name: bannername[j],
      banner: banner[j],
      productsList: [],
    });

    for (let k = 0; k < 10; k++) {
      const product = new Product({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        image: faker.image.technics(),
        price: faker.commerce.price(),
        stock: Math.floor(Math.random() * 20 + 1),
        featured: false,
        category: category._id,
        slug: faker.lorem.slug(),
      });

      product.save();
      category.productsList.push(product);
    }
    category.save();
  }
};

module.exports = { Seed };
