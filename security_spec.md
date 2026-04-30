# Security Specification - Fresh and Frost Enterprise

## Data Invariants
1. Products:
   - Only admins can create, update, or delete products.
   - Anyone can read products.
   - Prices and stock levels must be non-negative.
2. Orders:
   - Anyone can create an order (during checkout).
   - Orders are immutable by customers once created.
   - Only admins can read, update (for status changes), or delete orders.
   - `total` must match the sum of item prices * quantities.
3. Categories:
   - Read-only for everyone, only admin can manage.

## The "Dirty Dozen" Payloads (Denial Tests)
1. Unauthorized Product Creation: A non-admin trying to add a product.
2. Price Injection: Trying to set a product price to -100 or a huge string.
3. Inventory Spoofing: Trying to update stock to 999999 without auth.
4. Order Hijacking: Searching for other people's orders.
5. Order Sabotage: Trying to update an order's status to 'delivered' as a customer.
6. Identity Poisoning: Creating an order with a malicious script in the name.
7. Schema Break: Sending an order without a phone number.
8. Admin Privilege Escalation: Trying to write to an 'admins' collection.
9. System Field Mutation: Trying to manually set `createdAt` in the future.
10. Massive Document ID: Using a 2MB string as a document ID.
11. PII Leak: Authenticated user trying to crawl all user profiles (if we had them).
12. Orphaned Order: Creating an order for a product that doesn't exist (relational sync).

## Test Runner Logic
We will verify that:
- `allow list` on `orders` is restricted to admins.
- `allow create` on `orders` requires valid fields.
- `allow write` on `products` is restricted to `isAdmin()`.

## Rules Overview
- `admins` collection will store admin UIDs.
- `isValidProduct` will check types and ranges.
- `isValidOrder` will check structure and types.
