-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS inventory;
USE inventory;

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS `Users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) UNIQUE NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'manager', 'staff') DEFAULT 'staff',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Proveedores
CREATE TABLE IF NOT EXISTS `Suppliers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `contact_person` VARCHAR(100),
    `email` VARCHAR(100),
    `phone` VARCHAR(20),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Items (adaptada a los nuevos datos)
CREATE TABLE IF NOT EXISTS `Items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `sku` VARCHAR(100) UNIQUE,
    `brand` VARCHAR(100),
    `description` TEXT,
    `supplier_id` INT,
    `stock_quantity` INT NOT NULL DEFAULT 0,
    `price` DECIMAL(10, 2) NOT NULL,
    `cost` DECIMAL(10, 2),
    `status` ENUM('in-stock', 'low-stock', 'out-of-stock', 'used') DEFAULT 'in-stock',
    `image_url` VARCHAR(255),
    `provenance` VARCHAR(100),
    `warranty_days` INT DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`supplier_id`) REFERENCES `Suppliers`(`id`)
);

-- Tabla de Transacciones
CREATE TABLE IF NOT EXISTS `Transactions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `item_id` INT,
    `user_id` INT,
    `type` ENUM('sale', 'purchase', 'adjustment') NOT NULL,
    `quantity_change` INT NOT NULL,
    `notes` TEXT,
    `transaction_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`item_id`) REFERENCES `Items`(`id`),
    FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`)
);


-- DATOS DE EJEMPLO --

-- Insertar proveedores de ejemplo
INSERT IGNORE INTO `Suppliers` (`id`, `name`, `contact_person`, `email`, `phone`) VALUES
(1, 'Alexander', NULL, NULL, NULL),
(2, 'Alain', NULL, NULL, NULL),
(3, 'Rafael', NULL, NULL, NULL),
(4, 'Taller', NULL, NULL, NULL),
(5, 'Adonis', NULL, NULL, NULL),
(6, 'Roque', NULL, NULL, NULL),
(7, 'Juan Carlos', NULL, NULL, NULL),
(8, 'Habana', NULL, NULL, NULL),
(9, 'Aliexpress', NULL, NULL, NULL),
(10, 'Panama', NULL, NULL, NULL);

-- Insertar datos de artículos
-- La columna 'stock_quantity' se asume como 1 para todos, ya que no se especifica.
-- El estado se mapea: 1 -> in-stock, 2 -> used, 5 -> low-stock
INSERT INTO `Items` (`id`, `name`, `sku`, `brand`, `description`, `supplier_id`, `price`, `status`, `image_url`, `provenance`, `cost`, `warranty_days`, `stock_quantity`) VALUES
(1, "Cascos para PC mini plug Jack 3.5mm", "KMOC", "S60", "Cascos para PC mini plug Jack 3.5mm", 5, 30, 'in-stock', "imagen-1756164342394-5094591.jpg", "Rafael", 26, 0, 1),
(2, "Power Bank 10000mAh", "BUYTITI-10A", "BUYTITI", "Power Bank 10000mAh", 5, 22, 'in-stock', "imagen-1756167024010-836136170.png", "Rafael", 18, 0, 1),
(3, "Kit de Mouse y Teclado (nuevo)", "LITOY-K1", "LITOY", "Kit de Mouse y Teclado (nuevo)", 5, 22, 'in-stock', "imagen-1756167080210-986018439.jpg", "Rafael", 18, 0, 1),
(4, "Bocina mediana RGB (1HORA)", "1HORA-MID", "1HORA", "Bocina mediana RGB (1HORA)", 5, 28, 'in-stock', "imagen-1756168782086-128185158.jpg", "Rafael", 24, 0, 1),
(5, "Bocina pequeña (1HORA)", "1HORA-SMALL", "1HORA", "Bocina pequeña (1HORA)", 5, 22, 'in-stock', "imagen-1756168822512-125302790.jpg", "Rafael", 18, 0, 1),
(6, "Cable de Disco Duro", "USB3.0-CMICROB", "USB3.0", "Cable de Disco Duro", 5, 8, 'in-stock', "imagen-1756169450122-716544640.jpg", "Rafael", 6, 0, 1),
(7, "CARGADOR de 20W tipo C (blanca Litoy)", "LITOY-CA20W", "LITOY", "CARGADOR de 20W tipo C (blanca Litoy)", 5, 9, 'in-stock', "imagen-1756169420547-383554883.jpg", "Rafael", 6, 0, 1),
(8, "Cargador V8 2.1A (negro Buytiti)", "BUYTITI-V810W", "BUYTITI", "Cargador V8 2.1A (negro Buytiti)", 5, 8, 'in-stock', "imagen-1756169661636-404872858.jpg", NULL, 6, 0, 1),
(9, "Cargador 20W tipo C-tip C(negro 1HORA)", "1HORA-CC20W", "1HORA", "Cargador 20W tipo C-tip C(negro 1HORA)", 3, 13, 'in-stock', "imagen-1756170062464-464189099.jpg", "Rafael", 10, 0, 1),
(10, "Cargador de 12W 2.4 (negro 1HORA)", "1HORA-C12W", "1HORA", "Cargador de 12W 2.4 (negro 1HORA)", 5, 10, 'in-stock', "imagen-1756169976501-447556214.jpg", "Rafael", 7, 0, 1),
(11, "USB 3.0 a SATA (4TB SATA)", "SATA-SATAUSB3", "SATA", "USB 3.0 a SATA (4TB SATA)", 3, 12, 'in-stock', "imagen-1756170242545-149098840.jpg", "Rafael", 10, 0, 1),
(12, "Covers", "COVER-COVER", "COVER", "Covers", 5, 5, 'in-stock', "imagen-1756170435784-982565785.jpg", "adonis", 1, 0, 1),
(13, "Cable VGA-HDMI con salida de audio", "LITOY-MINI", "LITOY", "Cable VGA-HDMI con salida de audio", 5, 14, 'in-stock', "imagen-1756171326094-282430610.jpg", "Rafael", 10, 0, 1),
(14, "Tira de LED RGB con mando(5m - 5v)", "RIDGEWAY-RGB", "RIDGEWAY", "Tira de LED RGB con mando(5m - 5v)", 5, 15, 'in-stock', "imagen-1756171498591-543879341.jpg", "Rafael", 12, 0, 1),
(15, "Memoria Kingston 3.2 64gb", "KINGSTONG-K64GB", "KINGSTONG", "Memoria Kingston 3.2 64gb", 5, 10, 'in-stock', "imagen-1756171778807-58327327.jpg", "Rafael", 8, 0, 1),
(16, "HUB o Regleta de 4 puertos 3.0 (nueva)", "USBHUB-HUB3", "USBHUB", "HUB o Regleta de 4 puertos 3.0 (nueva)", 5, 12, 'in-stock', "imagen-1756171875639-742354766.jpg", "Rafael", 10, 0, 1),
(17, "Tarjeta MicroSD con adaptador 64gb", "ADATA-A64GB", "ADATA", "Tarjeta MicroSD con adaptador 64gb", 5, 9, 'in-stock', "imagen-1756172995639-660847593.jpg", "Rafael", 7, 0, 1),
(18, "Mouse inalambrico con receptor y 2 pilas", "WEIBO-W24", "WEIBO", "Mouse inalambrico con receptor y 2 pilas", 5, 10, 'in-stock', "imagen-1756172117593-63365139.jpg", "Rafael", 7, 0, 1),
(19, "Cable RCA-RCA (1.5m)", "RCA-RCA15M", "RCA", "Cable RCA-RCA (1.5m)", 3, 7, 'in-stock', "imagen-1756172223561-493891306.jpg", "Rafael", 5, 0, 1),
(20, "Cable RCA-Miniplugin (1.5 m)", "RCA-RCAMP", "RCA", "Cable RCA-Miniplugin (1.5 m)", 5, 7, 'in-stock', "imagen-1756172338184-4581265.jpg", "Rafael", 5, 0, 1),
(21, "Disco Seagate 1TB laptop etiqueta verde", "SEAGATE-ST1TB", "SEAGATE", "Disco Seagate 1TB laptop etiqueta verde", 5, 25, 'in-stock', "imagen-1756172501635-321180842.jpg", "adonis", 12, 0, 1),
(22, "Power Bank 20000mAh", "SMARTLIKE-20A", "SMARTLIKE", "Power Bank 20000mAh", 10, 35, 'in-stock', "imagen-1756172726250-174552262.jpg", "Rafael", 30, 0, 1),
(23, "DVI-VGA (nuevo)", "DVIVGA-CDVIVGA", "DVIVGA", "DVI-VGA (nuevo)", 5, 7, 'in-stock', "imagen-1756172846862-508300780.jpg", "Rafael", 5, 0, 1),
(24, "Cable Miniplugin JACK -Miniplugin JACK (1.8m)", "JACK18-JACK-JACK", "JACK18", "Cable Miniplugin JACK -Miniplugin JACK (1.8m)", 5, 7, 'in-stock', "imagen-1756172943755-263147942.jpeg", "Rafael", 5, 0, 1),
(25, "Audifonos inalambricos rosados", "INALAMBRICOS-AI-PINK", "INALAMBRICOS", "Audifonos inalambricos rosados", 5, 15, 'in-stock', "imagen-1756173562514-927956703.jpeg", "Rafael", 12, 0, 1),
(26, "Transformador 12v 2A de 2 puntas", "LITOY-T12-2A", "LITOY", "Transformador 12v 2A de 2 puntas", 3, 10, 'in-stock', "imagen-1756173721655-892504321.png", "Rafael", 8, 0, 1),
(27, "Cable Display Port-Display Port (1.8m)", "DP-DP-DPDP18", "DP-DP", "Cable Display Port-Display Port (1.8m)", 5, 10, 'in-stock', "imagen-1756228782648-811378178.jpg", "Rafael", 8, 0, 1),
(28, "Cable USB-HDMI/VGA (3.0 con salida de audio)", "LITOY-USBVAGA", "LITOY", "Cable USB-HDMI/VGA (3.0 con salida de audio)", 5, 23, 'in-stock', "imagen-1756241226731-616345229.jpg", "Rafael", 20, 0, 1),
(29, "Adatador RCA-HDMI", "MINI-RCAHDMI", "MINI", "Adatador RCA-HDMI", 5, 14, 'in-stock', "imagen-1756173959206-680197170.jpg", "Rafael", 9, 0, 1),
(30, "Adaptador HDMI-RCA", "MINI-HDMIRCA", "MINI", "Adaptador HDMI-RCA", 3, 14, 'in-stock', "imagen-1756174036384-199500053.jpg", "Rafael", 12, 0, 1),
(31, "Splitter HDMI 1X4 (extensor HDMI)", "HDTV-HDTV", "HDTV", "Splitter HDMI 1X4 (extensor HDMI)", 5, 23, 'in-stock', "imagen-1756228555933-747948077.png", "Rafael", 20, 0, 1),
(32, "Luces LED RGB 5V con Bluetooth y mando", "STRICIA-RGBBT", "STRICIA", "Luces LED RGB 5V con Bluetooth y mando", 5, 16, 'in-stock', "imagen-1756228657658-42863055.jpg", "Rafael", 14, 0, 1),
(33, "Adaptador USB WIFI (300Mbps, 2.4GHz de Pc)", "WIFI-USB2.0", "WIFI", "Adaptador USB WIFI (300Mbps, 2.4GHz de Pc)", 5, 10, 'in-stock', "imagen-1756171660145-566297264.jpeg", "Rafael", 8, 0, 1),
(34, "Adaptador USB Bluetooth V5.0 para Pc", "WUSBDONGLE-BT5", "WUSBDONGLE", "Adaptador USB Bluetooth V5.0 para Pc", 3, 10, 'in-stock', "imagen-1756174123286-349554511.jpg", "Rafael", 8, 0, 1),
(35, "Adaptador USB Bluetooth 4.2 + WIFI(150Mbps, 2.4GHz)", "WIRELESSUSBADAPTER-WIFIBT4.2", "WIRELESSUSBADAPTER", "Adaptador USB Bluetooth 4.2 + WIFI(150Mbps, 2.4GHz)", 5, 14, 'in-stock', "imagen-1756174265760-51830755.jpg", "Rafael", 12, 0, 1),
(36, "Receptor AUX Bluetooth con microfono", "WIRELESSMUSICRECIVER-BTAUX", "WIRELESSMUSICRECIVER", "Receptor AUX Bluetooth con microfono", 5, 8, 'in-stock', "imagen-1756174343524-128792120.jpg", "Rafael", 5, 0, 1),
(37, "Adaptador USB de audio 7.1", "USB7.1-USB7.1", "USB7.1", "Adaptador USB de audio 7.1", 5, 9, 'in-stock', "imagen-1756174426244-538387614.jpg", "Rafael", 7, 0, 1),
(38, "Receptor/Transmisor bluetooth", "LITOY-Dongle", "LITOY", "Receptor/Transmisor bluetooth", 5, 12, 'in-stock', "imagen-1756174729199-317361470.jpeg", "Rafael", 10, 0, 1),
(39, "Receptor USB Bluetooth", "LITOY-Receptor", "LITOY", "Receptor USB Bluetooth", 3, 8, 'in-stock', "imagen-1756174828871-268608643.jpg", "Rafael", 6, 0, 1),
(40, "Mouse de Cable USB", "LITOY-LITOY", "LITOY", "Mouse de Cable USB", 5, 7, 'in-stock', "imagen-1756175007089-5669961.jpg", "Rafael", 5, 0, 1),
(41, "Splitter HDMI 1X2 (extensor HDMI)", "LITOY-litoy", "LITOY", "Splitter HDMI 1X2 (extensor HDMI)", 5, 14, 'in-stock', "imagen-1756175243211-84862269.jpg", "Rafael", 12, 0, 1),
(42, "Cable tipo C-HDMI (2m)", "Cable C-HDMI-C-HDMI2", "Cable C-HDMI", "Cable tipo C-HDMI (2m)", 5, 16, 'in-stock', "imagen-1756176102339-456320211.jpg", "Rafael", 14, 0, 1),
(43, "Adaptador audio/microfono de Pc - Jack de 3.5", "AMJAK-AMJACK", "AMJAK", "Adaptador audio/microfono de Pc - Jack de 3.5", 5, 7, 'in-stock', "imagen-1756176220531-898991052.jpeg", "Rafael", 5, 0, 1),
(44, "Adaptador DVI-Dual Link a VGA", "LITOY-DVIVGA", "LITOY", "Adaptador DVI-Dual Link a VGA", 5, 7, 'in-stock', "imagen-1756176278236-882204586.jpg", "Rafael", 5, 0, 1),
(45, "Adaptador Jack 3.5 a audio/microfono de Pc", "JACKPC-JACKPC", "JACKPC", "Adaptador Jack 3.5 a audio/microfono de Pc", 5, 7, 'in-stock', "imagen-1756176400621-596591666.jpg", "Rafael", 5, 0, 1),
(46, "Cable HDMI-HDMI (5m)", "HDMI-HDMI5", "HDMI", "Cable HDMI-HDMI (5m)", 5, 12, 'in-stock', "imagen-1756176457739-177706519.jpg", "Rafael", 10, 0, 1),
(47, "Cable HDMI-HDMI (3m)", "HDMI-HDMI3", "HDMI", "Cable HDMI-HDMI (3m)", 5, 10, 'in-stock', "imagen-1756176491188-261696096.jpg", "Rafael", 8, 0, 1),
(48, "Cable HDMI-HDMI (1.5m)", "HDMI-HDMI15", "HDMI", "Cable HDMI-HDMI (1.5m)", 5, 7, 'in-stock', "imagen-1756176529001-463888180.jpg", "Rafael", 5, 0, 1),
(49, "Cable VGA-VGA", "VGAVGA-VGAVGA", "VGAVGA", "Cable VGA-VGA", 5, 7, 'in-stock', "imagen-1756176592080-85252062.jpg", "Rafael", 5, 0, 1),
(50, "Cable tipo A-tipo B", "CABLE A-B-CABLE A-B", "CABLE A-B", "Cable tipo A-tipo B", 5, 12, 'in-stock', "imagen-1756176671730-892647568.jpg", "Rafael", 10, 0, 1),
(51, "Cable Display Port-VGA", "DP-VGA-DP-VGA", "DP-VGA", "Cable Display Port-VGA", 5, 15, 'in-stock', "imagen-1756176749628-740820086.jpeg", "Rafael", 12, 0, 1),
(52, "Cable Display Port-HDMI", "DP-HDMI-DP-HDMI", "DP-HDMI", "Cable Display Port-HDMI", 5, 15, 'in-stock', "imagen-1756176825288-152333200.jpg", "Rafael", 13, 0, 1),
(53, "Cable HDMI-VGA con salida de audio", "HDMI-VGA-HDMIVGA", "HDMI-VGA", "Cable HDMI-VGA con salida de audio", 5, 15, 'in-stock', "imagen-1756176903621-717547795.jpeg", "Rafael", 12, 0, 1),
(54, "DVI-HDMI", "DVIHDMI-DVIHDMI", "DVIHDMI", "DVI-HDMI", 5, 10, 'in-stock', "imagen-1756176965308-342224571.jpg", "Rafael", 8, 0, 1),
(55, "Alexa Amazon", "ALEXA-ALEXA", "ALEXA", "Alexa Amazon", 5, 20, 'in-stock', "imagen-1756177164122-534512807.jpg", "adonis", 5, 0, 1),
(56, "TP-Link NAUTA HOGAR", "TPLINK-TPLINK", "TPLINK", "TP-Link NAUTA HOGAR", 1, 85, 'in-stock', "imagen-1756228978855-287980651.jpg", "Habana ", 50, 7, 1),
(57, "Teclado MK 120 (caja verde)", "LOGITEC-LOGITEC", "LOGITEC", "Teclado MK 120 (caja verde)", 1, 15, 'in-stock', "imagen-1756229047938-653048233.jpg", "Alexander", 10, 0, 1),
(58, "Inversor domestico 2600w", "LIVYAN-LIVYAN2.6KW", "LIVYAN", "Inversor domestico 2600w", 1, 120, 'in-stock', "imagen-1756229216986-984414615.jpg", "aliexpress", 75, 0, 1),
(59, "Disco Seagate Barracuda etiqueta verde 4TB", "SEAGATE-SEAGATE", "SEAGATE", "Disco Seagate Barracuda etiqueta verde 4TB", 1, 100, 'used', "imagen-1756229902382-646605592.jpg", "Alexander", 85, 0, 1),
(60, "Covers", "COVER-COVER-2", "COVER", "Covers", 1, 5, 'in-stock', "imagen-1756229338395-557438662.jpg", "Alexander", 2, 0, 1),
(61, "Pareja de conectores para paneles", "MC4-MC4", "MC4", "Pareja de conectores para paneles", 1, 5, 'in-stock', "imagen-1756229988864-357765131.jpg", "aliexpress", 1, 0, 1),
(62, "Cable de 3 puntas", "CABLE 3PUNTAS-CABLE 3PUNTAS", "CABLE 3PUNTAS", "Cable de 3 puntas", 1, 5, 'in-stock', NULL, NULL, NULL, NULL, 1),
(63, "HUB de 4 puertos", "RADIOSHAK-HUB3.0", "RADIOSHAK", "HUB de 4 puertos", 2, 6, 'used', "imagen-1756230262221-358770448.jpg", "alain", 4, 0, 1),
(64, "Mini Pc (Raspberry Pi 3b+)", "RASPBERRY-RPI3B+", "RASPBERRY", "Mini Pc (Raspberry Pi 3b+)", 1, 70, 'in-stock', "imagen-1756230380552-139639990.jpg", "aliexpress", 56, 7, 1),
(65, "WebCam", "WEBCAM-EWBCAM", "WEBCAM", "WebCam", 1, 4, 'used', "imagen-1756230504751-271857291.jpg", "Roque", 2, 0, 1),
(66, "Tarjeta USB-PCI", "USBPCI-USBPCI", "USBPCI", "Tarjeta USB-PCI", 1, 25, 'in-stock', "imagen-1756230599625-416732913.jpg", "aliexpress", 15, 0, 1),
(67, "Reffill tinta Epson 100ml(Cian/Magenta/Negro)", "TINTAEPSON-TINTA", "TINTAEPSON", "Reffill tinta Epson 100ml(Cian/Magenta/Negro)", 1, 8, 'low-stock', "imagen-1756230760966-228983289.jpg", "Alexander", 5, 0, 1),
(68, "Controlador Solar pequeño", "CONTROLADOR SOLAR-PWM", "CONTROLADOR SOLAR", "Controlador Solar pequeño", 1, 40, 'in-stock', "imagen-1756230966612-147918774.jpeg", "aliexpress", 15, 0, 1),
(69, "PCI-USB 4puertos 3.0 y tipo C", "PCI-USB 4P-PCIUSB5", "PCI-USB 4P", "PCI-USB 4puertos 3.0 y tipo C", 1, 35, 'in-stock', "imagen-1756231075203-678396070.jpg", "aliexpress", 25, 0, 1),
(70, "Mini HDMI-HDMI", "MHDMI-HDMI-MHDMI-HDMI", "MHDMI-HDMI", "Mini HDMI-HDMI", 1, 7, 'in-stock', "imagen-1756231141301-708859353.jpg", "aliexpress", 5, 0, 1),
(71, "Cable tipo C - USB", "C-USB-C-USB", "C-USB", "Cable tipo C - USB", 10, 3, 'in-stock', "imagen-1756231276595-148350863.jpg", "Panama ", 1, 0, 1),
(72, "Cable micro usb (de carga) Cable tipo c usb (de carga) Cable lightning usb (de carga)", "MICROUSB CARGA-CABLE", "MICROUSB CARGA", "Cable micro usb (de carga)\r\nCable tipo c usb (de carga)\r\nCable lightning usb (de carga)", 1, 1, 'in-stock', "imagen-1756231453612-139173208.jpg", "Alexander", 4, 0, 1),
(73, "Audifonos inalambricos negro con cable", "TWS-TWS", "TWS", "Audifonos inalambricos negro con cable", 1, 15, 'in-stock', "imagen-1756231560476-206594666.jpeg", "aliexpress", 5, 0, 1),
(74, "Amplificador de bocina", "AMPBOCINA-AMPBOCINA", "AMPBOCINA", "Amplificador de bocina", 1, 30, 'in-stock', "imagen-1756231738841-644085610.jpg", "aliexpress", 20, 0, 1),
(75, "Adaptador de Tarjeta-USB", "TFADAPTADOR-TFUSB", "TFADAPTADOR", "Adaptador de Tarjeta-USB", 1, 8, 'in-stock', "imagen-1756232012012-846912060.jpg", "Alexander", 5, 0, 1),
(76, "Disco M2 SATA (16gb)", "SANDISK-M2SATA", "SANDISK", "Disco M2 SATA (16gb)", 1, 10, 'in-stock', "imagen-1756232092699-36624844.jpeg", "Alexander", 5, 0, 1),
(77, "Tester para Laptop", "TESTER-LAPTOP-TESTER-LAPTOP", "TESTER-LAPTOP", "Tester para Laptop", 1, 35, 'in-stock', "imagen-1756232159323-434675902.jpg", "aliexpress", 25, 0, 1),
(78, "Bateria lifepo 4 12v 100Ah", "DUMFUME-LIFEPO4100A", "DUMFUME", "Bateria lifepo 4 12v 100Ah", 1, 350, 'in-stock', "imagen-1756232247187-80446893.jpg", "Andiel", 300, 0, 1),
(79, "Bateria lifepo 4 12v 100Ah", "MFUZOP-LIFEPO4100A", "MFUZOP", "Bateria lifepo 4 12v 100Ah", 1, 350, 'in-stock', "imagen-1756232344203-402109994.jpg", "aliexpress", 270, 0, 1),
(80, "Switch D-Link", "DLINK-DLINK8P", "DLINK", "Switch D-Link", 1, 5, 'in-stock', "imagen-1756232432463-163323087.jpeg", "Alexander", 0, 0, 1),
(81, "EEPROM (Programador de bios)", "EEPROM-EEPROM", "EEPROM", "EEPROM (Programador de bios)", 1, 20, 'used', "imagen-1756232587219-948193638.jpg", "aliexpress", 15, 0, 1),
(82, "Transitor Tester", "TRANSISTOR TESTER-TTESTER", "TRANSISTOR TESTER", "Transitor Tester", 1, 20, 'used', "imagen-1756232657413-331842132.jpg", "aliexpress", 15, 0, 1),
(83, "PLC (Breaker energy metter)", "TOMZN-SMRTPLC", "TOMZN", "PLC (Breaker energy metter)", 1, 25, 'used', "imagen-1756234479672-941402476.jpg", "aliexpress", 15, 0, 1),
(84, "DVI-VGA (de uso)", "DVI-VGA-DVI-VGA-2", "DVI-VGA", "DVI-VGA (de uso)", 1, 4, 'used', "imagen-1756234691568-216211745.jpg", "Alain ", 2, 0, 1),
(85, "DVI-DVI (de uso)", "DVI-DVI-DVI-DVI", "DVI-DVI", "DVI-DVI (de uso)", 1, 5, 'used', "imagen-1756234775106-586022534.jpg", "alain", 4, 0, 1),
(86, "Chupaestaño", "CHUPAESTAÑO-CHUPAESTAÑO", "CHUPAESTAÑO", "Chupaestaño", 1, 10, 'in-stock', "imagen-1756234901495-921404635.jpeg", "Alexander", 5, 0, 1),
(87, "Cables PCI-PCIE (de tarjeta de video)", "CORSAIR-PCIE", "CORSAIR", "Cables PCI-PCIE (de tarjeta de video)", 1, 8, 'used', "imagen-1756235048017-679668762.jpeg", "alain", 5, 0, 1),
(88, "Microscopio", "MICROSCOPIO-USBMCPIO", "MICROSCOPIO", "Microscopio", 1, 40, 'used', NULL, NULL, NULL, NULL, 1),
(89, "Tarjeta de video NVIDIA 1050 TI", "NVIDIA-NVIDIA1050TI", "NVIDIA", "Tarjeta de video NVIDIA 1050 TI", 1, 30, 'used', NULL, NULL, NULL, NULL, 1),
(90, "Disco de 1TB Seagate (etiqueta blanca)", "SEAGATE-ST1000", "SEAGATE", "Disco de 1TB Seagate (etiqueta blanca)", 1, 25, 'used', NULL, NULL, NULL, NULL, 1),
(91, "Kit de Mouse y teclado de uso", "MAXELL-KITMT", "MAXELL", "Kit de Mouse y teclado de uso", 3, 15, 'used', "imagen-1756235302735-299451475.jpg", "Taller", 0, 0, 1),
(92, "Samsung A7 de 4gb/128gb full redes", "SAMSUNG-SM-A7", "SAMSUNG", "Samsung A7 de 4gb/128gb full redes", 3, 68, 'used', "imagen-1756173859420-132463593.jpg", "Jaun Carlos Parqueador", 50, 5, 1),
(93, "Samsung A20e 3gb/32gb full redes", "SAMSUNG-SM-A202", "SAMSUNG", "Samsung A20e 3gb/32gb full redes", 3, 50, 'used', "imagen-1756235382288-762781278.jpg", "Taller", 0, 5, 1);
