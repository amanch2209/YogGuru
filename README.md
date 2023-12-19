# YogGuru

## Introduction
YogGuru is a full stack based application using MERN stack. The application is used to enroll interested students in the Yoga classes as per their selected batch timings on a monthly basis by paying Rs 500 as the enrollment fee. It consists of three React components where one component is the Header and other two are used to ask the person's details and to ask for the payment details respectively.

## Databases
We have maintained two databases for the two components to store the person's details as well as the payment details. The databases are named as 'logins' and 'payments'. 
<br>
The first database i.e 'logins' has two candidate keys 'Phone Number' and 'Email' where 'Phone Number' is used as the primary key for the database whereas 'Email' is used as the foreign key to set a referential integrity with the 'payments' database.  



## Assumptions Made
In order to build the application we have made some assumptions for it's smooth performance and to avoid certain ambiguities. 
<br>
1. The first assumption is that the user will fill out the admission every month in order to renew the membership.
2. The user can fill out the form at any day of the month but they have to pay for the entire month.
3. The payment is done automatically once the user enters the payment details and hence there is no payment gateway.
