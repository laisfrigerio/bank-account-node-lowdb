# Bank Account 🏦

Bank Account API with lowDb

## API 🛣️

### Reset

- POST `/reset`: clean database (db.json)

### Transaction

- POST `/event`: add a new transaction (deposit, withdraw and transfer)

### Balance


- GET `/balance?account_id=1`: get amount from an account

## 🛠️ Stack

- NodeJS: v14
- Express: control routes
- lowDb: json database
- Jest and supertest

## Run

```
    yarn install
    yarn dev
```

## Run Tests

```
    yarn test
    yarn test:coverage
```

## :woman: Author

[@laisfrigerio](https://github.com/laisfrigerio/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE.md file for details