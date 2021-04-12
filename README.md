# ShareNWWebtool
The Share-Northwest webtool is an infographic webtool designed to give public health professionals in the Pacific Northwest the ability to create effective infographics for professional use. 

In its current form, this webtool gives users the ability to select various infographic elements to include: charts and text elements. Once selected, the user has the ability to move them around the canvas, edit the contents, and remove the element from the infographic. Note that this webtool is very much still in an early development stage. To elaborate, this means that there are features we intend to support that are not currently implemented. In addition, the UI is subject to change.
# Browser Support
Currently, this webtool only supports the Google Chrome browser; however, browser support will be extended to other browsers in the future.
# Getting Started
## Prerequisites 
The only prerequisite this webtool requires is a way to run a server on the localhost. While there are many ways one can accomplish this, I will outline how to use Python to start a website server on the localhost. To install Python, please refer to the following link: https://www.python.org/downloads/. 
## Installation
To install this webtool, simply download this repository and place it into its own folder on your local machine. 
## Running the webtool
To run this webtool, you first need to start a localhost server in Python. To do so, open the terminal (or command prompt on Windows) and go to the folder containing this repository. Once in the folder, type this command `python3 -m http.server`. This command starts a simple webserver on port 8000 of the localhost. To access the webtool, open Google Chrome and type "localhost:8000" and viola, the server is up and running! To exit the server, simply click on the terminal window you used to start the server and press the keys ctrl and c in conjunction to terminate the process. 
# Built Using 
1. Konva.js
2. D3.js
3. Quill.js
4. html2canvas
# Authors
* Dr. Hidy Kong (Project Lead)
* Riley Cullen (Developer)
* Mia Lee (Developer) 
