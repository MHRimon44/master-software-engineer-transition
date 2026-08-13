"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClient = void 0;
class ApiClient {
    async get(url) {
        console.log(`GET ${url}`);
        return {
            status: true,
            message: "Success",
            data: [],
        };
    }
    async post(url, body) {
        console.log(`POST ${url}`);
        console.log("Body:", body);
        return {
            status: true,
            message: "Created successfully",
            data: {},
        };
    }
}
exports.ApiClient = ApiClient;
//# sourceMappingURL=api-client.js.map