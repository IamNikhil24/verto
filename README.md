Link to drive :- https://drive.google.com/drive/folders/1rKZ1-PEiM9vR8-6BRn2vlBYG73mNQ61s
There is a main video of almost 560 mb the second video is recored as there was a logic issue which I found in 1st video and was fixed in the second video.

Inventory Management System API

A backend API to manage warehouse products.
It supports CRUD operations, inventory stock updates, and low-stock tracking.
It also includes JWT-based authentication and role-based access control:
Admin: Can create, update, delete products and manage stock.
User: Can view products but cannot modify stock.

Auth Routes

POST /api/v1/register
Description: Register a new user (Admin or User)
Controller: register(req, res)

POST /api/v1/login
Description: Login user and return JWT
Controller: login(req, res)

Product Routes

Public Routes (accessible by anyone)

GET /api/v1/products
Description: Get all products
Controller: getProducts(req, res)

GET /api/v1/products/:id
Description: Get a single product by ID
Controller: getProductById(req, res)

Private Routes (Admin only)

POST /api/v1/products
Description: Create a new product
Body: { name, description, stock_quantity, low_stock_threshold }
Controller: createProduct(req, res)

PUT /api/v1/products/:id
Description: Update product fields
Body: { name?, description?, stock_quantity?, low_stock_threshold? }
Controller: updateProduct(req, res)

DELETE /api/v1/products/:id
Description: Delete a product
Controller: deleteProduct(req, res)

POST /api/v1/products/:id/increase
Description: Increase product stock
Body: { quantity }
Controller: increaseStock(req, res)

POST /api/v1/products/:id/decrease
Description: Decrease product stock (cannot go below zero)
Body: { quantity }
Controller: decreaseStock(req, res)

GET /api/v1/products/low/threshold
Description: List products below their low-stock threshold
Controller: getLowStockProducts(req, res)
