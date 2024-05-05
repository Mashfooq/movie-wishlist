class ApiErrors {
    constructor(statusCode, message = "Something went wrong!", errors = [], data = null, stack = "")
    {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message
        this.success = false;
        this.errors = errors;
        this.stack = stack;
    }
}

export { ApiErrors }
