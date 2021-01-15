# COM519

Link to your hosted web application. - https://enigmatic-lowlands-08738.herokuapp.com/
Link to your hosted Git Repository  - https://github.com/ErinLynch1/COM519

# Introduction

For this project, I have decided to create a system that will benefit my current job. Currently I work for an electrical engineering company helping to develop their IT systems. One system they do not have in place is an Training system. 

At this moment, the way they track their training, is by storing it all in a large spreadsheet as seen below: 

![Training Matrix](TrainingMatrix-Screenshot.png)

As displayed, this does not work well and none of it is viewable and you are unable to view one person’s training records all at once. It is then making it impossible to track who needs what training and when. On top of this, there is currently only two people within the company that fully understand how the current system works. Hence the pressing need for a new system that is accessible to everyone. 

The plan for this system is to have one main user who is in control of everything. They will be able to add new users, add new training and add new training records. They will also be the only user that will be able to edit/update and delete data from the system. 

All other users will be able to view their training records. In the future, a feature that would be possible to add would be a training catalogue for users to view all the training available and if there is any training they can complete to further their job role.  Another feature that would be possible for the future is to add photo evidence of the training completion as proof for the user. 

# System Overview

Overall, the system will be quite simple. There will be four main interfaces pages for admin users and three main displays for normal users. All users will have the home page. For main admin users, the home page will display a text box showing the training records that are about to expire so that they can be rebooked. For normal users, this box will display their most recently completed training.  

The next page will be the user’s page. For the admin user, this will display all the users that are on the system. They will also have the ability to add new users, edit current users and delete users when required. For the normal user, this page will just display their user details. 

The next page will be the training page. This page will be for admin user only. This page will display all the different training types that are available. For the admin user, they will be able to add, edit and delete the different types of training available. 
Finally, the last main page will be the records page. This page for the admin user will display each user’s training records. The admin will be able to filter and sort these by user and by training. For normal users this page will display all the training they have completed. 

A high-level overview of how the system functions, you can use screen shots if it helps. You should consider aspects such as:

Briefly describing all datastores including databases, file systems and media data stores Key views and interfaces
Including a diagram of the key system components and how they are linked

# Key Design Decisions



You should rationalise the choices you made in designing your application.

# Database Design

There are three main tables within my training database. 

The user table stored all the user information. Including log in details that will be set up by the admin user and required to change on first log in. The following details are stored in this table : First Name, Last Name, Job Title, Email, Password and Type of User. For this table all fields are required to be filled out. 

The training table that stores all the different types of qualifications that can be obtained with the roles. The following details are stored in this table: Training Name, Training Provider, Training Type, Valid for year and Valid for month ( For example a driving license is valid of 10 years and 0 months) . For this table, all fields are required to be filled out. 

The final table is record’s. This links both the user and the training table together to list all of the training records obtained by the users. This table includes the first and last name from the user table. The training name from the training table and then the valid from (the date achieved) and the valid to date (the date it will expire) For this table, all fields linked to the other tables will be filled out as required. The additional fields of valid from and valid to will not be required as there will be some training records that just have achievement date and no limit in how long it is valid for. 

# Security and Scalability

Identify in what ways your application is secure and scalable.

# Conclusion and Reflection

Bring the document to a close by tying together the process, and provide me with a brief reflective account of the entire project.
