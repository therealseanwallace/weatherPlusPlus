# A full-stack weather app built with the MERN stack

## Description

Until now, I'd been following The Odin Project. But getting toward the end of their Javascript track, I didn't feel a lot of enthusiasm for building a project using Firebase.

So, I jumped right into making my own full stack app with an MERN (MongoDB, Express, React, Node) stack.

My backend uses Open Weather Map's One Call API to retrieve data for a city, storing the result in MongoDB via Mongoose. When a user queries the API from the frontend app, the server checks if weather has been obtained for this location recently. If so, it returns the result, otherwise, it gets a new result from Open Weather Map.

The server also implements rate-limiting to stop users from using my allowance of free API requests.

# [Live](https://therealseanwallace.github.io/weatherPlusPlus)

NOTE: Because of the way this app is deployed on Heroku, the first request may be a little slow as the backend starts up!
    
## Learning objectives:
    
  Develop skills in:

  * NodeJS
  * Express and various Express middleware
  * MongoDB and Mongoose
  * Heroku


## Acknowledgements

Frosted Glass Weather Icons by [Rupa Design Works on Figma](https://www.figma.com/community/file/1129401032471958980)

## License

This code is released under the MIT license as follows:

Copyright 2022 Sean Patrick Wallace

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
