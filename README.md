# [Matcha](https://matcha-ecole42.herokuapp.com/login)

# 1. Installation

```sh
npm install
npm run build
export VUE_APP_BACKEND_URL=https://matcha-backend-ecole42.herokuapp.com/
npm run start
```

# 2. Features
### Login page
When the server starts, about a hundred users are automatically generated. You can enter to the site for each of them with login 'User_(1 - 100)' and password '123'.
Before you login, the browser will try to get your location.

![](https://res.cloudinary.com/difjb9bq0/image/upload/c_scale,w_600/v1618576957/Screenshot_2021-04-16_at_14.12.04_ddc9ap.png)  
Even if you deny access to geolocation, the application will recieve your location through Geolocation API.

By default, you can login as User_1. But, if you want, you can register a new user.

![](https://res.cloudinary.com/difjb9bq0/image/upload/c_scale,w_600/v1618577936/Screenshot_2021-04-16_at_15.58.02_v4f7zi.png)  

### Registration page
Unless all fields are filled in properly, you won't be able to finish registration.

![](https://res.cloudinary.com/difjb9bq0/image/upload/c_scale,w_600/v1618579543/Screenshot_2021-04-16_at_16.25.14_cqhmzt.png)  
If all fields are filled in correctly, the "SignUp" button will be activated.

### Settings page
![](https://res.cloudinary.com/difjb9bq0/image/upload/c_scale,w_600/v1618673891/Screenshot_2021-04-17_at_18.37.48_cskz8y.png)  

In order for the user to have access to the full functionality of the site he must fill in all additional information about himself
- age (18 - 99 y.o)
- biography (some information about user)
- gender (one of the three genders with which the user identifies himself)
- preferences (the genders that the user wants to see in the search list)
- tag list (list of tags that help the user find people with similar interests)
- popular tags (list of popular tags among other users)
- images (list of images that the user can use as an avatart, the user can delete and set as the main image any added one)  
![](https://res.cloudinary.com/difjb9bq0/image/upload/c_scale,w_600/v1618674819/Screenshot_2021-04-17_at_18.53.13_tezgpe.png)  
Location section displays the current user's geoposition. The server will search for users near this place.
![](https://res.cloudinary.com/difjb9bq0/image/upload/c_scale,w_600/v1618675205/Screenshot_2021-04-17_at_18.59.37_pkw9t9.png)  
If the user wants to find people in another city or country, he can change his position. Also, if he wants to set the current position again, he can do it with one click.
![](https://res.cloudinary.com/difjb9bq0/image/upload/c_scale,w_600/v1618675732/Screenshot_2021-04-17_at_19.08.23_gljlsd.png)  
After filling in all the fields, the user can save the information and get access to the full functionality of the site.
![](https://res.cloudinary.com/difjb9bq0/image/upload/c_scale,w_600/v1618676962/Screenshot_2021-04-17_at_19.28.58_ztjdot.png)  
The full functionality of the site is available now.

### Search page
At this page the user can find other people. The page contains two parts, a list of users and a sidebar with search settings.  
![](https://res.cloudinary.com/difjb9bq0/image/upload/c_scale,w_600/v1618860670/Screenshot_2021-04-19_at_22.30.08_seccjs.png)  
By default the settings are filled in based on user information.
- user preferences
- min age (actual user age - 5)
- max age (actual user age + 5)
- radius (search circle radius)
- min / max rating range
- user's current tags
- different sort params (by distance, age, rating and number of common tags)
- sort order icons (maximum number of common tags -> maximum rating -> nearest users)  
Each user in the list contains information about himself (avatar, last name, first name, age, biography, tags, rating, distance to user, preferences, the user's gender is displayed in color: male - blue, female - red, bisexual - green)  
Each user in the list can be liked or unliked. Also you can see the full user page by clicking on the name.

### User page
![](https://res.cloudinary.com/difjb9bq0/image/upload/c_scale,w_600/v1618913753/Screenshot_2021-04-20_at_13.15.36_zzvrjd.png)  

The user page contains full information about about the user. Also by clicking on the heart icon, you can like or unlike the user.
If users like each other, a chat icon will appear and they can join the chat.

![](https://res.cloudinary.com/difjb9bq0/image/upload/c_scale,w_600/v1618914827/Screenshot_2021-04-20_at_13.31.54_gcynom.png)  

### Chat page
Users can be chat in real time via sockets. When a new message arrives, it immediately appears in the chat. Number of notifications in the header is increased by one and the notification about a new messge appears in the lower right corner of the page.  

![](https://media.giphy.com/media/z7cxQl1o5e3DwpJVoS/giphy.gif)  

### Notification and actions
Each user receives notifications about both new messages and other actions.  
- The user received a “like”  
- The user’s profile has been visited  
- The user received a message  
- A “liked” user “disliked” you  

![](https://res.cloudinary.com/difjb9bq0/image/upload/c_scale,w_400/v1618918906/Screenshot_2021-04-20_at_14.41.06_ra2dvz.png)  

### History and notification pages
All actions that the user performed are on the history page. And all actions that the user was notified are on the notification page.  

![](https://res.cloudinary.com/difjb9bq0/image/upload/c_scale,w_600/v1618920055/Screenshot_2021-04-20_at_15.00.38_hv5u4e.png)  

The number of unread notifications is always displayed in the header.

![](https://res.cloudinary.com/difjb9bq0/image/upload/c_scale,w_400/v1618920049/Screenshot_2021-04-20_at_14.57.20_lidfig.png)  

# [Link to deployed version](https://matcha-ecole42.herokuapp.com/login)
