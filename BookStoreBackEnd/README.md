# Books Store Backend

THis project is about the books store

## Getting Started

Install dependencies:
- `npm install`
Run server on port 3001:
- `npm start`
To generate the Swagger API documentation: 
- `npm run swagger-autogen`

TO access Swagger:
- `http://localhost:3001/doc`

Setup Database
- Create Datababse with name bookstore in postrgre
- Go config/config.json and change the username and password of the database

## File Structure

├── config/
│   ├── config.json
├── migrations/
│   ├── 20230804072005-create_books_table.js
├── models/
│   ├── books.ts
│   ├── customer.ts
│   ├── order.ts
├── src/
│   ├── app.ts
│   └── routes/
|   │   ├── index.ts
│   └── controlle/
|   │   ├── bookController.ts
|   │   ├── customerController.ts
|   │   ├── orderController.ts
│   └── entity/
|   │   ├── book.ts
|   │   ├── customer.ts
|   │   ├── order.ts
│   └── repository/
|   │   ├── bookRepository.ts
|   │   ├── customerRepository.ts
|   │   ├── orderRepository.ts
│   └── service/
|   │   ├── bookService.ts
|   │   ├── customerService.ts
|   │   ├── orderService.ts
├── generateSwagger.ts
├── package.json
├── README.md

