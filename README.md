Steps to Run the Project Locally

1. Project Setup:

-> Clone the project repository from GitHub to your local machine.
-> Navigate into the project directory.

2.Install Dependencies:

-> Go into the server directory and install the necessary dependencies for the backend.
-> Then, navigate to the client directory and install the dependencies for the frontend.

3. Configure Environment Variables:

-> Create a .env file in the root of your project to store environment variables such as database connection strings and port numbers.

4. Database Setup:

-> Ensure that you have MySQL installed and running on your machine.
-> Create a new database for the application.
-> If your project uses migrations, run them to set up the database schema.

5.Start the Server:

-> Navigate to the server directory and start the Node.js server to handle backend requests.

6. Start the Client:

-> Open a new terminal, navigate to the client directory, and start the React application to serve the frontend.

7. Access the Application:

-> Open a web browser and go to the specified local address to view the application.

8. Testing Multi-Tenancy:

-> Use the provided credentials to log in as different tenants and test the functionality of the application.

9. Troubleshooting Common Issues:

-> If you encounter errors, check the terminal for server logs and the browser console for any client-side errors.
-> Address any CORS issues by ensuring the server is configured to allow requests from the client.

10. Additional Configuration:

-> If applicable, customize tenant settings or themes as needed for your application.

_________________________________________________________________________________________________________________________________________________________________________________________________________________

SQL Script:

CREATE TABLE Admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE Tenant (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE Vehicle (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tenant_id INT,
  name VARCHAR(255),
  type VARCHAR(255),
  price_per_km DECIMAL(10, 2),
  FOREIGN KEY (tenant_id) REFERENCES Tenant(id) ON DELETE CASCADE
);



