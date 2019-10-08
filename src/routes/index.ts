import * as express from 'express';
import MarkerController from '../controller/marker.controller';
class CrudRoute {
    private router: any;
    private markerController: any;
    constructor() {
        this.router = express.Router();
        this.markerController = new MarkerController();
    }
    init() {
        this
            .router
            .get('/', function (req, res, next) {
                res.json(200, { info: "It's working" });
            });
        this
            .router
            .post('/addMarker', this.markerController.addNewMarker);
        this
            .router
            .post('/updateMarker', this.markerController.updateMarker);
        this
            .router
            .get('/allMarker', this.markerController.getAllMarker);
        this
            .router
            .get('/getLatLong', this.markerController.getLatLong);
        return this.router;
    }
}

export default CrudRoute;