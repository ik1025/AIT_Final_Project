Bracketology

## Overview

Many clubs and organizations, NYU and otherwise, will sometimes host intra-organizational competitions. Clubs on campus like Chess club, or Super Smash Brothers Club will even host full blown tournaments. Keeping track of that information can be a nuisance, and that's what Bracketology hopes to help with.

Bracketology will be a web app where users will be able to register and "log into" a tournament based on a key that will either be given to them by someone who has already registered the tournament, or to them directly by the app if they are the first one to register. From there on, users can see a March Madness style view of their tournament's progress, as well as their current matchup, and any pertinent stats of their upcoming game. As the Tournament progresses, so will the app.

## Data Model

The application will have Users and Tournaments

Each Tournaments May (Should) Have multiple Users

An Example User:

```javascript
{
  username: "User",
  hash: // a password hash,
  tournaments: //an array of keys that would give the users acsess to particular tournaments
}
```

An Example Tournament with Embedded Items:

```javascript
{
  Users: //an array of user objects with usernames, and seeds
  Name: //title of the tournament
}
```


## [Link to Commented First Draft Schema](db.js) 

![Link to Schema](src/db.js)

## Wireframes

![Home Page](documentation/Home_Page.jpg)

![Registration](documentation/Registration_Page.jpg)

![Start up table](documentation/Startup_Table.jpg)

![Table Prompt](documentation/Table_prompt.jpg)
(This would be after the admin presses update, and would cycle through the matches)

![Winner Display](documentation/Display_Winner.jpg)

## Site map

![Site Map](documentation/Site_Map.jpg)

## User Stories or Use Cases

1. As a non-registered user, I can register, and either create a new tournament, or join one.
2. As an admin (someone who starts the tournament) I can edit information, such as who one each round, and update the table.
3. As a non-admin user, I can view the progress of any tournament I'm taking part in.

## Research Topics

(5 points) Integrate user authentication.

(2 points) Use a CSS framework throughout my site.
![Initially used](src/views/layout.hbs)

(3 points) Configuration management.



10 points total out of 8 required points.


## [Link to Initial Main Project File](src/app.js) 


## Annotations / References Used
Code pen used from here to help build the physical bracket:
https://codepen.io/aronduby/pen/qliuj