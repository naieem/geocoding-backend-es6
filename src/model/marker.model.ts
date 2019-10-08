import * as mongoose from 'mongoose';
class MarkerModel {
    private Schema : any
    constructor() {
        this.Schema = mongoose.Schema;
        return this.init();
    }
    init = () => {
        const markerSchema = new this.Schema({
            _id: String,
            address: String,
            longitude: String,
            latitude:String,
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
                default: Date.now
            }
        }, {_id: false});
        return mongoose.model('marker', markerSchema);
    }
}
export default MarkerModel;