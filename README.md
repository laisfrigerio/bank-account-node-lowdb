# Bank Account 🏦

Bank Account API with lowDb

## 🛠️ Stack

- NodeJS: v14
- yarn: v1.22.5
- Express
- lowDb: json database
- Jest and supertest
- git flow (feature, release, hotfix)

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

## API 🛣️

### Reset

- POST `/reset`: clean database (db.json)

### Transaction

- POST `/event`: add a new transaction (deposit, withdraw or transfer)

### Balance

- GET `/balance?account_id=1`: get amount from an account

## :woman: Author

[@laisfrigerio](https://github.com/laisfrigerio/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE.md file for details