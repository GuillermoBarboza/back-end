const faker = require("faker");

const Seed = (User, Product) => {
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
    console.log(user);
    user.save();
  }

  for (let j = 0; j < 10; j++) {
    const product = new Product({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      image: faker.image.technics(),
      price: faker.commerce.price(),
      stock: Math.floor(Math.random() * 20 + 1),
      featured: false,
      category: "bathroom",
      slug: faker.lorem.slug(),
    });
    product.save();
  }
};

module.exports = { Seed };
