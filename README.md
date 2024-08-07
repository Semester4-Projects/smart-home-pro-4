# Intro Smart Home FrontEND: 

The Smart Home Frontend project is designed to enable users to monitor and control their home's temperature remotely. This web-based interface provides remote access to managing and monitoring the temperature of various rooms within a house.

# Getting Started:

To get started with this project on your local machine, follow these steps:

Clone the Repository:

git clone https://github.com/Semester4-Projects/smart-home-pro-4.git

Navigate to the Project Directory:

Change into the project directory where the application is located:

cd smart-home-pro-4

# Install Dependencies:

The project uses Node.js for package management. To install the necessary dependencies, follow these steps:

Ensure you have Docker installed on your machine.

Build and run the Docker container:
docker build -t smart-home-frontend -f frontend/Dockerfile .
docker run -p 3080:3080 smart-home-frontend

Alternatively, you can run the project directly without Docker by using npm:

npm start

This command will launch the application, and you can access it in your web browser at http://localhost:3000

# Key Features of the Project:

The Smart Home Frontend application provides the following functionalities:

Room Temperature Monitoring: View the current temperature of various rooms in your home.
Remote Temperature Control: Adjust the temperature of rooms from anywhere using the web interface.
Temperature History: Maintain a historical record of temperature changes for each room.
Room Management: Add new rooms and delete existing ones as needed.

# Contribution:

Any sort of contribution will be highly appreciated so simply follow the steps like Forking the Repo and create your branch for new feature or bug fix, Make and test your changes, push to the forked repo and finally submit a pull request with the description of the changes.
