-- Suppliers table
CREATE TABLE IF NOT EXISTS Suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contactPerson VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    itemsSupplied INT DEFAULT 0,
    brand VARCHAR(255),
    provenance VARCHAR(255)
);

-- Supplier-Items relation (optional, for products supplied)
CREATE TABLE IF NOT EXISTS SupplierItems (
    supplierId INT,
    itemId INT,
    PRIMARY KEY (supplierId, itemId),
    FOREIGN KEY (supplierId) REFERENCES Suppliers(id) ON DELETE CASCADE,
    FOREIGN KEY (itemId) REFERENCES Items(id) ON DELETE CASCADE
);
-- Base de datos para el proyecto de inventario
-- Versión compatible con MariaDB/MySQL

DROP TABLE IF EXISTS `Transactions`;
DROP TABLE IF EXISTS `Items`;
DROP TABLE IF EXISTS `Suppliers`;
DROP TABLE IF EXISTS `Users`;

-- Tabla de Usuarios
CREATE TABLE `Users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(50),
    `last_name` VARCHAR(50),
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'staff') DEFAULT 'staff',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Proveedores
CREATE TABLE `Suppliers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL UNIQUE,
    `contact_person` VARCHAR(255),
    `email` VARCHAR(100),
    `phone` VARCHAR(50),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Artículos (Items)
CREATE TABLE `Items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `sku` VARCHAR(255) UNIQUE NOT NULL,
    `description` TEXT,
    `price` DECIMAL(10, 2) NOT NULL,
    `cost` DECIMAL(10, 2),
    `quantity` INT DEFAULT 0,
    `brand` VARCHAR(100),
    `model` VARCHAR(100),
    `status` ENUM('in-stock', 'low-stock', 'out-of-stock', 'discontinued') DEFAULT 'in-stock',
    `supplier_id` INT,
    `provenance` VARCHAR(255),
    `warranty_days` INT DEFAULT 0,
    `image_url` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`supplier_id`) REFERENCES `Suppliers`(`id`)
);

-- Tabla de Transacciones
CREATE TABLE `Transactions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `item_id` INT,
    `user_id` INT,
    `type` ENUM('sale', 'purchase', 'adjustment') NOT NULL,
    `quantity` INT NOT NULL,
    `price` DECIMAL(10, 2),
    `notes` TEXT,
    `transaction_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`item_id`) REFERENCES `Items`(`id`),
    FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`)
);

-- Inserción de datos de ejemplo

-- Proveedores
INSERT INTO `Suppliers` (`id`, `name`) VALUES
(1, 'aliexpress'),
(2, 'alain'),
(3, 'Taller'),
(4, 'Roque'),
(5, 'Rafael'),
(6, 'Jaun Carlos Parqueador'),
(7, 'Habana'),
(8, 'Alexander'),
(9, 'Panama'),
(10, 'adonis'),
(11, 'Andiel');


-- Artículos
INSERT INTO `Items` (`id`, `name`, `sku`, `description`, `supplier_id`, `price`, `status`, `image_url`, `provenance`, `cost`, `warranty_days`, `brand`, `model`, `quantity`) VALUES
(1, 'Cascos para PC mini plug Jack 3.5mm', 'KMOC-S60', 'Cascos para PC mini plug Jack 3.5mm', 5, 30, 'in-stock', 'imagen-1756164342394-5094591.jpg', 'Rafael', 26, 0, 'S60', 'KMOC', 1),
(2, 'Power Bank 10000mAh', 'BUYTITI-10A', 'Power Bank 10000mAh', 5, 22, 'in-stock', 'imagen-1756167024010-836136170.png', 'Rafael', 18, 0, '10A', 'BUYTITI', 1),
(3, 'Kit de Mouse y Teclado (nuevo)', 'LITOY-K1', 'Kit de Mouse y Teclado (nuevo)', 5, 22, 'in-stock', 'imagen-1756167080210-986018439.jpg', 'Rafael', 18, 0, 'K1', 'LITOY', 1),
(4, 'Bocina mediana RGB (1HORA)', '1HORA-MID', 'Bocina mediana RGB (1HORA)', 5, 28, 'in-stock', 'imagen-1756168782086-128185158.jpg', 'Rafael', 24, 0, 'MID', '1HORA', 1),
(5, 'Bocina pequeña (1HORA)', '1HORA-SMALL', 'Bocina pequeña (1HORA)', 5, 22, 'in-stock', 'imagen-1756168822512-125302790.jpg', 'Rafael', 18, 0, 'SMALL', '1HORA', 1),
(6, 'Cable de Disco Duro', 'USB3.0-CMICROB', 'Cable de Disco Duro', 5, 8, 'in-stock', 'imagen-1756169450122-716544640.jpg', 'Rafael', 6, 0, 'CMICROB', 'USB3.0', 1),
(7, 'CARGADOR de 20W tipo C (blanca Litoy)', 'LITOY-CA20W', 'CARGADOR de 20W tipo C (blanca Litoy)', 5, 9, 'in-stock', 'imagen-1756169420547-383554883.jpg', 'Rafael', 6, 0, 'CA20W', 'LITOY', 1),
(8, 'Cargador V8 2.1A (negro Buytiti)', 'BUYTITI-V810W', 'Cargador V8 2.1A (negro Buytiti)', 5, 8, 'in-stock', 'imagen-1756169661636-404872858.jpg', '', 6, 0, 'V810W', 'BUYTITI', 1),
(9, 'Cargador 20W tipo C-tip C(negro 1HORA)', '1HORA-CC20W', 'Cargador 20W tipo C-tip C(negro 1HORA)', 3, 13, 'in-stock', 'imagen-1756170062464-464189099.jpg', 'Rafael', 10, 0, 'CC20W', '1HORA', 1),
(10, 'Cargador de 12W 2.4 (negro 1HORA)', '1HORA-C12W', 'Cargador de 12W 2.4 (negro 1HORA)', 5, 10, 'in-stock', 'imagen-1756169976501-447556214.jpg', 'Rafael', 7, 0, 'C12W', '1HORA', 1),
(11, 'USB 3.0 a SATA (4TB SATA)', 'SATA-SATAUSB3', 'USB 3.0 a SATA (4TB SATA)', 3, 12, 'in-stock', 'imagen-1756170242545-149098840.jpg', 'Rafael', 10, 0, 'SATAUSB3', 'SATA', 1),
(12, 'Covers', 'COVER-COVER1', 'Covers', 5, 5, 'in-stock', 'imagen-1756170435784-982565785.jpg', 'adonis', 1, 0, 'COVER', 'COVER', 1),
(13, 'Cable VGA-HDMI con salida de audio', 'LITOY-MINI', 'Cable VGA-HDMI con salida de audio', 5, 14, 'in-stock', 'imagen-1756171326094-282430610.jpg', 'Rafael', 10, 0, 'MINI', 'LITOY', 1),
(14, 'Tira de LED RGB con mando(5m - 5v)', 'RIDGEWAY-RGB', 'Tira de LED RGB con mando(5m - 5v)', 5, 15, 'in-stock', 'imagen-1756171498591-543879341.jpg', 'Rafael', 12, 0, 'RGB', 'RIDGEWAY', 1),
(15, 'Memoria Kingston 3.2 64gb', 'KINGSTONG-K64GB', 'Memoria Kingston 3.2 64gb', 5, 10, 'in-stock', 'imagen-1756171778807-58327327.jpg', 'Rafael', 8, 0, 'K64GB', 'KINGSTONG', 1),
(16, 'HUB o Regleta de 4 puertos 3.0 (nueva)', 'USBHUB-HUB3', 'HUB o Regleta de 4 puertos 3.0 (nueva)', 5, 12, 'in-stock', 'imagen-1756171875639-742354766.jpg', 'Rafael', 10, 0, 'HUB3', 'USBHUB', 1),
(17, 'Tarjeta MicroSD con adaptador 64gb', 'ADATA-A64GB', 'Tarjeta MicroSD con adaptador 64gb', 5, 9, 'in-stock', 'imagen-1756172995639-660847593.jpg', 'Rafael', 7, 0, 'A64GB', 'ADATA', 1),
(18, 'Mouse inalambrico con receptor y 2 pilas', 'WEIBO-W24', 'Mouse inalambrico con receptor y 2 pilas', 5, 10, 'in-stock', 'imagen-1756172117593-63365139.jpg', 'Rafael', 7, 0, 'W24', 'WEIBO', 1),
(19, 'Cable RCA-RCA (1.5m)', 'RCA-RCA15M', 'Cable RCA-RCA (1.5m)', 3, 7, 'in-stock', 'imagen-1756172223561-493891306.jpg', 'Rafael', 5, 0, 'RCA15M', 'RCA', 1),
(20, 'Cable RCA-Miniplugin (1.5 m)', 'RCA-RCAMP', 'Cable RCA-Miniplugin (1.5 m)', 5, 7, 'in-stock', 'imagen-1756172338184-4581265.jpg', 'Rafael', 5, 0, 'RCAMP', 'RCA', 1),
(21, 'Disco Seagate 1TB laptop etiqueta verde', 'SEAGATE-ST1TB', 'Disco Seagate 1TB laptop etiqueta verde', 5, 25, 'in-stock', 'imagen-1756172501635-321180842.jpg', 'adonis', 12, 0, 'ST1TB', 'SEAGATE', 1),
(22, 'Power Bank 20000mAh', 'SMARTLIKE-20A', 'Power Bank 20000mAh', 10, 35, 'in-stock', 'imagen-1756172726250-174552262.jpg', 'Rafael', 30, 0, '20A', 'SMARTLIKE', 1),
(23, 'DVI-VGA (nuevo)', 'DVIVGA-CDVIVGA', 'DVI-VGA (nuevo)', 5, 7, 'in-stock', 'imagen-1756172846862-508300780.jpg', 'Rafael', 5, 0, 'CDVIVGA', 'DVIVGA', 1),
(24, 'Cable Miniplugin JACK -Miniplugin JACK (1.8m)', 'JACK18-JACK-JACK', 'Cable Miniplugin JACK -Miniplugin JACK (1.8m)', 5, 7, 'in-stock', 'imagen-1756172943755-263147942.jpeg', 'Rafael', 5, 0, 'JACK-JACK', 'JACK18', 1),
(25, 'Audifonos inalambricos rosados', 'INALAMBRICOS-AI-PINK', 'Audifonos inalambricos rosados', 5, 15, 'in-stock', 'imagen-1756173562514-927956703.jpeg', 'Rafael', 12, 0, 'AI-PINK', 'INALAMBRICOS', 1),
(26, 'Transformador 12v 2A de 2 puntas', 'LITOY-T12-2A', 'Transformador 12v 2A de 2 puntas', 3, 10, 'in-stock', 'imagen-1756173721655-892504321.png', 'Rafael', 8, 0, 'T12-2A', 'LITOY', 1),
(27, 'Cable Display Port-Display Port (1.8m)', 'DP-DP-DPDP18', 'Cable Display Port-Display Port (1.8m)', 5, 10, 'in-stock', 'imagen-1756228782648-811378178.jpg', 'Rafael', 8, 0, 'DPDP18', 'DP-DP', 1),
(28, 'Cable USB-HDMI/VGA (3.0 con salida de audio)', 'LITOY-USBVAGA', 'Cable USB-HDMI/VGA (3.0 con salida de audio)', 5, 23, 'in-stock', 'imagen-1756241226731-616345229.jpg', 'Rafael', 20, 0, 'USBVAGA', 'LITOY', 1),
(29, 'Adatador RCA-HDMI', 'MINI-RCAHDMI', 'Adatador RCA-HDMI', 5, 14, 'in-stock', 'imagen-1756173959206-680197170.jpg', 'Rafael', 9, 0, 'RCAHDMI', 'MINI', 1),
(30, 'Adaptador HDMI-RCA', 'MINI-HDMIRCA', 'Adaptador HDMI-RCA', 3, 14, 'in-stock', 'imagen-1756174036384-199500053.jpg', 'Rafael', 12, 0, 'HDMIRCA', 'MINI', 1),
(31, 'Splitter HDMI 1X4 (extensor HDMI)', 'HDTV-HDTV', 'Splitter HDMI 1X4 (extensor HDMI)', 5, 23, 'in-stock', 'imagen-1756228555933-747948077.png', 'Rafael', 20, 0, 'HDTV', 'HDTV', 1),
(32, 'Luces LED RGB 5V con Bluetooth y mando', 'STRICIA-RGBBT', 'Luces LED RGB 5V con Bluetooth y mando', 5, 16, 'in-stock', 'imagen-1756228657658-42863055.jpg', 'Rafael', 14, 0, 'RGBBT', 'STRICIA', 1),
(33, 'Adaptador USB WIFI (300Mbps, 2.4GHz de Pc)', 'WIFI-USB2.0', 'Adaptador USB WIFI (300Mbps, 2.4GHz de Pc)', 5, 10, 'in-stock', 'imagen-1756171660145-566297264.jpeg', 'Rafael', 8, 0, 'USB2.0', 'WIFI', 1),
(34, 'Adaptador USB Bluetooth V5.0 para Pc', 'WUSBDONGLE-BT5', 'Adaptador USB Bluetooth V5.0 para Pc', 3, 10, 'in-stock', 'imagen-1756174123286-349554511.jpg', 'Rafael', 8, 0, 'BT5', 'WUSBDONGLE', 1),
(35, 'Adaptador USB Bluetooth 4.2 + WIFI(150Mbps, 2.4GHz)', 'WIRELESSUSBADAPTER-WIFIBT4.2', 'Adaptador USB Bluetooth 4.2 + WIFI(150Mbps, 2.4GHz)', 5, 14, 'in-stock', 'imagen-1756174265760-51830755.jpg', 'Rafael', 12, 0, 'WIFIBT4.2', 'WIRELESSUSBADAPTER', 1),
(36, 'Receptor AUX Bluetooth con microfono', 'WIRELESSMUSICRECIVER-BTAUX', 'Receptor AUX Bluetooth con microfono', 5, 8, 'in-stock', 'imagen-1756174343524-128792120.jpg', 'Rafael', 5, 0, 'BTAUX', 'WIRELESSMUSICRECIVER', 1),
(37, 'Adaptador USB de audio 7.1', 'USB7.1-USB7.1', 'Adaptador USB de audio 7.1', 5, 9, 'in-stock', 'imagen-1756174426244-538387614.jpg', 'Rafael', 7, 0, 'USB7.1', 'USB7.1', 1),
(38, 'Receptor/Transmisor bluetooth', 'LITOY-Dongle', 'Receptor/Transmisor bluetooth', 5, 12, 'in-stock', 'imagen-1756174729199-317361470.jpeg', 'Rafael', 10, 0, 'Dongle', 'LITOY', 1),
(39, 'Receptor USB Bluetooth', 'LITOY-Receptor', 'Receptor USB Bluetooth', 3, 8, 'in-stock', 'imagen-1756174828871-268608643.jpg', 'Rafael', 6, 0, 'Receptor', 'LITOY', 1),
(40, 'Mouse de Cable USB LITOY', 'LITOY-LITOY-MOUSE', 'Mouse de Cable USB', 5, 7, 'in-stock', 'imagen-1756175007089-5669961.jpg', 'Rafael', 5, 0, 'LITOY', 'LITOY', 1),
(41, 'Splitter HDMI 1X2 (extensor HDMI)', 'LITOY-LITOY-SPLITTER', 'Splitter HDMI 1X2 (extensor HDMI)', 5, 14, 'in-stock', 'imagen-1756175243211-84862269.jpg', 'Rafael', 12, 0, 'litoy', 'LITOY', 1),
(42, 'Cable tipo C-HDMI (2m)', 'Cable-C-HDMI-C-HDMI2', 'Cable tipo C-HDMI (2m)', 5, 16, 'in-stock', 'imagen-1756176102339-456320211.jpg', 'Rafael', 14, 0, 'C-HDMI2', 'Cable C-HDMI', 1),
(43, 'Adaptador audio/microfono de Pc - Jack de 3.5', 'AMJAK-AMJACK', 'Adaptador audio/microfono de Pc - Jack de 3.5', 5, 7, 'in-stock', 'imagen-1756176220531-898991052.jpeg', 'Rafael', 5, 0, 'AMJACK', 'AMJAK', 1),
(44, 'Adaptador DVI-Dual Link a VGA', 'LITOY-DVIVGA', 'Adaptador DVI-Dual Link a VGA', 5, 7, 'in-stock', 'imagen-1756176278236-882204586.jpg', 'Rafael', 5, 0, 'DVIVGA', 'LITOY', 1),
(45, 'Adaptador Jack 3.5 a audio/microfono de Pc', 'JACKPC-JACKPC', 'Adaptador Jack 3.5 a audio/microfono de Pc', 5, 7, 'in-stock', 'imagen-1756176400621-596591666.jpg', 'Rafael', 5, 0, 'JACKPC', 'JACKPC', 1),
(46, 'Cable HDMI-HDMI (5m)', 'HDMI-HDMI5', 'Cable HDMI-HDMI (5m)', 5, 12, 'in-stock', 'imagen-1756176457739-177706519.jpg', 'Rafael', 10, 0, 'HDMI5', 'HDMI', 1),
(47, 'Cable HDMI-HDMI (3m)', 'HDMI-HDMI3', 'Cable HDMI-HDMI (3m)', 5, 10, 'in-stock', 'imagen-1756176491188-261696096.jpg', 'Rafael', 8, 0, 'HDMI3', 'HDMI', 1),
(48, 'Cable HDMI-HDMI (1.5m)', 'HDMI-HDMI15', 'Cable HDMI-HDMI (1.5m)', 5, 7, 'in-stock', 'imagen-1756176529001-463888180.jpg', 'Rafael', 5, 0, 'HDMI15', 'HDMI', 1),
(49, 'Cable VGA-VGA', 'VGAVGA-VGAVGA', 'Cable VGA-VGA', 5, 7, 'in-stock', 'imagen-1756176592080-85252062.jpg', 'Rafael', 5, 0, 'VGAVGA', 'VGAVGA', 1),
(50, 'Cable tipo A-tipo B', 'CABLE-A-B-CABLE-A-B', 'Cable tipo A-tipo B', 5, 12, 'in-stock', 'imagen-1756176671730-892647568.jpg', 'Rafael', 10, 0, 'CABLE A-B', 'CABLE A-B', 1),
(51, 'Cable Display Port-VGA', 'DP-VGA-DP-VGA', 'Cable Display Port-VGA', 5, 15, 'in-stock', 'imagen-1756176749628-740820086.jpeg', 'Rafael', 12, 0, 'DP-VGA', 'DP-VGA', 1),
(52, 'Cable Display Port-HDMI', 'DP-HDMI-DP-HDMI', 'Cable Display Port-HDMI', 5, 15, 'in-stock', 'imagen-1756176825288-152333200.jpg', 'Rafael', 13, 0, 'DP-HDMI', 'DP-HDMI', 1),
(53, 'Cable HDMI-VGA con salida de audio', 'HDMI-VGA-HDMIVGA', 'Cable HDMI-VGA con salida de audio', 5, 15, 'in-stock', 'imagen-1756176903621-717547795.jpeg', 'Rafael', 12, 0, 'HDMIVGA', 'HDMI-VGA', 1),
(54, 'DVI-HDMI', 'DVIHDMI-DVIHDMI', 'DVI-HDMI', 5, 10, 'in-stock', 'imagen-1756176965308-342224571.jpg', 'Rafael', 8, 0, 'DVIHDMI', 'DVIHDMI', 1),
(55, 'Alexa Amazon', 'ALEXA-ALEXA', 'Alexa Amazon', 5, 20, 'in-stock', 'imagen-1756177164122-534512807.jpg', 'adonis', 5, 0, 'ALEXA', 'ALEXA', 1),
(56, 'TP-Link NAUTA HOGAR', 'TPLINK-TPLINK', 'TP-Link NAUTA HOGAR', 1, 85, 'in-stock', 'imagen-1756228978855-287980651.jpg', 'Habana', 50, 7, 'TPLINK', 'TPLINK', 1),
(57, 'Teclado MK 120 (caja verde)', 'LOGITEC-LOGITEC', 'Teclado MK 120 (caja verde)', 1, 15, 'in-stock', 'imagen-1756229047938-653048233.jpg', 'Alexander', 10, 0, 'LOGITEC', 'LOGITEC', 1),
(58, 'Inversor domestico 2600w', 'LIVYAN-LIVYAN2.6KW', 'Inversor domestico 2600w', 1, 120, 'in-stock', 'imagen-1756229216986-984414615.jpg', 'aliexpress', 75, 0, 'LIVYAN2.6KW', 'LIVYAN', 1),
(59, 'Disco Seagate Barracuda etiqueta verde 4TB', 'SEAGATE-SEAGATE-4TB', 'Disco Seagate Barracuda etiqueta verde 4TB', 1, 100, 'low-stock', 'imagen-1756229902382-646605592.jpg', 'Alexander', 85, 0, 'SEAGATE', 'SEAGATE', 2),
(60, 'Covers', 'COVER-COVER2', 'Covers', 1, 5, 'in-stock', 'imagen-1756229338395-557438662.jpg', 'Alexander', 2, 0, 'COVER', 'COVER', 1),
(61, 'Pareja de conectores para paneles', 'MC4-MC4', 'Pareja de conectores para paneles', 1, 5, 'in-stock', 'imagen-1756229988864-357765131.jpg', 'aliexpress', 1, 0, 'MC4', 'MC4', 1),
(62, 'Cable de 3 puntas', 'CABLE-3PUNTAS-CABLE-3PUNTAS', 'Cable de 3 puntas', 1, 5, 'in-stock', NULL, NULL, NULL, NULL, 'CABLE 3PUNTAS', 'CABLE 3PUNTAS', 1),
(63, 'HUB de 4 puertos', 'RADIOSHAK-HUB3.0', 'HUB de 4 puertos', 2, 6, 'low-stock', 'imagen-1756230262221-358770448.jpg', 'alain', 4, 0, 'HUB3.0', 'RADIOSHAK', 2),
(64, 'Mini Pc (Raspberry Pi 3b+)', 'RASPBERRY-RPI3B+', 'Mini Pc (Raspberry Pi 3b+)', 1, 70, 'in-stock', 'imagen-1756230380552-139639990.jpg', 'aliexpress', 56, 7, 'RPI3B+', 'RASPBERRY', 1),
(65, 'WebCam', 'WEBCAM-EWBCAM', 'WebCam', 1, 4, 'low-stock', 'imagen-1756230504751-271857291.jpg', 'Roque', 2, 0, 'EWBCAM', 'WEBCAM', 2),
(66, 'Tarjeta USB-PCI', 'USBPCI-USBPCI', 'Tarjeta USB-PCI', 1, 25, 'in-stock', 'imagen-1756230599625-416732913.jpg', 'aliexpress', 15, 0, 'USBPCI', 'USBPCI', 1),
(67, 'Reffill tinta Epson 100ml(Cian/Magenta/Negro)', 'TINTAEPSON-TINTA', 'Reffill tinta Epson 100ml(Cian/Magenta/Negro)', 1, 8, 'in-stock', 'imagen-1756230760966-228983289.jpg', 'Alexander', 5, 0, 'TINTA', 'TINTAEPSON', 5),
(68, 'Controlador Solar pequeño', 'CONTROLADOR-SOLAR-PWM', 'Controlador Solar pequeño', 1, 40, 'in-stock', 'imagen-1756230966612-147918774.jpeg', 'aliexpress', 15, 0, 'PWM', 'CONTROLADOR SOLAR', 1),
(69, 'PCI-USB 4puertos 3.0 y tipo C', 'PCI-USB-4P-PCIUSB5', 'PCI-USB 4puertos 3.0 y tipo C', 1, 35, 'in-stock', 'imagen-1756231075203-678396070.jpg', 'aliexpress', 25, 0, 'PCIUSB5', 'PCI-USB 4P', 1),
(70, 'Mini HDMI-HDMI', 'MHDMI-HDMI-MHDMI-HDMI', 'Mini HDMI-HDMI', 1, 7, 'in-stock', 'imagen-1756231141301-708859353.jpg', 'aliexpress', 5, 0, 'MHDMI-HDMI', 'MHDMI-HDMI', 1),
(71, 'Cable tipo C - USB', 'C-USB-C-USB', 'Cable tipo C - USB', 9, 3, 'in-stock', 'imagen-1756231276595-148350863.jpg', 'Panama', 1, 0, 'C-USB', 'C-USB', 1),
(72, 'Cable micro usb (de carga) Cable tipo c usb (de carga) Cable lightning usb (de carga)', 'MICROUSB-CARGA-CABLE', 'Cable micro usb (de carga)\r\nCable tipo c usb (de carga)\r\nCable lightning usb (de carga)', 1, 1, 'in-stock', 'imagen-1756231453612-139173208.jpg', 'Alexander', 4, 0, 'CABLE', 'MICROUSB CARGA', 1),
(73, 'Audifonos inalambricos negro con cable', 'TWS-TWS', 'Audifonos inalambricos negro con cable', 1, 15, 'in-stock', 'imagen-1756231560476-206594666.jpeg', 'aliexpress', 5, 0, 'TWS', 'TWS', 1),
(74, 'Amplificador de bocina', 'AMPBOCINA-AMPBOCINA', 'Amplificador de bocina', 1, 30, 'in-stock', 'imagen-1756231738841-644085610.jpg', 'aliexpress', 20, 0, 'AMPBOCINA', 'AMPBOCINA', 1),
(75, 'Adaptador de Tarjeta-USB', 'TFADAPTADOR-TFUSB', 'Adaptador de Tarjeta-USB', 1, 8, 'in-stock', 'imagen-1756232012012-846912060.jpg', 'Alexander', 5, 0, 'TFUSB', 'TFADAPTADOR', 1),
(76, 'Disco M2 SATA (16gb)', 'SANDISK-M2SATA', 'Disco M2 SATA (16gb)', 1, 10, 'in-stock', 'imagen-1756232092699-36624844.jpeg', 'Alexander', 5, 0, 'M2SATA', 'SANDISK', 1),
(77, 'Tester para Laptop', 'TESTER-LAPTOP-TESTER-LAPTOP', 'Tester para Laptop', 1, 35, 'in-stock', 'imagen-1756232159323-434675902.jpg', 'aliexpress', 25, 0, 'TESTER-LAPTOP', 'TESTER-LAPTOP', 1),
(78, 'Bateria lifepo 4 12v 100Ah', 'DUMFUME-LIFEPO4100A', 'Bateria lifepo 4 12v 100Ah', 11, 350, 'in-stock', 'imagen-1756232247187-80446893.jpg', 'Andiel', 300, 0, 'LIFEPO4100A', 'DUMFUME', 1),
(79, 'Bateria lifepo 4 12v 100Ah', 'MFUZOP-LIFEPO4100A', 'Bateria lifepo 4 12v 100Ah', 1, 350, 'in-stock', 'imagen-1756232344203-402109994.jpg', 'aliexpress', 270, 0, 'LIFEPO4100A', 'MFUZOP', 1),
(80, 'Switch D-Link', 'DLINK-DLINK8P', 'Switch D-Link', 1, 5, 'in-stock', 'imagen-1756232432463-163323087.jpeg', 'Alexander', 0, 0, 'DLINK8P', 'DLINK', 1),
(81, 'EEPROM (Programador de bios)', 'EEPROM-EEPROM', 'EEPROM (Programador de bios)', 1, 20, 'low-stock', 'imagen-1756232587219-948193638.jpg', 'aliexpress', 15, 0, 'EEPROM', 'EEPROM', 2),
(82, 'Transitor Tester', 'TRANSISTOR-TESTER-TTESTER', 'Transitor Tester', 1, 20, 'low-stock', 'imagen-1756232657413-331842132.jpg', 'aliexpress', 15, 0, 'TTESTER', 'TRANSISTOR TESTER', 2),
(83, 'PLC (Breaker energy metter)', 'TOMZN-SMRTPLC', 'PLC (Breaker energy metter)', 1, 25, 'low-stock', 'imagen-1756234479672-941402476.jpg', 'aliexpress', 15, 0, 'SMRTPLC', 'TOMZN', 2),
(84, 'DVI-VGA (de uso)', 'DVI-VGA-DVI-VGA-USO', 'DVI-VGA (de uso)', 1, 4, 'low-stock', 'imagen-1756234691568-216211745.jpg', 'alain', 2, 0, 'DVI-VGA', 'DVI-VGA', 2),
(85, 'DVI-DVI (de uso)', 'DVI-DVI-DVI-DVI', 'DVI-DVI (de uso)', 1, 5, 'low-stock', 'imagen-1756234775106-586022534.jpg', 'alain', 4, 0, 'DVI-DVI', 'DVI-DVI', 2),
(86, 'Chupaestaño', 'CHUPAESTANO-CHUPAESTANO', 'Chupaestaño', 1, 10, 'in-stock', 'imagen-1756234901495-921404635.jpeg', 'Alexander', 5, 0, 'CHUPAESTAÑO', 'CHUPAESTAÑO', 1),
(87, 'Cables PCI-PCIE (de tarjeta de video)', 'CORSAIR-PCIE', 'Cables PCI-PCIE (de tarjeta de video)', 1, 8, 'low-stock', 'imagen-1756235048017-679668762.jpeg', 'alain', 5, 0, 'PCIE', 'CORSAIR', 2),
(88, 'Microscopio', 'MICROSCOPIO-USBMCPIO', 'Microscopio', 1, 40, 'low-stock', NULL, NULL, NULL, NULL, 'USBMCPIO', 'MICROSCOPIO', 2),
(89, 'Tarjeta de video NVIDIA 1050 TI', 'NVIDIA-NVIDIA1050TI', 'Tarjeta de video NVIDIA 1050 TI', 1, 30, 'low-stock', NULL, NULL, NULL, NULL, 'NVIDIA1050TI', 'NVIDIA', 2),
(90, 'Disco de 1TB Seagate (etiqueta blanca)', 'SEAGATE-ST1000', 'Disco de 1TB Seagate (etiqueta blanca)', 1, 25, 'low-stock', NULL, NULL, NULL, NULL, 'ST1000', 'SEAGATE', 2),
(91, 'Kit de Mouse y teclado de uso', 'MAXELL-KITMT', 'Kit de Mouse y teclado de uso', 3, 15, 'low-stock', 'imagen-1756235302735-299451475.jpg', 'Taller', 0, 0, 'KITMT', 'MAXELL', 2),
(92, 'Samsung A7 de 4gb/128gb full redes', 'SAMSUNG-SM-A7', 'Samsung A7 de 4gb/128gb full redes', 3, 68, 'low-stock', 'imagen-1756173859420-132463593.jpg', 'Jaun Carlos Parqueador', 50, 5, 'SM-A7', 'SAMSUNG', 2),
(93, 'Samsung A20e 3gb/32gb full redes', 'SAMSUNG-SM-A202', 'Samsung A20e 3gb/32gb full redes', 3, 50, 'low-stock', 'imagen-1756235382288-762781278.jpg', 'Taller', 0, 5, 'SM-A202', 'SAMSUNG', 2);

-- Usuarios de ejemplo
INSERT INTO `Users` (`first_name`, `last_name`, `email`, `password_hash`, `role`) VALUES
('Admin', 'User', 'admin@example.com', 'hashed_password_admin', 'admin'),
('Staff', 'User', 'staff@example.com', 'hashed_password_staff', 'staff');
