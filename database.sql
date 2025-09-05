-- Base de datos para Stockpile Manager - Compatible con MariaDB/MySQL

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS inventory;
USE inventory;

-- Tabla para Usuarios
-- Almacena la información de los usuarios que pueden acceder al sistema.
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'staff', 'viewer') DEFAULT 'staff',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla para Proveedores
-- Almacena información sobre los proveedores de los productos.
CREATE TABLE IF NOT EXISTS Suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    contact_person VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla para Items
-- El corazón del sistema, almacena cada producto en el inventario.
CREATE TABLE IF NOT EXISTS Items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    stock INT NOT NULL DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL,
    status ENUM('in-stock', 'low-stock', 'out-of-stock', 'discontinued') DEFAULT 'in-stock',
    image_url VARCHAR(255),
    brand VARCHAR(100), -- Marca del producto
    model VARCHAR(100), -- Modelo del producto
    cost DECIMAL(10, 2), -- Costo de compra del producto
    warranty_days INT DEFAULT 0, -- Período de garantía en días
    supplier_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(id) ON DELETE SET NULL
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla para Transacciones
-- Registra todos los movimientos de inventario (entradas, salidas, ajustes).
CREATE TABLE IF NOT EXISTS Transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    user_id INT,
    type ENUM('sale', 'restock', 'adjustment', 'return') NOT NULL,
    quantity INT NOT NULL,
    notes TEXT,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES Items(id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE SET NULL
);

-- Tabla para Proyectos
-- Permite agrupar items para proyectos específicos.
CREATE TABLE IF NOT EXISTS Projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    creator_user_id INT NOT NULL,
    status ENUM('planning', 'in-progress', 'completed', 'cancelled') DEFAULT 'planning',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (creator_user_id) REFERENCES Users(id)
);

-- Tabla de Items de Proyecto (Tabla Pivote)
-- Asocia items de inventario a proyectos.
CREATE TABLE IF NOT EXISTS Project_Items (
    project_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity_assigned INT NOT NULL,
    PRIMARY KEY (project_id, item_id),
    FOREIGN KEY (project_id) REFERENCES Projects(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES Items(id) ON DELETE CASCADE
);

-- Tabla para Tickets de Venta
CREATE TABLE IF NOT EXISTS Sales_Tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id INT NOT NULL,
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    warranty_expires_on DATE,
    FOREIGN KEY (transaction_id) REFERENCES Transactions(id)
);


-- Insertar datos de ejemplo

-- Insertar Proveedores
INSERT IGNORE INTO Suppliers (id, name, contact_person, email, phone) VALUES
(1, 'Alexander', 'Alexander', NULL, NULL),
(2, 'Alain', 'Alain', NULL, NULL),
(3, 'Taller', 'Taller', NULL, NULL),
(4, 'Roque', 'Roque', NULL, NULL),
(5, 'Rafael', 'Rafael', NULL, NULL),
(6, 'Adonis', 'Adonis', NULL, NULL),
(7, 'Andiel', 'Andiel', NULL, NULL),
(8, 'Aliexpress', 'Aliexpress', NULL, NULL),
(9, 'Habana', 'Habana', NULL, NULL),
(10, 'Panama', 'Panama', NULL, NULL),
(11, 'Juan Carlos Parqueador', 'Juan Carlos', NULL, NULL);


-- Insertar Items
-- Se usa INSERT IGNORE para evitar errores si los datos ya existen.
INSERT IGNORE INTO Items (id, name, sku, description, stock, price, status, image_url, brand, model, cost, warranty_days, supplier_id) VALUES
(1, 'Cascos para PC mini plug Jack 3.5mm', 'KMOC-S60', 'Cascos para PC mini plug Jack 3.5mm', 30, 5.00, 'in-stock', 'imagen-1756164342394-5094591.jpg', 'KMOC', 'S60', 26.00, 0, 5),
(2, 'Power Bank 10000mAh', 'BUYTITI-10A', 'Power Bank 10000mAh', 22, 5.00, 'in-stock', 'imagen-1756167024010-836136170.png', 'BUYTITI', '10A', 18.00, 0, 5),
(3, 'Kit de Mouse y Teclado (nuevo)', 'LITOY-K1', 'Kit de Mouse y Teclado (nuevo)', 22, 5.00, 'in-stock', 'imagen-1756167080210-986018439.jpg', 'LITOY', 'K1', 18.00, 0, 5),
(4, 'Bocina mediana RGB (1HORA)', '1HORA-MID', 'Bocina mediana RGB (1HORA)', 28, 5.00, 'in-stock', 'imagen-1756168782086-128185158.jpg', '1HORA', 'MID', 24.00, 0, 5),
(5, 'Bocina pequeña (1HORA)', '1HORA-SMALL', 'Bocina pequeña (1HORA)', 22, 5.00, 'in-stock', 'imagen-1756168822512-125302790.jpg', '1HORA', 'SMALL', 18.00, 0, 5),
(6, 'Cable de Disco Duro', 'USB3.0-CMICROB', 'Cable de Disco Duro', 8, 5.00, 'in-stock', 'imagen-1756169450122-716544640.jpg', 'USB3.0', 'CMICROB', 6.00, 0, 5),
(7, 'CARGADOR de 20W tipo C (blanca Litoy)', 'LITOY-CA20W', 'CARGADOR de 20W tipo C (blanca Litoy)', 9, 5.00, 'in-stock', 'imagen-1756169420547-383554883.jpg', 'LITOY', 'CA20W', 6.00, 0, 5),
(8, 'Cargador V8 2.1A (negro Buytiti)', 'BUYTITI-V810W', 'Cargador V8 2.1A (negro Buytiti)', 8, 5.00, 'in-stock', 'imagen-1756169661636-404872858.jpg', 'BUYTITI', 'V810W', 6.00, 0, 5),
(9, 'Cargador 20W tipo C-tip C(negro 1HORA)', '1HORA-CC20W', 'Cargador 20W tipo C-tip C(negro 1HORA)', 13, 3.00, 'in-stock', 'imagen-1756170062464-464189099.jpg', '1HORA', 'CC20W', 10.00, 0, 3),
(10, 'Cargador de 12W 2.4 (negro 1HORA)', '1HORA-C12W', 'Cargador de 12W 2.4 (negro 1HORA)', 10, 5.00, 'in-stock', 'imagen-1756169976501-447556214.jpg', '1HORA', 'C12W', 7.00, 0, 5),
(11, 'USB 3.0 a SATA (4TB SATA)', 'SATA-SATAUSB3', 'USB 3.0 a SATA (4TB SATA)', 12, 3.00, 'in-stock', 'imagen-1756170242545-149098840.jpg', 'SATA', 'SATAUSB3', 10.00, 0, 3),
(12, 'Covers', 'COVER-COVER', 'Covers', 5, 5.00, 'in-stock', 'imagen-1756170435784-982565785.jpg', 'COVER', 'COVER', 1.00, 0, 5),
(13, 'Cable VGA-HDMI con salida de audio', 'LITOY-MINI', 'Cable VGA-HDMI con salida de audio', 14, 5.00, 'in-stock', 'imagen-1756171326094-282430610.jpg', 'LITOY', 'MINI', 10.00, 0, 5),
(14, 'Tira de LED RGB con mando(5m - 5v)', 'RIDGEWAY-RGB', 'Tira de LED RGB con mando(5m - 5v)', 15, 5.00, 'in-stock', 'imagen-1756171498591-543879341.jpg', 'RIDGEWAY', 'RGB', 12.00, 0, 5),
(15, 'Memoria Kingston 3.2 64gb', 'KINGSTONG-K64GB', 'Memoria Kingston 3.2 64gb', 10, 5.00, 'in-stock', 'imagen-1756171778807-58327327.jpg', 'KINGSTONG', 'K64GB', 8.00, 0, 5),
(16, 'HUB o Regleta de 4 puertos 3.0 (nueva)', 'USBHUB-HUB3', 'HUB o Regleta de 4 puertos 3.0 (nueva)', 12, 5.00, 'in-stock', 'imagen-1756171875639-742354766.jpg', 'USBHUB', 'HUB3', 10.00, 0, 5),
(17, 'Tarjeta MicroSD con adaptador 64gb', 'ADATA-A64GB', 'Tarjeta MicroSD con adaptador 64gb', 9, 5.00, 'in-stock', 'imagen-1756172995639-660847593.jpg', 'ADATA', 'A64GB', 7.00, 0, 5),
(18, 'Mouse inalambrico con receptor y 2 pilas', 'WEIBO-W24', 'Mouse inalambrico con receptor y 2 pilas', 10, 5.00, 'in-stock', 'imagen-1756172117593-63365139.jpg', 'WEIBO', 'W24', 7.00, 0, 5),
(19, 'Cable RCA-RCA (1.5m)', 'RCA-RCA15M', 'Cable RCA-RCA (1.5m)', 7, 3.00, 'in-stock', 'imagen-1756172223561-493891306.jpg', 'RCA', 'RCA15M', 5.00, 0, 3),
(20, 'Cable RCA-Miniplugin (1.5 m)', 'RCA-RCAMP', 'Cable RCA-Miniplugin (1.5 m)', 7, 5.00, 'in-stock', 'imagen-1756172338184-4581265.jpg', 'RCA', 'RCAMP', 5.00, 0, 5),
(21, 'Disco Seagate 1TB laptop etiqueta verde', 'SEAGATE-ST1TB', 'Disco Seagate 1TB laptop etiqueta verde', 25, 5.00, 'in-stock', 'imagen-1756172501635-321180842.jpg', 'SEAGATE', 'ST1TB', 12.00, 0, 5),
(22, 'Power Bank 20000mAh', 'SMARTLIKE-20A', 'Power Bank 20000mAh', 35, 10.00, 'in-stock', 'imagen-1756172726250-174552262.jpg', 'SMARTLIKE', '20A', 30.00, 0, 10),
(23, 'DVI-VGA (nuevo)', 'DVIVGA-CDVIVGA', 'DVI-VGA (nuevo)', 7, 5.00, 'in-stock', 'imagen-1756172846862-508300780.jpg', 'DVIVGA', 'CDVIVGA', 5.00, 0, 5),
(24, 'Cable Miniplugin JACK -Miniplugin JACK (1.8m)', 'JACK18-JACK-JACK', 'Cable Miniplugin JACK -Miniplugin JACK (1.8m)', 7, 5.00, 'in-stock', 'imagen-1756172943755-263147942.jpeg', 'JACK18', 'JACK-JACK', 5.00, 0, 5),
(25, 'Audifonos inalambricos rosados', 'INALAMBRICOS-AI-PINK', 'Audifonos inalambricos rosados', 15, 5.00, 'in-stock', 'imagen-1756173562514-927956703.jpeg', 'INALAMBRICOS', 'AI-PINK', 12.00, 0, 5),
(26, 'Transformador 12v 2A de 2 puntas', 'LITOY-T12-2A', 'Transformador 12v 2A de 2 puntas', 10, 3.00, 'in-stock', 'imagen-1756173721655-892504321.png', 'LITOY', 'T12-2A', 8.00, 0, 3),
(27, 'Cable Display Port-Display Port (1.8m)', 'DP-DP-DPDP18', 'Cable Display Port-Display Port (1.8m)', 10, 5.00, 'in-stock', 'imagen-1756228782648-811378178.jpg', 'DP-DP', 'DPDP18', 8.00, 0, 5),
(28, 'Cable USB-HDMI/VGA (3.0 con salida de audio)', 'LITOY-USBVAGA', 'Cable USB-HDMI/VGA (3.0 con salida de audio)', 23, 5.00, 'in-stock', 'imagen-1756241226731-616345229.jpg', 'LITOY', 'USBVAGA', 20.00, 0, 5),
(29, 'Adatador RCA-HDMI', 'MINI-RCAHDMI', 'Adatador RCA-HDMI', 14, 5.00, 'in-stock', 'imagen-1756173959206-680197170.jpg', 'MINI', 'RCAHDMI', 9.00, 0, 5),
(30, 'Adaptador HDMI-RCA', 'MINI-HDMIRCA', 'Adaptador HDMI-RCA', 14, 3.00, 'in-stock', 'imagen-1756174036384-199500053.jpg', 'MINI', 'HDMIRCA', 12.00, 0, 3),
(31, 'Splitter HDMI 1X4 (extensor HDMI)', 'HDTV-HDTV', 'Splitter HDMI 1X4 (extensor HDMI)', 23, 5.00, 'in-stock', 'imagen-1756228555933-747948077.png', 'HDTV', 'HDTV', 20.00, 0, 5),
(32, 'Luces LED RGB 5V con Bluetooth y mando', 'STRICIA-RGBBT', 'Luces LED RGB 5V con Bluetooth y mando', 16, 5.00, 'in-stock', 'imagen-1756228657658-42863055.jpg', 'STRICIA', 'RGBBT', 14.00, 0, 5),
(33, 'Adaptador USB WIFI (300Mbps, 2.4GHz de Pc)', 'WIFI-USB2.0', 'Adaptador USB WIFI (300Mbps, 2.4GHz de Pc)', 10, 5.00, 'in-stock', 'imagen-1756171660145-566297264.jpeg', 'WIFI', 'USB2.0', 8.00, 0, 5),
(34, 'Adaptador USB Bluetooth V5.0 para Pc', 'WUSBDONGLE-BT5', 'Adaptador USB Bluetooth V5.0 para Pc', 10, 3.00, 'in-stock', 'imagen-1756174123286-349554511.jpg', 'WUSBDONGLE', 'BT5', 8.00, 0, 3),
(35, 'Adaptador USB Bluetooth 4.2 + WIFI(150Mbps, 2.4GHz)', 'WIRELESSUSBADAPTER-WIFIBT4.2', 'Adaptador USB Bluetooth 4.2 + WIFI(150Mbps, 2.4GHz)', 14, 5.00, 'in-stock', 'imagen-1756174265760-51830755.jpg', 'WIRELESSUSBADAPTER', 'WIFIBT4.2', 12.00, 0, 5),
(36, 'Receptor AUX Bluetooth con microfono', 'WIRELESSMUSICRECIVER-BTAUX', 'Receptor AUX Bluetooth con microfono', 8, 5.00, 'in-stock', 'imagen-1756174343524-128792120.jpg', 'WIRELESSMUSICRECIVER', 'BTAUX', 5.00, 0, 5),
(37, 'Adaptador USB de audio 7.1', 'USB7.1-USB7.1', 'Adaptador USB de audio 7.1', 9, 5.00, 'in-stock', 'imagen-1756174426244-538387614.jpg', 'USB7.1', 'USB7.1', 7.00, 0, 5),
(38, 'Receptor/Transmisor bluetooth', 'LITOY-Dongle', 'Receptor/Transmisor bluetooth', 12, 5.00, 'in-stock', 'imagen-1756174729199-317361470.jpeg', 'LITOY', 'Dongle', 10.00, 0, 5),
(39, 'Receptor USB Bluetooth', 'LITOY-Receptor', 'Receptor USB Bluetooth', 8, 3.00, 'in-stock', 'imagen-1756174828871-268608643.jpg', 'LITOY', 'Receptor', 6.00, 0, 3),
(40, 'Mouse de Cable USB LITOY', 'LITOY-LITOY', 'Mouse de Cable USB', 7, 5.00, 'in-stock', 'imagen-1756175007089-5669961.jpg', 'LITOY', 'LITOY', 5.00, 0, 5),
(41, 'Splitter HDMI 1X2 (extensor HDMI)', 'litoy-LITOY-splitter', 'Splitter HDMI 1X2 (extensor HDMI)', 14, 5.00, 'in-stock', 'imagen-1756175243211-84862269.jpg', 'litoy', 'LITOY', 12.00, 0, 5),
(42, 'Cable tipo C-HDMI (2m)', 'Cable-C-HDMI-C-HDMI2', 'Cable tipo C-HDMI (2m)', 16, 5.00, 'in-stock', 'imagen-1756176102339-456320211.jpg', 'Cable C-HDMI', 'C-HDMI2', 14.00, 0, 5),
(43, 'Adaptador audio/microfono de Pc - Jack de 3.5', 'AMJAK-AMJACK', 'Adaptador audio/microfono de Pc - Jack de 3.5', 7, 5.00, 'in-stock', 'imagen-1756176220531-898991052.jpeg', 'AMJAK', 'AMJACK', 5.00, 0, 5),
(44, 'Adaptador DVI-Dual Link a VGA', 'LITOY-DVIVGA', 'Adaptador DVI-Dual Link a VGA', 7, 5.00, 'in-stock', 'imagen-1756176278236-882204586.jpg', 'LITOY', 'DVIVGA', 5.00, 0, 5),
(45, 'Adaptador Jack 3.5 a audio/microfono de Pc', 'JACKPC-JACKPC', 'Adaptador Jack 3.5 a audio/microfono de Pc', 7, 5.00, 'in-stock', 'imagen-1756176400621-596591666.jpg', 'JACKPC', 'JACKPC', 5.00, 0, 5),
(46, 'Cable HDMI-HDMI (5m)', 'HDMI-HDMI5', 'Cable HDMI-HDMI (5m)', 12, 5.00, 'in-stock', 'imagen-1756176457739-177706519.jpg', 'HDMI', 'HDMI5', 10.00, 0, 5),
(47, 'Cable HDMI-HDMI (3m)', 'HDMI-HDMI3', 'Cable HDMI-HDMI (3m)', 10, 5.00, 'in-stock', 'imagen-1756176491188-261696096.jpg', 'HDMI', 'HDMI3', 8.00, 0, 5),
(48, 'Cable HDMI-HDMI (1.5m)', 'HDMI-HDMI15', 'Cable HDMI-HDMI (1.5m)', 7, 5.00, 'in-stock', 'imagen-1756176529001-463888180.jpg', 'HDMI', 'HDMI15', 5.00, 0, 5),
(49, 'Cable VGA-VGA', 'VGAVGA-VGAVGA', 'Cable VGA-VGA', 7, 5.00, 'in-stock', 'imagen-1756176592080-85252062.jpg', 'VGAVGA', 'VGAVGA', 5.00, 0, 5),
(50, 'Cable tipo A-tipo B', 'CABLE-A-B-CABLE-A-B', 'Cable tipo A-tipo B', 12, 5.00, 'in-stock', 'imagen-1756176671730-892647568.jpg', 'CABLE A-B', 'CABLE A-B', 10.00, 0, 5),
(51, 'Cable Display Port-VGA', 'DP-VGA-DP-VGA', 'Cable Display Port-VGA', 15, 5.00, 'in-stock', 'imagen-1756176749628-740820086.jpeg', 'DP-VGA', 'DP-VGA', 12.00, 0, 5),
(52, 'Cable Display Port-HDMI', 'DP-HDMI-DP-HDMI', 'Cable Display Port-HDMI', 15, 5.00, 'in-stock', 'imagen-1756176825288-152333200.jpg', 'DP-HDMI', 'DP-HDMI', 13.00, 0, 5),
(53, 'Cable HDMI-VGA con salida de audio', 'HDMI-VGA-HDMIVGA', 'Cable HDMI-VGA con salida de audio', 15, 5.00, 'in-stock', 'imagen-1756176903621-717547795.jpeg', 'HDMI-VGA', 'HDMIVGA', 12.00, 0, 5),
(54, 'DVI-HDMI', 'DVIHDMI-DVIHDMI', 'DVI-HDMI', 10, 5.00, 'in-stock', 'imagen-1756176965308-342224571.jpg', 'DVIHDMI', 'DVIHDMI', 8.00, 0, 5),
(55, 'Alexa Amazon', 'ALEXA-ALEXA', 'Alexa Amazon', 20, 5.00, 'in-stock', 'imagen-1756177164122-534512807.jpg', 'ALEXA', 'ALEXA', 5.00, 0, 5),
(56, 'TP-Link NAUTA HOGAR', 'TPLINK-TPLINK', 'TP-Link NAUTA HOGAR', 85, 1.00, 'in-stock', 'imagen-1756228978855-287980651.jpg', 'TPLINK', 'TPLINK', 50.00, 7, 1),
(57, 'Teclado MK 120 (caja verde)', 'LOGITEC-LOGITEC', 'Teclado MK 120 (caja verde)', 15, 1.00, 'in-stock', 'imagen-1756229047938-653048233.jpg', 'LOGITEC', 'LOGITEC', 10.00, 0, 1),
(58, 'Inversor domestico 2600w', 'LIVYAN-LIVYAN2.6KW', 'Inversor domestico 2600w', 120, 1.00, 'in-stock', 'imagen-1756229216986-984414615.jpg', 'LIVYAN', 'LIVYAN2.6KW', 75.00, 0, 1),
(59, 'Disco Seagate Barracuda etiqueta verde 4TB', 'SEAGATE-SEAGATE', 'Disco Seagate Barracuda etiqueta verde 4TB', 100, 2.00, 'low-stock', 'imagen-1756229902382-646605592.jpg', 'SEAGATE', 'SEAGATE', 85.00, 0, 1),
(60, 'Covers', 'COVER-COVER-2', 'Covers', 5, 1.00, 'in-stock', 'imagen-1756229338395-557438662.jpg', 'COVER', 'COVER', 2.00, 0, 1),
(61, 'Pareja de conectores para paneles', 'MC4-MC4', 'Pareja de conectores para paneles', 5, 1.00, 'in-stock', 'imagen-1756229988864-357765131.jpg', 'MC4', 'MC4', 1.00, 0, 1),
(62, 'Cable de 3 puntas', 'CABLE-3PUNTAS-CABLE-3PUNTAS', 'Cable de 3 puntas', 5, 1.00, 'in-stock', NULL, 'CABLE 3PUNTAS', 'CABLE 3PUNTAS', NULL, NULL, 1),
(63, 'HUB de 4 puertos', 'RADIOSHAK-HUB3.0', 'HUB de 4 puertos', 6, 2.00, 'low-stock', 'imagen-1756230262221-358770448.jpg', 'RADIOSHAK', 'HUB3.0', 4.00, 0, 2),
(64, 'Mini Pc (Raspberry Pi 3b+)', 'RASPBERRY-RPI3B+', 'Mini Pc (Raspberry Pi 3b+)', 70, 1.00, 'in-stock', 'imagen-1756230380552-139639990.jpg', 'RASPBERRY', 'RPI3B+', 56.00, 7, 1),
(65, 'WebCam', 'WEBCAM-EWBCAM', 'WebCam', 4, 2.00, 'low-stock', 'imagen-1756230504751-271857291.jpg', 'WEBCAM', 'EWBCAM', 2.00, 0, 1),
(66, 'Tarjeta USB-PCI', 'USBPCI-USBPCI', 'Tarjeta USB-PCI', 25, 1.00, 'in-stock', 'imagen-1756230599625-416732913.jpg', 'USBPCI', 'USBPCI', 15.00, 0, 1),
(67, 'Reffill tinta Epson 100ml(Cian/Magenta/Negro)', 'TINTAEPSON-TINTA', 'Reffill tinta Epson 100ml(Cian/Magenta/Negro)', 8, 5.00, 'discontinued', 'imagen-1756230760966-228983289.jpg', 'TINTAEPSON', 'TINTA', 5.00, 0, 1),
(68, 'Controlador Solar pequeño', 'CONTROLADOR-SOLAR-PWM', 'Controlador Solar pequeño', 40, 1.00, 'in-stock', 'imagen-1756230966612-147918774.jpeg', 'CONTROLADOR SOLAR', 'PWM', 15.00, 0, 1),
(69, 'PCI-USB 4puertos 3.0 y tipo C', 'PCI-USB-4P-PCIUSB5', 'PCI-USB 4puertos 3.0 y tipo C', 35, 1.00, 'in-stock', 'imagen-1756231075203-678396070.jpg', 'PCI-USB 4P', 'PCIUSB5', 25.00, 0, 1),
(70, 'Mini HDMI-HDMI', 'MHDMI-HDMI-MHDMI-HDMI', 'Mini HDMI-HDMI', 7, 1.00, 'in-stock', 'imagen-1756231141301-708859353.jpg', 'MHDMI-HDMI', 'MHDMI-HDMI', 5.00, 0, 1),
(71, 'Cable tipo C - USB', 'C-USB-C-USB', 'Cable tipo C - USB', 3, 10.00, 'in-stock', 'imagen-1756231276595-148350863.jpg', 'C-USB', 'C-USB', 1.00, 0, 10),
(72, 'Cable micro usb (de carga) Cable tipo c usb (de carga) Cable lightning usb (de carga)', 'MICROUSB-CARGA-CABLE', 'Cable micro usb (de carga) Cable tipo c usb (de carga) Cable lightning usb (de carga)', 1, 1.00, 'in-stock', 'imagen-1756231453612-139173208.jpg', 'MICROUSB CARGA', 'CABLE', 4.00, 0, 1),
(73, 'Audifonos inalambricos negro con cable', 'TWS-TWS', 'Audifonos inalambricos negro con cable', 15, 1.00, 'in-stock', 'imagen-1756231560476-206594666.jpeg', 'TWS', 'TWS', 5.00, 0, 1),
(74, 'Amplificador de bocina', 'AMPBOCINA-AMPBOCINA', 'Amplificador de bocina', 30, 1.00, 'in-stock', 'imagen-1756231738841-644085610.jpg', 'AMPBOCINA', 'AMPBOCINA', 20.00, 0, 1),
(75, 'Adaptador de Tarjeta-USB', 'TFADAPTADOR-TFUSB', 'Adaptador de Tarjeta-USB', 8, 1.00, 'in-stock', 'imagen-1756232012012-846912060.jpg', 'TFADAPTADOR', 'TFUSB', 5.00, 0, 1),
(76, 'Disco M2 SATA (16gb)', 'SANDISK-M2SATA', 'Disco M2 SATA (16gb)', 10, 1.00, 'in-stock', 'imagen-1756232092699-36624844.jpeg', 'SANDISK', 'M2SATA', 5.00, 0, 1),
(77, 'Tester para Laptop', 'TESTER-LAPTOP-TESTER-LAPTOP', 'Tester para Laptop', 35, 1.00, 'in-stock', 'imagen-1756232159323-434675902.jpg', 'TESTER-LAPTOP', 'TESTER-LAPTOP', 25.00, 0, 1),
(78, 'Bateria lifepo 4 12v 100Ah', 'DUMFUME-LIFEPO4100A', 'Bateria lifepo 4 12v 100Ah', 350, 1.00, 'in-stock', 'imagen-1756232247187-80446893.jpg', 'DUMFUME', 'LIFEPO4100A', 300.00, 0, 1),
(79, 'Bateria lifepo 4 12v 100Ah', 'MFUZOP-LIFEPO4100A', 'Bateria lifepo 4 12v 100Ah', 350, 1.00, 'in-stock', 'imagen-1756232344203-402109994.jpg', 'MFUZOP', 'LIFEPO4100A', 270.00, 0, 1),
(80, 'Switch D-Link', 'DLINK-DLINK8P', 'Switch D-Link', 5, 1.00, 'in-stock', 'imagen-1756232432463-163323087.jpeg', 'DLINK', 'DLINK8P', 0.00, 0, 1),
(81, 'EEPROM (Programador de bios)', 'EEPROM-EEPROM', 'EEPROM (Programador de bios)', 20, 2.00, 'low-stock', 'imagen-1756232587219-948193638.jpg', 'EEPROM', 'EEPROM', 15.00, 0, 1),
(82, 'Transitor Tester', 'TRANSISTOR-TESTER-TTESTER', 'Transitor Tester', 20, 2.00, 'low-stock', 'imagen-1756232657413-331842132.jpg', 'TRANSISTOR TESTER', 'TTESTER', 15.00, 0, 1),
(83, 'PLC (Breaker energy metter)', 'TOMZN-SMRTPLC', 'PLC (Breaker energy metter)', 25, 2.00, 'low-stock', 'imagen-1756234479672-941402476.jpg', 'TOMZN', 'SMRTPLC', 15.00, 0, 1),
(84, 'DVI-VGA (de uso)', 'DVI-VGA-DVI-VGA', 'DVI-VGA (de uso)', 4, 2.00, 'low-stock', 'imagen-1756234691568-216211745.jpg', 'DVI-VGA', 'DVI-VGA', 2.00, 0, 1),
(85, 'DVI-DVI (de uso)', 'DVI-DVI-DVI-DVI', 'DVI-DVI (de uso)', 5, 2.00, 'low-stock', 'imagen-1756234775106-586022534.jpg', 'DVI-DVI', 'DVI-DVI', 4.00, 0, 1),
(86, 'Chupaestaño', 'CHUPAESTAÑO-CHUPAESTAÑO', 'Chupaestaño', 10, 1.00, 'in-stock', 'imagen-1756234901495-921404635.jpeg', 'CHUPAESTAÑO', 'CHUPAESTAÑO', 5.00, 0, 1),
(87, 'Cables PCI-PCIE (de tarjeta de video)', 'CORSAIR-PCIE', 'Cables PCI-PCIE (de tarjeta de video)', 8, 2.00, 'low-stock', 'imagen-1756235048017-679668762.jpeg', 'CORSAIR', 'PCIE', 5.00, 0, 1),
(88, 'Microscopio', 'MICROSCOPIO-USBMCPIO', 'Microscopio', 40, 2.00, 'low-stock', NULL, 'MICROSCOPIO', 'USBMCPIO', NULL, NULL, 1),
(89, 'Tarjeta de video NVIDIA 1050 TI', 'NVIDIA-NVIDIA1050TI', 'Tarjeta de video NVIDIA 1050 TI', 30, 2.00, 'low-stock', NULL, 'NVIDIA', 'NVIDIA1050TI', NULL, NULL, 1),
(90, 'Disco de 1TB Seagate (etiqueta blanca)', 'SEAGATE-ST1000', 'Disco de 1TB Seagate (etiqueta blanca)', 25, 2.00, 'low-stock', NULL, 'SEAGATE', 'ST1000', NULL, NULL, 1),
(91, 'Kit de Mouse y teclado de uso', 'MAXELL-KITMT', 'Kit de Mouse y teclado de uso', 15, 2.00, 'low-stock', 'imagen-1756235302735-299451475.jpg', 'MAXELL', 'KITMT', 0.00, 0, 3),
(92, 'Samsung A7 de 4gb/128gb full redes', 'SAMSUNG-SM-A7', 'Samsung A7 de 4gb/128gb full redes', 68, 2.00, 'low-stock', 'imagen-1756173859420-132463593.jpg', 'SAMSUNG', 'SM-A7', 50.00, 5, 3),
(93, 'Samsung A20e 3gb/32gb full redes', 'SAMSUNG-SM-A202', 'Samsung A20e 3gb/32gb full redes', 50, 2.00, 'low-stock', 'imagen-1756235382288-762781278.jpg', 'SAMSUNG', 'SM-A202', 0.00, 5, 3);
