# Adopt-a-Pet-Denver

In collaboration with [Drew Wilson](https://github.com/drewrwilson) from Code for America.

###ABOUT
An API to serve data for animals currently in Denver animal shelters ready for adoption.

**Sample JSON response:** 


```javascript
	
	{	
		name: "JERRY",
		pic: "http://www.petharbor.com/get_image.asp?..JPG",
		id: "A215848",
		link: "http://www.petharbor.com/pet.asp?uaid=DNVR.A215848",
		desc: "I am a neutered male, brown and tan Miniature Pinscher.."
	}

```

[Demo](http://adopt-a-pet-denver.herokuapp.com/)

[API](http://adopt-a-pet-denver.herokuapp.com/api)

###CHANGE LOG
- 0.0.1 Adds pet static route 
[API / ID](http://adopt-a-pet-denver.herokuapp.com/api/ID) where ID can be : A215848 or a215848 


*More soon..*

-----------------------

**How to run:**

    npm i # install dependencies
    node app.js # runs server    
    gulp spec # runs tests


