import * as faker from 'faker';
import axios from "axios";
import Appconfig from '../config';
import MarkerModel from "../model/marker.model";
import ValidationService from "../validation";
import MarkerSchema from "../validation/schema/marker.schema";

class CrudController {
    private markerModel;
    private geocodeUrl: any;
    constructor() {
        this.markerModel = new MarkerModel();
        this.geocodeUrl = Appconfig.geocodeApi + "?key=" + Appconfig.accessKey + "&address=";
    }
    /**
     * handle route controller call and inserts new marker into database
     */
    addNewMarker = (req: any, res: any) => {
        var address = req.body.address;
        if (address) {
            return this.getLatLong(address)
                .then((response) => {
                    new ValidationService(MarkerSchema).validate(response).then((vResult) => {
                        
                        this.saveMarker(vResult).then((saveResult) => {
                            res.json(200, {
                                status: true,
                                message: "saved successfully",
                                itemId: saveResult['_id']
                            });
                        }).catch((saveError) => {
                            res.json(200, {
                                status: false,
                                message: "Error saving data",
                                errorMessage: saveError

                            });
                        });
                    }).catch((vError) => {
                        res.json(200, {
                            status: false,
                            errorMessage: "Sorry validation error occured"
                        });
                    });
                })
                .catch((error) => {
                    res.json(200, {
                        status: false,
                        errorMessage: error.errorMessage
                    });
                });
        } else {
            res.json(200, {
                status: false,
                errorMessage: "No address provided."
            });
        }
    }
    /**
     * saving new marker
     */
    saveMarker = (data: any) => {
        const markerData = new this.markerModel(data);
        markerData._id = faker.random.uuid();
        return new Promise((resolve, reject) => {
            return markerData.save((err, marker) => {
                if (!err) {
                    resolve(marker);
                } else {
                    reject(err);
                }
            });
        });
    }
    /**
     * get longitude and latitude from address
     */
    getLatLong(address: string) {
        return new Promise((resolve, reject) => {
            axios.get(this.geocodeUrl + address)
                .then(function (response) {
                    if (response && response.status === 200 && response.data.results.length) {
                        resolve(response.data.results[0]);
                    } else {
                        reject({
                            status: false,
                            errorMessage: "No location found"
                        });
                    }
                })
                .catch(function (error) {
                    reject({
                        status: false,
                        errorMessage: error.response.data
                    });
                });
        });
    }
    /**
     * Get Lat long endpoint handler
     */
    getLatLongFromAddress = (req: any, res: any) => {
        const address = req.body.address;
        if (!address) {
            res.json(200, {
                status: false,
                errorMessage: "No address provided"
            });
        } else {
            this.getLatLong(address).then((result) => {
                res.json(200, {
                    status: true,
                    data: result
                });
            }).catch((error) => {
                res.json(200, error);
            });
        }
    }
    /**
     * updating marker data
     */
    updateMarker = (req: any, res: any) => {
        const data = req.body;
        if (!data._id) {
            res.json(200, {
                status: false,
                errorMessage: "Marker Id required to update."
            });
        } else {
            return this.markerModel.updateOne({ _id: data._id }, data, function (err, response) {
                if (!err) {
                    res.json(200, {
                        status: true,
                        data: "Updated successflly"
                    });
                } else {
                    res.json(200, {
                        status: false,
                        errorMessage: err
                    });
                }
            });
        }
    }
    /**
     * getting the list of all marker
     */
    getAllMarker = (req: any, res: any) => {
        return this.markerModel.find({}, (err, marker) => {
            if (marker && marker.length && !err) {
                res.json(200, {
                    status: true,
                    data: marker
                });
            } else {
                res.json(200, {
                    status: false,
                    errorMessage: err
                });
            }
        });
    }
}
export default CrudController;