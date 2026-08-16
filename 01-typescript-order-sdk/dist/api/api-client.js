export class ApiClient {
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
//# sourceMappingURL=api-client.js.map