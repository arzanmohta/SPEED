import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

dotenv.config();


/*

Create a .env file in the backend src folder everytime you clone the project
with the following code:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority

where <username> is your mongodb username and <password> is your mongodb password

*/

/*

Also install dotenv to load environment variables using the following command:

npm install dotenv

*/