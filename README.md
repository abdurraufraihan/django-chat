# django-chat
A chatting app made with django-rest-framework, django-signal &amp; react.js

![chat](https://user-images.githubusercontent.com/30230336/147493438-86d86809-537b-4779-81e3-74881a54f038.gif)

# Installation Process
To install this app please follow this below steps:
### Run Backend
```
1. Create a virtual environment `virtualenv venv`
2. And activate it `source venv/bin/activate`(for ubuntu) `venv\Scripts\activate`(for windows)
3. Then change the directory to server/ and install dependencies `pip install -r requirements.txt`
4. Migrate to database `python manage.py migrate`
5. Now run the server `python manage.py runserver`
```
### Run Front-end
```
1. Change the directory to clients/
2. Install dependencies `npm install`
3. Now start the server `npm start`
```

Now you'll be redirected to `localhost:3000` Then open two browser window and do the signup with name, email, profile image and start chatting from two different window. 
