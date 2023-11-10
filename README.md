# Express TS Starter

Simple express TS starter!

## How to use?

```
$ npm install
$ npm run dev # run development!
```

## Scripts

```
$ npm run build # build typescript project
$ npm start # run in development mode
```

## Database

```
$ docker compose up -d # run database
$ docker compose down -v # delete database and the volume
```

ERD
![ERD](https://github.com/nioke-dev/binar_car_dashboard/assets/66587167/ecd657d8-b261-4b47-9637-2b84af976a93)

Endpoints
1	/	GET	Retrieve cars
2	/:id	GET	Retrieve car by id
3	/	POST	Create car
4	/:id	PATCH	Update car
5	/:id	DELETE	Delete car


Orders
1	/orders/:id	GET	Retrieve orders BY ID
