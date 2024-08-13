# RSS Feed to JSON API

This project provides a simple Node.js server that converts an RSS feed into a JSON API. It uses Express for handling HTTP requests, Axios for fetching the RSS feed, and xml2js for parsing XML to JSON.

## Features

- Fetches an RSS feed from a specified URL.
- Converts the RSS feed XML data to JSON format.
- Exposes the converted JSON data through an API endpoint.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Nitesh-Ranjan-Mohanty/rss-feed-to-json-api.git
    cd rss-feed-to-json-api
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following:

    ```env
    FEED_URI=your_rss_feed_url
    PORT=8000
    ```

    Replace `your_rss_feed_url` with the URL of the RSS feed you want to convert.

## Usage

1. Start the server:

    ```bash
    npm start
    ```

2. The server will run on `http://localhost:8000` (or your specified port). You can access the JSON data at:

    ```
    GET /feed
    ```

   Example:

    ```bash
    curl http://localhost:8000/feed
    ```

   This will return the RSS feed data in JSON format.

## Example Output

```json
[
  {
    "title": "Sample Blog Post",
    "link": "https://example.com/sample-blog-post",
    "author": "John Doe",
    "published": 1627890123456,
    "created": 1627890123456,
    "category": [],
    "content": "<p>This is a sample blog post content.</p>",
    "enclosures": [],
    "content_encoded": "<p>This is a sample blog post content.</p>",
    "media": {}
  }
]
