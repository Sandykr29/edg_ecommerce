MONGO_URI=mongodb+srv:mongodb+srv://sandeep:kumar@cluster0.9rglqlu.mongodb.net/edg_ecom?retryWrites=true&w=majority


{
 "fullName":"tester1",
     "email":"tester1", 
     "password":"tester1" 
}

testing file will be removed 


const baseURL=`https://edg-ecommerce.onrender`;
com/api/products all products


for authRoutes
/api/auth/register
/api/auth/login

for productRoutes

/api/products

for cartRoutes

/api/cart/add
for orderRoutes

/api/orders/place

```
http://localhost:8000/api/auth/register 
{
  "message": "User registered successfully"
}

or
{
    {
  "message": "Email already exists"
}
}

```

```
on login

{
  "userName": "tester3",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWNiYzk3NjUzMmVmOTY3MzZlOWU0YyIsImlhdCI6MTczOTM3NDE1OSwiZXhwIjoxNzM5OTc4OTU5fQ.KWrNM6RWLVD7-0jXTp9NQsmNyCoxkplEWitYp3zLwPw"
}
or
{
  "message": "Invalid email or password"
}

```

