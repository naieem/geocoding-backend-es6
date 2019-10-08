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
     * handle route controller call and then registers user
     */
    addNewMarker = (req: any, res: any) => {
        var address = req.body.address;
        if (address) {
            return axios.get(this.geocodeUrl + address)
                .then((response) => {
                    if (response && response.status === 200 && response.data.results.length) {
                        new ValidationService(MarkerSchema).validate(response.data.results[0]).then((vResult) => {
                            debugger;
                            this.saveMarker(vResult).then((saveResult) => {
                                res.json(200, {
                                    success: true,
                                    message: "saved successfully",
                                    itemId: saveResult['_id']
                                });
                            }).catch((saveError) => {
                                res.json(200, {
                                    success: false,
                                    message: "Error saving data",
                                    errorMessage: saveError

                                });
                            });
                        }).catch((vError) => {
                            res.json(200, {
                                success: false,
                                data: "Sorry validation error occured"
                            });
                        });

                    } else {
                        res.json(200, {
                            success: false,
                            message: "Sorry no information found with the provided address."
                        });
                    }
                })
                .catch((error) => {
                    res.json(200, {
                        success: false,
                        message: "Sorry error occoured.",
                        errorMessae: error
                    });
                });
        } else {
            res.json(200, {
                success: false,
                message: "No address provided."
            });
        }
        // this.checkingExistingUserByEmail(req.body.email, (result : boolean) => {

        //     if (!result) {
        //         this.createNewUser(req.body, (result : any) => {

        //             res.json(200, result);
        //         });
        //     } else {
        //         res.json(200, {message: 'an user already exists with this email'});
        //     }
        // });
    }
    saveMarker = (data) => {
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
    updateMarker = (req: any, res: any) => {
        // let password = bcrypt.hashSync(req.body.password, Appconfig.UserSalt);

        // this.markerModel.find({email:req.body.email,password:password},'email -_id',(err,user)=>{

        //     if(err){
        //         res.json(200,{
        //             status:false,
        //             data:err
        //         });
        //     }
        //     else if(user && user.length){
        //         res.json(200,{
        //             status:true,
        //             data:user
        //         });
        //     }else{
        //         res.json(200,{
        //             status:false,
        //             data:'no user found with the given information'
        //         });
        //     }
        // });
    }
    /**
     * checking if user already exists by given email
     */
    checkingExistingUserByEmail = (email: string, callback) => {
        this
            .markerModel
            .find({
                email: email
            }, (err, user) => {

                if (user && user.length) {
                    return callback(1);
                } else {
                    return callback(0);
                }
            });
    }
    /**
     * creating new user
     */
    deleteMarker = (info: any, callback: any) => {

        // const registermodel = new this.markerModel(info);
        // registermodel._id = faker
        //     .random
        //     .uuid();
        // registermodel.password = bcrypt.hashSync(info.password, Appconfig.UserSalt);
        // return registermodel.save((err, user) => {

        //     if (err) {
        //         return callback({status: 0, ErrorMessage: err});
        //     } else {
        //         return callback({status: true, data: user});
        //     }
        // });
    }
}
export default CrudController;