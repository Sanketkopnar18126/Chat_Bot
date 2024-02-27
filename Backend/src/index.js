import ConnectDb from "./db/index.js";
import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

ConnectDb()
   .then(() => {
      app.listen(process.env.PORT || 8003, () => {
         console.log(
            `server start successfull....DbConnect!!!${process.env.PORT}`
         );
      });
   })
   .catch((error) => {
      console.log("Something error occur in Index.js while connect", error);
   });
