"""Local CORS demo only. Run: python3 cors-server.py"""
from http.server import BaseHTTPRequestHandler, HTTPServer
import json

ORIGIN = "http://localhost:5504"

class Handler(BaseHTTPRequestHandler):
    def _headers(self, cors=False, preflight=False):
        self.send_response(204 if preflight else 200)
        self.send_header("Content-Type", "application/json")
        if cors:
            self.send_header("Access-Control-Allow-Origin", ORIGIN)
            self.send_header("Vary", "Origin")
        if preflight:
            self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type, X-Lab-Request")
        self.end_headers()

    def do_OPTIONS(self):
        if self.path == "/preflight":
            self._headers(cors=True, preflight=True)
        else:
            self.send_error(404)

    def do_GET(self):
        if self.path not in ("/allowed", "/denied"):
            self.send_error(404)
            return
        self._headers(cors=self.path == "/allowed")
        self.wfile.write(json.dumps({"endpoint": self.path, "message": "Response from port 5505"}).encode())

    def do_POST(self):
        if self.path != "/preflight":
            self.send_error(404)
            return
        size = int(self.headers.get("Content-Length", "0"))
        if size > 4096:
            self.send_error(413)
            return
        self.rfile.read(size)
        self._headers(cors=True)
        self.wfile.write(json.dumps({"message": "Preflight passed and POST completed"}).encode())

if __name__ == "__main__":
    print("CORS lab server at http://localhost:5505")
    HTTPServer(("localhost", 5505), Handler).serve_forever()
