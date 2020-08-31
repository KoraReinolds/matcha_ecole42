# [Matcha](https://mskiles-matcha-front.herokuapp.com/login)

# Installation

Project setup

```sh
$ npm install
```

Run development server

```sh
$ npm run serve
```

For production build

```sh
$ npm run build
```

# Features
#### Profile
Every user has following information:  
◦ The gender.  
◦ Sexual preferences.  
◦ A biography.  
◦ A list of interests with tags (ex: #vegan, #geek, #piercing etc...).  
◦ Pictures, max 5, including 1 as profile picture.  
◦ GPS location.  
◦ Fame rating (user activity indicator).  
◦ A list users who looked at his/her profile and who “liked” one.  
![N|Solid](https://res.cloudinary.com/difjb9bq0/image/upload/v1598885182/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2020-08-31_%D0%B2_17.45.57_teeepc.png)

#### Search
Also every user can get a list of suggestions that match his/her profile.  
By default this list show people:  
• from the same geographical area  
• the same ages  
• with appropriate preferences  
• with maximum of common tags.  
The list is sortable and filterable by age, location, “fame rating”, common tags, distance and preferences.
![N|Solid](https://res.cloudinary.com/difjb9bq0/image/upload/v1598884987/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2020-08-31_%D0%B2_17.12.10_xqldsp.png)

#### Chat
When two people “like” each other, they are able to chat.
![Alt Text](https://media.giphy.com/media/Ib0AItRpVTDjPWTDU8/giphy.gif)

#### Notifications
Every user notified in real time of the following events:  
• The user received a “like”.  
• The user’s profile has been visited.  
• The user received a message.  
• A “liked” user “disliked” you.
![Alt Text](https://media.giphy.com/media/XFufpQXMPz0cpSQesc/giphy.gif)

#### Other
App has adaptive design

[deployed version on heroku](https://mskiles-matcha-front.herokuapp.com/login)