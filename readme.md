# Product API

This is the API documentation for product Api. This is a mock API, it has the
following endpoints `products, order, users`.It also have both normal route that
can be accessed by anyone and also Protected routes that requires user
Authentication.🔐

**Product Endpoints**

| Endpoints     | Request | Value  |
| ------------- | ------- | ------ |
| /products     | GET     | `json` |
| /products/:id | GET     | `json` |
| /products     | POST    | `json` |
| /products/:id | PATCH   | `json` |
| /products/:id | DELETE  | `json` |

**Order Endpoints**

| Endpoints   | Request | Value  |
| ----------- | ------- | ------ |
| /orders     | GET     | `json` |
| /orders/:id | GET     | `json` |
| /orders     | POST    | `json` |
| /orders/:id | DELETE  | `json` |

This API is simply for learning purposes. If you see anythng i can improve on,
please drop an issue😉
