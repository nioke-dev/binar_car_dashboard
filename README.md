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

ERD<br><br>
![ERD](https://github.com/nioke-dev/binar_car_dashboard/assets/66587167/ecd657d8-b261-4b47-9637-2b84af976a93)

Endpoints<br><br>
1 / GET index view<br>
1 /cars GET Filters cars<br>
2 /:id GET Retrieve car by id<br>
3 / POST Create car<br>
4 /:id PATCH Update car<br>
5 /:id DELETE Delete car<br>

<br>
Orders<br><br>
1	/orders/:id	GET	Retrieve orders BY ID<br>
