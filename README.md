# Bank Account 🏦

Bank Account API with lowDb

## API 🛣️

Available endponts:

### Reset

- POST `/reset`: to clean database (db.json)

### Transaction

- POST `/event`: to add a new transaction (deposit, withdraw and transfer)

### Account amount


- GET `/balance?account_id=1`: get details from an account

## 🛠️ Stack

- NodeJS: v14
- Express: to control routes
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