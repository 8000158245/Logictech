 **# Time Stories API**

**This Node.js server fetches and extracts the latest stories from Time.com and provides them as a JSON API endpoint.**

## Installation

1. Make sure you have Node.js installed: [https://nodejs.org/](https://nodejs.org/)
2. Clone or download this repository.
3. Navigate to the project directory in your terminal.
4. Run `npm install` to install required dependencies.

## Running the Server

1. In the terminal, run `node index.js`.
2. The server will start running on port 3000 (or the port specified by the `PORT` environment variable).

## Accessing the API

- **Endpoint:** `http://localhost:3000/getTimeStories` (or `http://your-server-ip:3000/getTimeStories`)
- **Method:** GET
- **Response:** JSON array of objects, each containing:
    - `title`: The title of the story.
    - `link`: The full link to the story on Time.com.

## Example Usage

```javascript
fetch('http://localhost:3000/getTimeStories')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Array of story objects
    });
```

## Additional Notes

- The code uses regular expressions to parse the HTML structure of Time.com, which might be subject to changes on the website.
- Consider error handling and rate limiting for robust API usage.
- For production environments, explore more robust web scraping techniques and libraries.
