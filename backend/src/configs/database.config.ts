import { connect, ConnectOptions } from "mongoose"


export const dbConnect = () =>{
    connect(process.env.MONGO_URL!, {} as ConnectOptions).then(
        ()=>console.log('DB connection successful!')
    ).catch((err)=>{ console.log(err)})
}