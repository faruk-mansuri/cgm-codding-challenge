
# CGMeetUp Codding Challenge

A brief description of what this project does and who it's for


## Features

- Registration and login
- Light/dark mode toggle
- Upload avatar
- Follow users
- Responsive layout


## API Reference

#### Login user

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email of user |
| `password` | `string` | **Required**. Paswword of user |

#### Login user
```http
  POST /api/auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstName` | `string` | **Required**. firstName of user |
| `lastName` | `string` | **Required**. lastName of user |
| `userName` | `string` | **Required**. userName of user |
| `phoneNumber` | `string` | **Required**. phoneNumber of user |
| `email` | `string` | **Required**. email of user |
| `password` | `string` | **Required**. Paswword of user |

#### Logout

```http
  GET /api/auth/logout
```

#### Follow user

```http
  GET /api/user/follow/${userId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `string` | **Required**. userId to add in following array of currentUser |

#### Update user profile

```http
  GET /api/user/update-user
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `imgUrl`      | `string` | **Required**. imgUrl to upate avatar |

#### getAllUsers(userId, page)

Takes userId and page and users of page excluding current logged in user.

#### currentProfile(userId)

Takes userId and return profile of current logged in user.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL`=mongodb+srv://faruk13:faruk13@cluster0.rhc7b1v.mongodb.net/cgm-codding-challenge?retryWrites=true&w=majority&appName=Cluster0
`JWT_SECRET`=secret123
`JWT_EXPIRES_IN`=30d
`CLOUD_NAME`=dtapameu3
`CLOUD_API_KEY`=261737314885671
`CLOUD_API_SECRET`=DtwqYGxsmPFxU2NZjC0S8tV5zmM

## Installation

Install my-project with npm

```bash
  npm install
  npm run dev
```
    
## Demo

https://cgm-codding-challenge.vercel.app/


## 🚀 About Me
I'm a friendly and dedicated Typescript, Next JS, React, React Native and full-stack developer with over 3 years of immersive learning experience. My journey has equipped me with advanced JavaScript skills and a deep understanding of front-end and back-end technologies by creating 30+ projects. I take pride in creating user-centric applications that seamlessly blend innovation and functionality.

portfolio https://faruk-portfolio-v2.netlify.app/