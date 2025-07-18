
-- Clear all data from tables (in proper order to respect foreign key constraints)
DELETE FROM public.order_items;
DELETE FROM public.orders;
DELETE FROM public.purchase_order_items;
DELETE FROM public.purchase_orders;
DELETE FROM public.inventory;
DELETE FROM public.customers;
DELETE FROM public.suppliers;
DELETE FROM public.categories;

-- Reset sequences if needed
SELECT setval(pg_get_serial_sequence('public.inventory', 'id'), 1, false);
SELECT setval(pg_get_serial_sequence('public.customers', 'id'), 1, false);
SELECT setval(pg_get_serial_sequence('public.suppliers', 'id'), 1, false);
SELECT setval(pg_get_serial_sequence('public.categories', 'id'), 1, false);
SELECT setval(pg_get_serial_sequence('public.orders', 'id'), 1, false);
SELECT setval(pg_get_serial_sequence('public.order_items', 'id'), 1, false);
SELECT setval(pg_get_serial_sequence('public.purchase_orders', 'id'), 1, false);
SELECT setval(pg_get_serial_sequence('public.purchase_order_items', 'id'), 1, false);
