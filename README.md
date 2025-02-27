# financial-tracker-api
Backend for my financial tracker project.

This project requires utilize my [financial-tracker-front-end](https://github.com/CMBVT2023/financial-tracker-front-end.git) to provide the user interface to ease the interaction with the database.

My backend server requires an .env file to pull the necessary information for the database connection, jwt key, and the port number to launch the server from.
The .process.env file should be used as a template to create the .env file, all you have to do is populate file with your database info, the jwt key you wish to use, and the port you want the server to run on.

The database utilizes two tables, one for storing the user data and another for storing the financial entries.

**users**
- user_id int UN AI PK 
- user_name varchar(45) 
- user_key varchar(255) 
- admin_flag tinyint(1) 
- delete_flag tinyint(1)

These are the columns for the user table, the first three have the not null option enabled, and the last two have the generate option enables with the value set to NULL.
Also, the first two have the unique option enabled as well. Finally, the first column has the unsigned option and primary key option enabled as well.

**financial_entries**
- entry_id int UN AI PK 
- item_name varchar(255) 
- item_cost decimal(10,2) 
- purchased_from varchar(255) 
- entry_date date 
- user_id int UN 
- item_quantity int 
- manufacturer varchar(255) 
- delete_flag tinyint(1)

These are the columns for the user table, the first six have the not null option enabled, and the last three have the generate option enables with the value set to NULL.
Also, the first and fifth column, entry_id and user_id, have the unique option enabled as well. Finally, the first column has the unsigned option and primary key option enabled as well.

The backend server utilizes routers to group together all related endpoints, all financial entry endpoints are located after the "/entries" endpoints and any call to these endpoints requires the user to send back a valid user session in their headers, specifically stored in their authorization header.

The endpoints following the "/user" prefix do not require this header and are used to generate or return a valid user session to allow access to other endpoints. 
