# Shopping Cart Application

## Overview
This is a React-based shopping cart application that allows users to add, remove, and manage products in their cart. It also includes authentication handling and checkout functionality.

## Features
- Add and remove items from the cart.
- Manage item quantities.
- Display total cart amount.
- Prevent users from adding more items than available in stock.
- Authentication support using `AuthContext`.
- Checkout functionality using `react-router-dom`.

## Tech Stack
- **Frontend:** React, Context API
- **Routing:** React Router
- **State Management:** useState, useContext
- **Styling:** CSS

## Installation
### Prerequisites
- Node.js and npm installed

### Steps to Run the Project
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/shopping-cart.git
   cd shopping-cart
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Start the application**
   ```sh
   npm run dev
   ```
4. Open `http://localhost:5173/` (if using Vite) in your browser.

## Project Structure
```
📦 shopping-cart
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 Cart.js
 ┃ ┃ ┣ 📜 Product.js
 ┃ ┃ ┗ 📜 Checkout.js
 ┃ ┣ 📂 context
 ┃ ┃ ┣ 📜 AuthContext.js
 ┃ ┃ ┗ 📜 CartContext.js
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📜 Home.js
 ┃ ┃ ┣ 📜 CartPage.js
 ┃ ┃ ┗ 📜 CheckoutPage.js
 ┃ ┣ 📜 App.js
 ┃ ┣ 📜 main.jsx
 ┗ 📜 package.json
```

## Usage
1. **Adding Items to Cart:** Click on the "Add to Cart" button.
2. **Managing Cart:** Increase or decrease item quantity in the cart.
3. **Checkout:** Click the "Checkout" button to proceed.
4. **Stock Limit:** If the user tries to add more than available stock, a message is shown.

## Key Components
- **CartContext.js**: Manages cart state and actions.
- **AuthContext.js**: Handles authentication.
- **Cart.js**: Displays the cart and allows users to update quantities.
- **Checkout.js**: Handles the checkout process.

## Routing
Ensure `react-router-dom` is installed:
```sh
npm install react-router-dom
```
Routes are defined in `App.js`:
```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
```

## Improvements & Future Enhancements
- Backend integration for persistent cart data.
- User authentication with JWT.
- Better UI with a modern design framework.

## Contributing
Feel free to fork the repository and submit pull requests!

## License
This project is open-source under the MIT License.

---

Happy Coding! 🚀

