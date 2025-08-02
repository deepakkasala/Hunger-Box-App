Login:

- User email,
- Password,
- forgot password

Welcome Page:

1. Select City & Cafeteria
   city drop-down(chennai,hyd,banglore,pune,kolkata,mumbai,cochin....)
   cafeteria drop-down(CDC5 S21 cafe,Five point tuckshop, tecci park...)
2. set this location as default location(checkbox)
3. Proceed button.

Header {location & cafeteria,search,occasion}

- Body:
  <List of stalls>

  - Each stall will have : - image,Name,Rating,Pickup,Pending order status.

- Inside Stall:

  - stall name, Image, rating, button(to switch v/nv)
  - search bar(search food items), filters(Veg/non-veg, price-range)
  - filters (based on food item category)  
    Cards
  - filter name.
  - fav btn, type(veg/non-veg)
  - item_name, add btn,
  - description
  - price

- after choosing food items -> View Cart -> cart-page

- Cart page
  - Location
  - Estimated time,
  - Stall name,
  - (v/nv)List if items [price and quantity +/-],
  - Add instructions
  - Complete your meal with : suggestion cards
  - Total Bill
  - (payment method dropdown)Proceed to pay btn
- Footer:

1. Home(default),
2. History (list of old orders of the logged in user,
   where each order=>[ Stall name,order items,delivery status(delivered/not delivered),items ordered,total price, cafe name, ordered date & time,two buttons(reorder,rate order)]),
3. Cart(),
4. Payments (UPI=>phone-pe,g-pay,add upi, DEBIT/CREDIT CARDS, WALLETS)
5. More [Username,view acc details btn, favorites,help,logout]

- User Model:
  email,
  password,
  role (admin,user,owner)
  location,
  cart,
  payments,

- Stall Model:
  stall name,
  image,
  location,
  city,
  rating,(REALTIME)
  no. of pending orders,(REALTIME)
  pickup status,

- Food Item Model:
  Item,
  description,
  price,
  type (v/nv),
  category,
  favorite user's Ids list,
  No. of items left(REALTIME),
  food preparation time,

- Cart Model:

  - location name,
  - estimated time to enter to cafe based on food preparation time
  - order/delivery status,
  - stall name,
  - items: - item, price, quantity..
  - instructions input
  - payment mode,

- Order Model:
  - location name(id),
  - delivery status(pending/delivered),
  - stall name(id),
  - items: - id-item, price, quantity..(ids,quantities),
  - total price,
  - ordered time,
  - order rating,
