# YogGu

## Introduction
YogGuru is a full stack based application using MERN stack. The application is used to enroll interested students in the Yoga classes as per their selected batch timings on a monthly basis by paying Rs 500 as the enrollment fee. It consists of three React components where one component is the Header and other two are used to ask the person's details and to ask for the payment details respectively.
<br>
### Screenshot of the Home Component
![Screenshot (6)](https://github.com/amanch2209/YogGuru/assets/78231342/a18d86bc-25e9-41af-8c78-4afef30c306d)
<br>

### Screenshot of the Payment Component
![Screenshot (9)](https://github.com/amanch2209/YogGuru/assets/78231342/2684d63f-62af-4dd6-8c35-51578c2a46f6)

## Databases
We have maintained two databases for the two components to store the person's details as well as the payment details. The databases are named as 'logins' and 'payments'. 
<br>
The first database i.e 'logins' has two candidate keys 'Phone Number' and 'Email' where 'Phone Number' is used as the primary key for the database whereas 'Email' is used as the foreign key to set a referential integrity with the 'payments' database.  

### Entity-Relationship Diagram
![Screenshot (5)](https://github.com/amanch2209/YogGuru/assets/78231342/8dcf892a-e2e2-440e-8373-655c15174f7e)

## Assumptions Made
In order to build the application we have made some assumptions for it's smooth performance and to avoid certain ambiguities. 
<br>
1. The first assumption is that the user will fill out the admission every month in order to renew the membership.
2. The user can fill out the form at any day of the month but they have to pay for the entire month.
3. The payment is done automatically once the user enters the payment details and hence there is no payment gateway.


## Validations Done
In order to ensure that there is no data redundancy in the data store via the application certain validations have been done which are mentioned below :
<br>
1. The application ensures that while submitting the data there must not be any empty field if it happens the frontend will give a warning.
   ![Screenshot (7)](https://github.com/amanch2209/YogGuru/assets/78231342/e93e5636-92cd-413d-a207-2a3b7b8875b5)
<br>

2. The age must be between 18 years and 65 years.
![Screenshot (8)](https://github.com/amanch2209/YogGuru/assets/78231342/9f6fa148-14ae-47a6-95e1-1ee69b907099)


   
