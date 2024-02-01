// Import necessary modules
const http = require('http');
const https = require('https');
const { StringDecoder } = require('string_decoder');

// Create an HTTP server
const server = http.createServer((req, res) => {
    const targetSite = 'https://time.com/'; // The URL of the website to fetch data from

    // Make an HTTPS GET request to the specified URL
    https.get(targetSite, (response) => {
        let siteData = '';
        const dataDecoder = new StringDecoder('utf-8');

        // Accumulate received data chunks into the 'siteData' variable
        response.on('data', (chunk) => {
            siteData += dataDecoder.write(chunk);
        });

        // When the whole response is received, process the data
        response.on('end', () => {
            siteData += dataDecoder.end();

            // Define regular expressions for extracting information from the HTML content
            const itemRegex = /<li\s+class\s*=\s*"latest-stories__item"[^>]*>(.*?)<\/li>/gs;
            const titleRegex = /<h3\s+class\s*=\s*"latest-stories__item-headline"[^>]*>(.*?)<\/h3>/;
            const linkRegex = /<a\s+href="([^"]*)"[^>]*>/;

            const resultsArray = [];
            let match;

            // Loop through all matches of the 'itemRegex' in the HTML content
            while ((match = itemRegex.exec(siteData)) !== null) {
                const itemContent = match[1];
                const titleMatch = titleRegex.exec(itemContent);
                const linkMatch = linkRegex.exec(itemContent);

                // If title and link matches are found, extract and store the object in the array
                if (titleMatch && linkMatch) {
                    const extractedInfo = {
                        title: titleMatch[1].trim(),
                        link: 'https://time.com' + linkMatch[1],
                    };
                    resultsArray.push(extractedInfo);
                }
            }

            // Set HTTP response headers and send the extracted array data as JSON-formatted string
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(resultsArray));
        });

    }).on('error', (err) => {
        // On error, log the error message and send a 500 status with an error response
        console.error(`Error: ${err.message}`);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Failed to retrieve the webpage. Error: ${err.message}`);
    });
});

// Start the server on port 3000 or use the provided environment variable PORT
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/getTimeStories`);
});
