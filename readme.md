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