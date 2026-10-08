-- ====================================================================
-- NEXORA PostgreSQL / Supabase Seed Data
-- ====================================================================

-- 1. SEED CATEGORIES
INSERT INTO categories (id, name, slug, description, icon_name) VALUES
('c1000000-0000-0000-0000-000000000001', 'Laptops', 'laptops', 'High-performance ultra-portables, creator rigs, and workstation notebooks', 'Laptop'),
('c1000000-0000-0000-0000-000000000002', 'Smartphones', 'smartphones', 'Flagship 5G camera smartphones and foldable tech', 'Smartphone'),
('c1000000-0000-0000-0000-000000000003', 'Audio & Headphones', 'audio', 'Audiophile headphones, noise-cancelling earbuds, and wireless soundbars', 'Headphones'),
('c1000000-0000-0000-0000-000000000004', 'Gaming Hardware', 'gaming', 'Consoles, high-refresh rate gaming laptops, mechanical gear, and controllers', 'Gamepad2'),
('c1000000-0000-0000-0000-000000000005', 'Monitors & Displays', 'monitors', 'OLED studio monitors, curved ultrawide displays, and high-DPI panels', 'Monitor'),
('c1000000-0000-0000-0000-000000000006', 'Tablets & E-Readers', 'tablets', 'Productivity tablets, stylus pens, and OLED media tablets', 'Tablet'),
('c1000000-0000-0000-0000-000000000007', 'Smartwatches', 'smartwatches', 'Titanium smartwatches, fitness trackers, and GPS sports watches', 'Watch'),
('c1000000-0000-0000-0000-000000000008', 'Cameras & Vision', 'cameras', 'Mirrorless 4K cameras, vlogging kits, and cinematic lenses', 'Camera'),
('c1000000-0000-0000-0000-000000000009', 'PC Components', 'components', 'Next-gen GPUs, processors, NVMe SSDs, and liquid cooling', 'Cpu'),
('c1000000-0000-0000-0000-000000000010', 'Accessories & Power', 'accessories', 'GaN chargers, docks, ergonomic mechanical keyboards, and mice', 'Zap')
ON CONFLICT (slug) DO NOTHING;

-- 2. SEED BRANDS
INSERT INTO brands (id, name, slug) VALUES
('b1000000-0000-0000-0000-000000000001', 'Apple', 'apple'),
('b1000000-0000-0000-0000-000000000002', 'Samsung', 'samsung'),
('b1000000-0000-0000-0000-000000000003', 'Sony', 'sony'),
('b1000000-0000-0000-0000-000000000004', 'ASUS ROG', 'asus-rog'),
('b1000000-0000-0000-0000-000000000005', 'Dell', 'dell'),
('b1000000-0000-0000-0000-000000000006', 'Google', 'google'),
('b1000000-0000-0000-0000-000000000007', 'Bose', 'bose'),
('b1000000-0000-0000-0000-000000000008', 'Logitech', 'logitech'),
('b1000000-0000-0000-0000-000000000009', 'OnePlus', 'oneplus'),
('b1000000-0000-0000-0000-000000000010', 'Lenovo', 'lenovo'),
('b1000000-0000-0000-0000-000000000011', 'Nothing', 'nothing'),
('b1000000-0000-0000-0000-000000000012', 'PlayStation', 'playstation'),
('b1000000-0000-0000-0000-000000000013', 'Anker', 'anker')
ON CONFLICT (slug) DO NOTHING;

-- 3. SEED COUPONS
INSERT INTO coupons (code, discount_type, discount_value, min_order_amount, usage_limit, is_active) VALUES
('WELCOME10', 'percentage', 10.00, 1999.00, 5000, true),
('NEXORA20', 'percentage', 20.00, 9999.00, 1000, true),
('SAVE500', 'fixed', 500.00, 4999.00, 2500, true),
('FESTIVE15', 'percentage', 15.00, 5000.00, 3000, true)
ON CONFLICT (code) DO NOTHING;
