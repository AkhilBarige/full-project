class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;   // ✅ fixed casing
        this.data = data;
        this.message = message;
        this.success = statusCode < 400; // ✅ fixed typo: was "sucess"
    }
}

export { ApiResponse };