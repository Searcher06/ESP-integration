# ESP Integration API 🤝

## Overview

This backend service provides a robust and efficient way to seamlessly integrate with popular Email Service Providers (ESPs) like Mailchimp and GetResponse. It enables users to connect their accounts and retrieve audience lists with ease.

## Features

- ✅ **Secure ESP Integration**: Connects to Mailchimp and GetResponse using API keys.
- 📬 **Audience List Retrieval**: Fetches all available audience lists from integrated ESPs.
- 💾 **Integration Management**: Stores and manages ESP connection details in a MongoDB database.
- 🛡️ **Comprehensive Error Handling**: Implements middleware for robust error management, covering API key issues, rate limits, network errors, and invalid requests.

---

# ESP Integration API

## Overview

This project is an Express.js backend API built with Node.js and Mongoose for managing integrations with Email Service Providers (ESPs) such as Mailchimp and GetResponse. It facilitates secure API key-based connections and retrieval of audience lists, persisting integration data in MongoDB.

## Features

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **Axios**: Promise-based HTTP client for making requests to external ESP APIs.
- **dotenv**: Module to load environment variables from a `.env` file.
- **Custom Middleware**: Implements logging and comprehensive error handling for API robustness.

## Getting Started

### Installation

To get a local copy up and running, follow these simple steps.

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Searcher06/ESP-integration.git
    cd ESP-integration
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```

### Environment Variables

Create a `.env` file in the root of your project and add the following required variables:

- `PORT`: The port number on which the server will run.
- `DATABASE_URL`: The MongoDB connection string.

**Example .env:**

```
PORT=8000
DATABASE_URL=mongodb://localhost:27017/esp-integrations
```

## API Documentation

### Base URL

`http://localhost:8000/api/integrations` (assuming `PORT=8000`)

### Endpoints

#### POST /:esp

Integrates with a specified Email Service Provider (ESP) using an API key. Supported ESPs are `mailchimp` and `getresponse`.

**Request**:
`POST /api/integrations/mailchimp` or `POST /api/integrations/getresponse`

**Payload**:

```json
{
  "apiKey": "YOUR_ESP_API_KEY"
}
```

**Required Fields**:

- `apiKey`: String. The API key for the chosen ESP.

**Response**:
**201 Created**

```json
{
  "success": true,
  "message": "Integration with mailchimp connected successfully",
  "provider": "mailchimp",
  "status": "connected"
}
```

**Errors**:

- `400 Bad Request`: `API key is required!`, `Invalid email service provider!`, `[esp] is already integrated`.
- `401 Unauthorized`: `Invalid or expired API key`.
- `429 Too Many Requests`: `Rate limit exceeded. Please try again later.`.
- `503 Service Unavailable`: `Network error: Unable to reach ESP servers.` or `ESP server not reachable.`.
- `500 Internal Server Error`: `Something went wrong!`.

#### GET /:esp/lists

Retrieves all audience lists from an already integrated Email Service Provider (ESP). Supported ESPs are `mailchimp` and `getresponse`.

**Request**:
`GET /api/integrations/mailchimp/lists` or `GET /api/integrations/getresponse/lists`

**Response**:
**200 OK**

```json
{
  "success": true,
  "provider": "mailchimp",
  "lists": [
    {
      "id": "list_id_1",
      "name": "My Audience List",
      "member_count": 1000
      /* ... other ESP-specific list details ... */
    }
  ]
}
```

_Note: The structure of `lists` array will vary based on the specific ESP's API response._

**Errors**:

- `400 Bad Request`: `Invalid email service provider`.
- `404 Not Found`: `No integration found for [esp]. Please connect your account first!`.
- `401 Unauthorized`: `Invalid or expired API key`.
- `429 Too Many Requests`: `Rate limit exceeded. Please try again later.`.
- `503 Service Unavailable`: `Network error: Unable to reach ESP servers.` or `ESP server not reachable.`.
- `500 Internal Server Error`: `Something went wrong!`.

---

## Technologies Used

| Technology | Description                                    | Link                                                             |
| :--------- | :--------------------------------------------- | :--------------------------------------------------------------- |
| Node.js    | JavaScript runtime environment                 | [nodejs.org](https://nodejs.org/)                                |
| Express.js | Web framework for Node.js                      | [expressjs.com](https://expressjs.com/)                          |
| MongoDB    | NoSQL database                                 | [mongodb.com](https://www.mongodb.com/)                          |
| Mongoose   | MongoDB object modeling for Node.js            | [mongoosejs.com](https://mongoosejs.com/)                        |
| Axios      | Promise-based HTTP client                      | [axios-http.com](https://axios-http.com/)                        |
| Dotenv     | Loads environment variables from a `.env` file | [npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv) |

## Usage Examples

Once the server is running and you have configured your environment variables, you can interact with the API using tools like `curl` or Postman.

**1. Integrate with Mailchimp:**

```bash
curl -X POST \
  http://localhost:8000/api/integrations/mailchimp \
  -H 'Content-Type: application/json' \
  -d '{
    "apiKey": "YOUR_MAILCHIMP_API_KEY-us1"
  }'
```

**2. Integrate with GetResponse:**

```bash
curl -X POST \
  http://localhost:8000/api/integrations/getresponse \
  -H 'Content-Type: application/json' \
  -d '{
    "apiKey": "YOUR_GETRESPONSE_API_KEY"
  }'
```

**3. Get Mailchimp Audience Lists:**

```bash
curl -X GET \
  http://localhost:8000/api/integrations/mailchimp/lists
```

**4. Get GetResponse Audience Lists:**

```bash
curl -X GET \
  http://localhost:8000/api/integrations/getresponse/lists
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To contribute:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## Author

- **[Your Name Here]**
  - LinkedIn: [Your LinkedIn Profile]
  - Twitter: [Your Twitter Handle]
  - Portfolio: [Your Portfolio Website]

---

## Badges

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-800000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
