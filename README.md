# [Matcha](https://matcha-ecole42.herokuapp.com/login)

# 1. Installation

```sh
export VUE_APP_BACKEND_URL=https://matcha-backend-ecole42.herokuapp.com/
npm install
npm run build
npm run start
```

# 2. Features
#### Login page
When the server starts, about a hundred users are automatically generated. You can enter to the site for each of them with login 'User_(1 - 100)' and password '123'.
Before you login, the browser will try to get your location.
![](https://res.cloudinary.com/difjb9bq0/image/upload/c_scale,w_600/v1618576957/Screenshot_2021-04-16_at_14.12.04_ddc9ap.png)
Even if you deny access to geolocation, the application will recieve your location through Geolocation API.

By default, you can login as User_1. But, if you want, you can register a new user.
![](https://res.cloudinary.com/difjb9bq0/image/upload/c_scale,w_600/v1618577936/Screenshot_2021-04-16_at_15.58.02_v4f7zi.png)

#### Registration page
Unless all fields are filled properly, you won't be able to finish registration.
![](https://res.cloudinary.com/difjb9bq0/image/upload/c_scale,w_600/v1618579543/Screenshot_2021-04-16_at_16.25.14_cqhmzt.png)
If all fields are filled correctly, the "SignUp" button will be activated.
