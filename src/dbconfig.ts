import * as mongoose from 'mongoose';
import AppConfig from "./config";

class DBconfig {
    private connectionTester : any;
    constructor() {
        mongoose.connect(AppConfig.dbString);
        this.connectionTester = mongoose.connection;
        this.connect();
    }
    private connect = () => {
        this
            .connectionTester
            .on('error', console.error.bind(console, 'connection error:'));
        this
            .connectionTester
            .once('open', function () {
                console.log('connected to db');
            });
    }
}

export default DBconfig;