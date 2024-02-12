## Assignment: Back-end Development for a Book Store Application

### Objective
Design and implement the backend for a book store application, focusing on user management, book management, purchase history, and revenue tracking for authors.
### Entities:
* **Users:**
	- `Types`: Author, Admin, Retail Users
	- `Actions`: Buy books, View purchase history

* **Books:**
	- `bookId` : Unique identifier (e.g., book-1 , book-2 , ...)
	- `authors` : Single or multiple authors
	- `sellCount` : either store in the database or compute dynamically, based on purchase history.
	- `title` : Unique string value -> make sure the title can be used as a slug for the book URL.
	- `description` : Book description
	- `price` : Range value between 100 and 1000

* **Purchase History:**
	- Unique ID format: {{YEAR}}-{{MONTH}}-{{numeric increment id}}
	- `purchaseId` : Unique identifier (e.g., 2021-01-1 , 2021-01-2 , ...)
	- `bookId` : Unique identifier of the book purchased
	- `userId` : Unique identifier of the user who purchased the book
	- `purchaseDate` : Date of purchase
	- `price` : Price of the book at the time of purchase
* **Revenue Tracking for Authors:**
	- Increase in author's revenue on user purchase
	- Notify authors about purchase information
	- Email authors with current month, current year, and total revenue
* **Email Notification:**
	- Use a background job or a message queue to handle email notifications asynchronously.
	- Include relevant purchase information in the email.
	- Add a feature for sending bulk email `notifications` to all the retail users about new book releases. There is one condition like in one minute only `100` `emails` can be sent. So, we need to handle this
	condition.

# Explanation of Project 
### Run the System

Clone the repo and run the command in terminal:

```bash
npm install
```

Sign up as User or Author.

### Explanation of Logic of Sell Count

I am running the cron job to auto-send the mail for the user report. Here I am using the MongoDB aggregate pipeline to compute the sell count value.

### Sending the email to User

An author creates a book and after that, we can send it to all the users. Here I am using the `rabbit MQ` for bulk processing email.

### Describe the Choice to using the Database

Here, I am using MongoDB database to store the data.
I created 5 models to handle this project named
User, Wallet, Transaction, Book, Purchase.

## Schema Structure and Explanation

### User Model

In User model, we are using key which name look like this ->
name, email, password and role 

    0-> Admin, 1-> Author, 2-> Normal User

### Wallet Model
I am using a `wallet model` to store user's balances. User balance stored in `encrypted` format.

### Book Model
I am using a `Book Model` to store all the books with `title`, `description` and `book price`.

### Transaction Model
With the help of `Transaction model`, we can store all the transaction history of `user and author`. It help to get the transaction `sell count` of any `bookes` and generate the report of any `author`.

### Purchase History
This model helps to generate the report of any user. It also helps to how many Books are bought by any user.