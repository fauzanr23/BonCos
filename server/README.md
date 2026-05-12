[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=22924383&assignment_repo_type=AssignmentRepo)
# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

# API Documentation

## Endpoints

List of Available Endpoints:

### Users / Auth

- `POST /add-user`
- `POST /login`

### Cuisines

- `GET /cuisines`
- `POST /cuisines`
- `GET /cuisines/:id`
- `PUT /cuisines/:id`
- `DELETE /cuisines/:id`
- `PATCH /cuisines/:id/imgUrl`

### Categories

- `GET /categories`
- `POST /categories`
- `PUT /categories/:id`

### Public

- `GET /pub/cuisines`
- `GET /pub/cuisines/:id`

---

# USERS / AUTH

## POST /add-user

### Description

Register a new user.

### Request

- Headers
  ```json
  {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  }
  ```
- Body
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "phoneNumber": "string",
    "address": "string",
  }
  ```

### Response

_201 - Created_

- Body
  ```json
  {
    "id": "integer",
    "username": "string",
    "email": "string",
    "role" : "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
  ```

_400 - Bad Request_

- Body 
  ```json
  {
    "message": "Username required!"
  }
  ```
  OR
  ```json
  {
    "message": "Minimum password is 5 characters"
  }
  ```
  OR
  ```json
  {
    "message": "Email invalid"
  }
  ```

---

## POST /login

### Description

Login user.

### Request

- Headers
  ```json
  {
    "Content-Type": "application/json"
  }
  ```
- Body 
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

### Response

_200 - OK_

- Body
  ```json
  {
    "access_token": "string"
  }
  ```

_400 - BadRequest_
- Body
  ```json
  {
    "message": "Password is required"
  }
  ```
  OR
  ```json
  {
    "message": "Email is required"
  }
  ```
_401 - Unauthorized_

- Body
  ```json
  {
    "message": "Invalid email/password"
  }
  ```

---

# CUISINES

## GET /cuisines

### Description

Get all cuisines data

- Headers
  ```json
  {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  }
  ```

### Response

_200 - OK_

- Body (example)
  ```json
  [
    {
        "id": "integer",
        "name": "string",
        "description": "string",
        "price": "integer",
        "imgUrl": "url",
        "CategoryId": "integer",
        "AuthorId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "User": {
            "id": "integer",
            "username": "string",
            "email": "string",
            "role": "string",
            "phoneNumber": "string",
            "address": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    }
  ]
  ```

---

## POST /cuisines

### Description

Create a new cuisine.

### Request

- Headers
  ```json
  {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  }
  ```
- Body 

  ```json
  {
  "name": "string",
  "description": "string",
  "price": "integer",
  "imgUrl": "url",
  "CategoryId": "integer",
  }
  ```

### Response

_201 - Created_

- Body
  ```json
  {
    "id": "integer",
    "name": "string",
    "description": "string",
    "price": "integer",
    "imgUrl": "url",
    "CategoryId": "integer",
    "AuthorId": "integer",
    "updatedAt": "date",
    "createdAt": "date"
  }
  ```

_400 - Bad Request_

- Body 
  ```json
  {
    "message": "Price required!"
  }
  ```
  OR

  ```json
  {
    "message": "Minimum price must be 5000!"
  }
  ```
  OR

  ```json
  {
    "message": "Name required!"
  }
  ```
  OR

  ```json
  {
    "message": "Description required!"
  }
  ```
  OR

  ```json
  {
    "message": "Image required!"
  }
  ```
  OR

  ```json
  {
    "message": "URL needed!"
  }
  ```
  OR

  ```json
  {
    "message": "Category id required!"
  }
  ```

---

## GET /cuisines/:id

### Description

Get cuisine by id.

### Request

- Params
  ```json
  {
    "id": "integer"
  }
  ```
- Headers
  ```json
  {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  }
  ```

### Response

_200 - OK_

- Body 
  ```json
  {
    "id": "integer",
    "name": "string",
    "description": "string",
    "price": "integer",
    "imgUrl": "url",
    "CategoryId": "integer",
    "AuthorId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  }
  ```
_404 - Not Found_

- Body 
  ```json
  {
    "message": "Cuisine Not Found"
  }
  ```

---

## PUT /cuisines/:id

### Description

Update cuisine by id.

### Request

- Params
  ```json
  {
    "id": "integer"
  }
  ```
- Headers
  ```json
  {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  }
  ```
- Body
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "integer",
    "imgUrl": "string",
    "CategoryId": "integer",
  }
  ```

### Response

_200 - OK_

- Body
  ```json
  {
    "id": "integer",
    "name": "string",
    "description": "string",
    "price": "integer",
    "imgUrl": "url",
    "CategoryId": "integer",
    "AuthorId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  }
  ```

_400 - Bad Request_

- Body
   ```json
  {
    "message": "Price required!"
  }
  ```
  OR

  ```json
  {
    "message": "Minimum price must be 5000!"
  }
  ```
  OR

  ```json
  {
    "message": "Name required!"
  }
  ```
  OR

  ```json
  {
    "message": "Description required!"
  }
  ```
  OR

  ```json
  {
    "message": "Image required!"
  }
  ```
  OR

  ```json
  {
    "message": "URL needed!"
  }
  ```
  OR

  ```json
  {
    "message": "Category id required!"
  }
  ```

_404 - Not Found_

- Body
  ```json
  {
    "message": "Cuisine Not Found"
  }
  ```
_403 - Forbidden_

- Body
  ```json
  {
    "message": "You're not authorized"
  }
  ```
---

## DELETE /cuisines/:id

### Description

Delete cuisine by id.

### Request

- Params
  ```json
  {
    "id": "integer"
  }
  ```
- Headers
  ```json
  {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  }
  ```

### Response

_200 - OK_

- Body
  ```json
  {
    "message": "{cuisine.name} success to delete"
  }
  ```

_403 - Forbidden_

- Body
  ```json
  {
    "message": "You're not authorized"
  }
  ```
_404 - Not Found_

- Body
  ```json
  {
    "message": "Cuisine Not Found"
  }
  ```
---
## PATCH /cuisines/:id/imgUrl

### Description

Change URL based on id.

- Params
  ```json
  {
    "id": "integer"
  }
  ```
- Headers
  ```json
  {
    "Content-Type": "multipart/form-data",
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  }
  ```
- Body
  ```json
  {
    "imgUrl": "<image_file>"
  }
  ```
### Response

_200 - OK_

- Body
  ```json
  {
    "message": "Image {cuisine.name} succes to update"
  }
  ```
_400 - Bad Request_

- Body
   ```json
  {
    "message": "Cover Image is required"
  }
  ```

_403 - Forbidden_

- Body
  ```json
  {
    "message": "You're not authorized"
  }
  ```
_404 - Not Found_

- Body
  ```json
  {
    "message": "Cuisine id {id} not found"
  }
  ```
---

# CATEGORIES

## GET /categories

### Description

Get all categories.

- Headers
  ```json
  {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  }
  ```

### Response

_200 - OK_

- Body
  ```json
  [
    {
      "id": "integer",
      "name": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
  ```

---

## POST /categories

### Description

Create a new category.

### Request

- Headers
  ```json
  {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  }
  ```
- Body
  ```json
  {
    "name": "string"
  }
  ```

### Response

_201 - Created_

- Body
  ```json
  {
    "id": "integer",
    "name": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
  ```

_400 - Bad Request_

- Body
   ```json
  {
    "message": "Category name required!"
  }
  ```

---

## PUT /categories/:id

### Description

Update category by id.

### Request

- Params
  ```json
  {
    "id": "integer"
  }
  ```
- Headers
  ```json
  {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  }
  ```
- Body
  ```json
  {
    "name": "string"
  }
  ```

### Response

_200 - OK_

- Body
  ```json
  {
    "id": "integer",
    "name": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "message": "Category name required"
  }
  ```

_404 - Not Found_

- Body
  ```json
  {
    "message": "Category id {id} Not Found"
  }
  ```

---

# PUBLIC

## GET /pub/cuisines

### Description

Public endpoint to get all cuisines.

### Request

- Query
  ```json
  {
    "CatId": "integer"
  }
  ```
  OR
    ```json
  {
    "filterName": "string"
  }
  ```
  OR
    ```json
  {
    "sort": "-{key}"
  }
  ```
  OR
    ```json
  {
    "page": "integer"
  }
  ```
  OR
    ```json
  {
    "limit": "integer"
  }
  ```

### Response

_200 - OK_

- Body
  ```json
  [
    {
      "id": "integer",
      "name": "string",
      "description": "string",
      "price": "integer",
      "imgUrl": "url",
      "CategoryId": "integer",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
  ```

---

## GET /pub/cuisines/:id

### Description

Public endpoint to get cuisine by id.

### Request

- Params
  ```json
  {
    "id": "integer"
  }
  ```

### Response

_200 - OK_

- Body
  ```json
  {
    "id": "integer",
    "name": "string",
    "description": "string",
    "price": "integer",
    "imgUrl": "url",
    "CategoryId": "integer",
    "AuthorId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  }
  ```

_404 - Not Found_

- Body
  ```json
  {
    "message": "Cuisine id {id} Not Found"
  }
  ```
---

## Global Error

### Response

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_500 - Internal Server Error_

- Body
  ```json
  {
    "message": "Internal Server Error"
  }
  ```
