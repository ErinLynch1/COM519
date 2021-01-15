# COM519

Link to your hosted web application. - https://enigmatic-lowlands-08738.herokuapp.com/
Link to your hosted Git Repository - https://github.com/ErinLynch1/COM519

# Introduction

For this project, I have decided to create a system that will benefit my current job. Currently I work for an electrical contracting company helping to develop their IT systems. One system they do not have in place is a Training system. 

At this moment, the way they track their training, is by storing it all in a large spreadsheet as seen below: 

![Training Matrix](TrainingMatrix-Screenshot.png)

As displayed, this does not work well and none of it is viewable and you are unable to view one person’s training records all at once. It is then making it impossible to track who needs what training and when. On top of this, there is currently only two people within the company that fully understand how the current system works. Hence the pressing need for a new system that is accessible to everyone. 

The plan for this system is to have one main user who is in control of everything. They will be able to add new users, add new training and add new training records. They will also be the only user that will be able to edit/update and delete data from the system. 

All other users will be able to view their training records. In the future, a feature that would be possible to add would be a training catalogue for users to view all the training available and if there is any training, they can complete to further their job role.  Another feature that would be possible for the future is to add photo evidence of the training completion as proof for the user. 

# System Overview

Overall, the system will be quite simple. There will be four main interfaces pages for admin users and three main displays for normal users. All users will have the home page. For main admin users, the home page will display a text box showing the training records that are about to expire so that they can be rebooked. For normal users, this box will display their most recently completed training.  

The next page will be the user’s page. For the admin user, this will display all the users that are on the system. They will also have the ability to add new users, edit current users and delete users when required. For the normal user, this page will just display their user details. 

The next page will be the training page. This page will be for admin user only. This page will display all the different training types that are available. For the admin user, they will be able to add, edit and delete the different types of training available. 
Finally, the last main page will be the records page. This page for the admin user will display each user’s training records. The admin will be able to filter and sort these by user and by training. For normal users this page will display all the training they have completed. 

A high-level overview of how the system functions, you can use screen shots if it helps. You should consider aspects such as:

Briefly describing all datastores including databases, file systems and media data stores Key views and interfaces
Including a diagram of the key system components and how they are linked

# Key Design Decisions

For the first implementation of design, it will be a very simple design. very similar to what we learnt from in class. In the first instance, the design isn't required to be the most important thing and it is more important at this time to ensure that the backend of the system is working. 

When I progress further, I will add design elements for the company such as the logo etc and sort out the table design for them to display better. There are few options of each of the forms for adding and updating information that I would prefer to be drop down options rather than text boxes. Epically for the records form as this is linked to two other tables. 

# Database Design

There are three main tables within my training database. 

The user table stored all the user information. Including log in details that will be set up by the admin user and required to change on first log in. The following details are stored in this table: First Name, Last Name, Job Title, Email, Password and Type of User. For this table all fields are required to be filled out. 

The training table that stores all the different types of qualifications that can be obtained with the roles. The following details are stored in this table: Training Name, Training Provider, Training Type, Valid for year and Valid for month (For example a driving license is valid of 10 years and 0 months). For this table, all fields are required to be filled out. 

The final table is records. This links both the user and the training table together to list all of the training records obtained by the users. This table includes the first and last name from the user table. The training name from the training table and then the valid from (the date achieved) and the valid to date (the date it will expire) For this table, all fields linked to the other tables will be filled out as required. The additional fields of valid from and valid to will not be required as there will be some training records that just have achievement date and no limit in how long it is valid for. 

# Security and Scalability

At this current time, I have not implemented any security features as I ran out of time before submission. The main security feature that I need to add in, is for the password to be random generated instead of hardcoded. Another security feature that I have not added in yet is the option to log in therefore limiting the pages and options that are available for certain users. This is important so that only certain people have the ability to create/edit and delete users from the system. Also, this will help limit the number of records that a user can view. Limited the records only linked to them. 

As for Scalability, as this is a request from an individual company, there is no change for it to reach a wider audience. However, the company are looking into the possibly of creating an app for their employees and they would want this to be reconfigured to be placed on the app. 

# Conclusion and Reflection

In conclusion, I feel I am tried my hardest to bring this project together within the time scale. At time of submission, I am still receiving errors of trying to get the whole applications to run. I am receiving confirmation that the application is built successfully but when loading the webpages, they are not loading. 

Going forward, there are definitely more elements that I need to add to meet what I originally planned to add as well as other elements that will be provided to me from the company, I am creating this for. 
