class ValidationService {
    private schema: any;
    constructor(schema) {
        this.schema = schema;
    }
    public validate(data) {
        return new Promise((resolve, reject) => {
            var result = {};
            for (const key in this.schema) {
                var response = this.checkProperty(data, this.schema[key]);
                if (!response) {
                    reject(false);
                    return false;
                } else {
                    result[key] = response;
                }
            }
            
            resolve(result);
        });
    }
    private checkProperty(obj, path) {
        path = path.split('.')
        var obj = obj[path.shift()];
        while (obj && path.length) obj = obj[path.shift()];
        return obj;
    }
}
export default ValidationService;