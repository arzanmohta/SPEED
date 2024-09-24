import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


/*

Create a .env file in the backend src folder everytime you clone the project
with the following code:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority

where <username> is your mongodb username and <password> is your mongodb password

*/