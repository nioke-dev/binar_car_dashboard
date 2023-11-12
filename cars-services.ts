import { Express, Response, Request } from "express";
import { CarsModel, Cars } from "./models/cars";
import { ValidationError } from "objection";
import Redis from "ioredis";

const redis = new Redis();

export class CarsService {
  app: Express;

  constructor(app: Express) {
    this.app = app;
  }

  init() {
    this.app.get("/", this.home);
    this.app.get("/cars", this.getMany);
    this.app.post("/", this.create);
    this.app.get("/:id", this.getOne);
    this.app.patch("/:id", this.patch);
    this.app.delete("/:id", this.delete);
  }

  async home(req: Request, res: Response) {
    res.render('index');
  }

  async getMany(req: Request, res: Response) {
    const { tipeDriver } = req.query;
    const { tanggal } = req.query;
    const { waktuJemput } = req.query;
    const { jumlahpenumpang } = req.query;
    const key = `cars:${JSON.stringify(req.query)}`;
    
      const qCars = CarsModel.query();
      
      if (jumlahpenumpang) {        
        qCars.where("capacity", ">", +jumlahpenumpang);
        // qCars.whereRaw("DATE(\"availableAt\") = ?", [tanggal]);
        qCars.whereRaw("TO_CHAR(\"availableAt\", 'YYYY-MM-DD') = ?", [tanggal]);
        qCars.whereRaw("TO_CHAR(\"availableAt\", 'HH24') > ?", [waktuJemput]);
      }      
      
      const cars = await qCars.debug();
      console.log(cars);
      
      res.render("cars", { cars });    
  }

  
  
  async getOne(req: Request, res: Response) {
    const car = await CarsModel.query().findById(req.params.id);
    res.send(car);
  }

  async create(req: Request<{}, {}, Cars, {}>, res: Response) {
    try {
      const body = {
        ...req.body,
        specs: JSON.stringify(req.body.specs),
        options: JSON.stringify(req.body.options),
      };
      const car = await CarsModel.query().insert(body).returning("*");
      res.send({message: "Success Add Data", data:car});
    } catch (error) {
      if (error instanceof ValidationError) {
        res.send({
          message: error.message,
        });
      }
    }
  }

  async patch(req: Request, res: Response) {
    try {
      let body = {
        ...req.body,
        specs: JSON.stringify(req.body.specs),
        options: JSON.stringify(req.body.options),
      };
       
      await CarsModel.query().findById(req.params.id).patch(body);
  
      const updatedCar = await CarsModel.query().findById(req.params.id);
  
      if (!updatedCar) {
        return res.status(404).send({ message: 'Car not found' });
      }
  
      res.send({message: 'Car Updated successfully', data: updatedCar});
    } catch (error) {
      console.error('Error in patch:', error);
      if (error instanceof ValidationError) {
        res.status(400).send({
          message: error.message,
        });
      } else {
        res.status(500).send({
          message: 'Internal Server Error',
        });
      }
    }
  }
  
  
  
  
  async delete(req: Request, res: Response) {
    try {
      const car = await CarsModel.query().findById(req.params.id);
      if (!car) {
        return res.status(404).send({ message: 'Car not found' });
      }
  
      await CarsModel.query().deleteById(req.params.id);
  
      res.send({ message: 'Car deleted successfully', deletedCar: car });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send({
          message: error.message,
        });
      } else {
        res.status(500).send({
          message: 'Internal Server Error',
        });
      }
    }
  }
  
}
