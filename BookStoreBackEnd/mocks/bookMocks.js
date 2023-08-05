const faker = require('faker');

function generateRandomBookData(numberOfBooks) {
  const booksData = [];

  for (let i = 0; i < numberOfBooks; i++) {
    const book = {
      title: faker.lorem.words(3),
      writer: faker.name.findName(),
      cover_image: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
      point: faker.random.number({ min: 1, max: 50 }),
      discount: faker.random.number({min: 1, max: 99}),
      tag: faker.random.arrayElements(['fiction', 'non-fiction', 'fantasy', 'mystery'], 2),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };

    booksData.push(book);
  }

  return booksData;
}
module.exports =  {generateRandomBookData};