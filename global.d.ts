import { MongoClient } from "mongodb"

declare global {
    namespace globalThis{
        var mongodb: MongoClient
    } 
}