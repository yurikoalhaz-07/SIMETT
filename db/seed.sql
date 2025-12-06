-- Jalankan file ini di database "quiz".
-- Contoh: psql -U postgres -d quiz -f db/seed.sql
DROP TABLE quiz;
CREATE TABLE IF NOT EXISTS quiz (
    id INT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    level VARCHAR(10),
    question TEXT NOT NULL,
    choice_a TEXT NOT NULL,
    choice_b TEXT NOT NULL,
    choice_c TEXT NOT NULL,
    answer CHAR(1) NOT NULL
);

INSERT INTO quiz (id, category, level, question, choice_a, choice_b, choice_c, answer) VALUES
(1, 'pengertian', '', 'Mengapa meteorologi tidak berkaitan dengan meteor luar angkasa?', 'Karena meteorologi hanya membahas gerakan planet dan bintang', 'Karena meteorologi berfokus pada atmosfer bumi dan proses cuaca', 'Karena meteor tidak memengaruhi kehidupan manusia', 'B'),
(2, 'pengertian', '', 'Pernyataan mana yang paling menggambarkan definisi meteorologi menurut WMO?', 'Studi tentang pola gerakan awan menggunakan data satelit saja', 'Studi tentang atmosfer termasuk fisika, kimia, dan dinamika yang mengatur cuaca dan iklim', 'Studi tentang perubahan suhu laut secara eksklusif', 'B'),
(3, 'pengertian', '', 'Contoh fungsi meteorologi dalam keselamatan publik adalah?', 'Menentukan komposisi batuan di kerak bumi', 'Menyediakan prakiraan cuaca untuk mengurangi dampak cuaca ekstrem', 'Mengatur standar internasional untuk transportasi darat', 'B'),
(4, 'pengertian', '', 'Meteorologi membantu bidang pertanian karena?', 'Cuaca dan iklim memengaruhi waktu tanam serta risiko gagal panen', 'Meteorologi menentukan jenis pupuk yang tepat untuk semua tanaman', 'Meteorologi mengukur kesuburan tanah secara langsung', 'A'),
(5, 'pengertian', '', 'Mengapa meteorologi penting dalam mitigasi perubahan iklim?', 'Karena meteorologi menghapus emisi gas rumah kaca', 'Karena meteorologi menyediakan pemantauan atmosfer dan tren iklim', 'Karena meteorologi mengontrol suhu bumi', 'B'),
(6, 'awan', '', 'Awan terbentuk ketika uap air naik, mendingin, lalu mengalami proses?', 'Evaporasi', 'Kondensasi', 'Sublimasi', 'B'),
(7, 'awan', '', 'Awan apa yang termasuk kategori awan tinggi lebih dari 6 km?', 'Altostratus (As)', 'Cirrocumulus (Cc)', 'Stratocumulus (Sc)', 'B'),
(8, 'awan', '', 'Awan yang menandakan hujan lama dengan intensitas sedang adalah?', 'Nimbostratus (Ns)', 'Cumulus (Cu)', 'Cirrus (Ci)', 'A'),
(9, 'awan', '', 'Jika pagi hari muncul altocumulus (Ac), hal ini dapat menjadi tanda?', 'Langit cerah sepanjang hari', 'Potensi hujan badai pada sore hari', 'Perubahan cuaca 2-3 hari ke depan', 'B'),
(10, 'awan', '', 'Awan berbentuk seperti piring terbang (UFO) biasanya disebut?', 'Awan Mammatus', 'Awan Lentikular', 'Awan Kelvin-Helmholtz', 'B'),
(11, 'struktur', '', 'Troposfer menjadi tempat kehidupan berlangsung karena?', 'Mengandung ozon pelindung UV', 'Masih memiliki udara yang cukup untuk bernapas', 'Suhunya selalu panas di seluruh ketinggiannya', 'B'),
(12, 'struktur', '', 'Fungsi utama lapisan stratosfer adalah?', 'Menyerap sinar ultraviolet berbahaya', 'Membakar meteorit yang masuk', 'Menghasilkan aurora', 'A'),
(13, 'struktur', '', 'Meteorit banyak terkikis sebelum mencapai permukaan bumi karena?', 'Terkikis di mesosfer akibat gesekan udara', 'Tersangkut di lapisan ozon', 'Terpantul kembali oleh eksosfer', 'A'),
(14, 'struktur', '', 'Aurora muncul di lapisan termosfer karena?', 'Terbentuknya awan tebal', 'Ionisasi partikel menghasilkan cahaya', 'Suhu sangat rendah', 'B'),
(15, 'struktur', '', 'Eksosfer memungkinkan interaksi gas dari luar angkasa karena?', 'Gravitasi sangat lemah pada ketinggian ini', 'Uap air sangat banyak', 'Suhunya selalu stabil', 'A'),
(16, 'parameter', '', 'Parameter yang diukur pada ketinggian 1.25-2 m dan digunakan untuk analisis stabilitas atmosfer adalah?', 'Tekanan atmosfer', 'Suhu udara', 'Kelembapan spesifik', 'B'),
(17, 'parameter', '', 'Pengukuran suhu tanah pada kedalaman 5-100 cm digunakan untuk?', 'Pemodelan radiasi surya', 'Hidrologi, model pertanian, dan deteksi frost', 'Analisis jet stream', 'B'),
(18, 'parameter', '', 'Kelembapan udara penting untuk?', 'Penentuan arah angin', 'Analisis kondensasi, pembentukan awan, dan kabut', 'Penentuan ketebalan es laut', 'B'),
(19, 'parameter', '', 'Jet stream dan profil angin diperoleh dari?', 'Solar radiometer', 'Radar angin / wind profiler', 'Sunshine recorder', 'B'),
(20, 'parameter', '', 'Aerosol Optical Depth dan SSA termasuk ke dalam?', 'Parameter cryosphere', 'Parameter komposisi atmosfer', 'Parameter radiasi permukaan', 'B'),
(21, 'alat', '', 'Fungsi utama taman alat adalah?', 'Tempat kalibrasi alat berat', 'Pusat pengamatan cuaca harian', 'Tempat menanam vegetasi rendah', 'B'),
(22, 'alat', '', 'Higrometer digunakan untuk mengukur?', 'Suhu udara', 'Kelembapan udara', 'Tekanan atmosfer', 'B'),
(23, 'alat', '', 'Alat untuk mengukur durasi penyinaran matahari adalah?', 'Heliograf', 'Barometer', 'Campbell-Stokes Sunshine Recorder', 'C'),
(24, 'alat', '', 'Rain gauge digunakan untuk mengukur?', 'Arah angin', 'Curah hujan', 'Intensitas cahaya', 'B'),
(25, 'alat', '', 'Anemometer digunakan untuk mengukur?', 'Kecepatan angin', 'Awan rendah', 'Radiasi matahari', 'A'),
(26, 'bencana', '', 'Awan utama penyebab hujan ekstrem adalah?', 'Stratus', 'Nimbostratus', 'Cumulonimbus', 'C'),
(27, 'bencana', '', 'Badai yang terbentuk di laut hangat membawa energi dari?', 'Panas laten uap air', 'Gunung berapi', 'Suhu dingin kutub', 'A'),
(28, 'bencana', '', 'Penyebab utama banjir di daerah jauh dari pantai adalah?', 'Pasang laut', 'Hujan sangat tinggi + kapasitas sungai terbatas', 'Kurangnya sinar matahari', 'B'),
(29, 'bencana', '', 'Hujan ekstrem biasanya terjadi karena?', 'Udara dingin turun perlahan', 'Awan cumulonimbus tumbuh cepat dan membawa uap air besar', 'Angin sepoi-sepoi terlalu santai', 'B'),
(30, 'bencana', '', 'Faktor yang memperparah risiko longsor adalah?', 'Lereng landai', 'Vegetasi yang lebat', 'Penebangan liar + lereng curam', 'C')
ON CONFLICT (id) DO NOTHING;

-- Kuis General dengan level easy/medium/hard
INSERT INTO quiz (id, category, level, question, choice_a, choice_b, choice_c, answer) VALUES
-- EASY
(31, 'general', 'easy', 'Pelangi terbentuk karena peristiwa fisika apa pada tetesan hujan?', 'Pembiasan dan pantulan cahaya', 'Evaporasi cepat tetesan hujan', 'Reaksi kimia dalam tetesan air', 'A'),
(32, 'general', 'easy', 'Awan cumulus biasanya identik dengan kondisi cuaca?', 'Gumpalan putih rendah → cuaca relatif cerah hingga berawan konvektif', 'Lapisan tipis di ketinggian tinggi → indikasi hujan segera', 'Awan gelap tebal → hujan stabil lama', 'A'),
(33, 'general', 'easy', 'Instrumen yang dipakai untuk mengukur tekanan atmosfer adalah?', 'Anemometer', 'Barometer', 'Hygrometer', 'B'),
(34, 'general', 'easy', 'Kabut adalah:', 'Awan yang terbentuk di stratosfer?', 'Awan rendah yang menempel di permukaan dan mengurangi jarak pandang', 'Bentuk hujan es kecil', 'B'),
(35, 'general', 'easy', 'Petir dalam badai petir memiliki suhu sangat tinggi, lebih panas dari permukaan matahari. Pernyataan ini adalah?', 'Fakta ilmiah', 'Salah; petir lebih dingin', 'Hanya terjadi saat hujan es', 'A'),

-- MEDIUM
(36, 'general', 'medium', 'Awan yang menutupi langit luas dan menghasilkan hujan lama intensitas sedang adalah?', 'Cumulus', 'Nimbostratus', 'Cirrus', 'B'),
(37, 'general', 'medium', 'Alat meteorologi untuk mengukur kecepatan angin adalah?', 'Barometer', 'Anemometer', 'Rain gauge', 'B'),
(38, 'general', 'medium', 'Hujan orografis terjadi ketika?', 'Massa udara hangat bergerak di atas laut dingin', 'Udara lembap naik karena pegunungan dan mengalami pendinginan hingga kondensasi', 'Konvergensi angin tanpa pengangkatan vertikal', 'B'),
(39, 'general', 'medium', 'Ketinggian standar pengukuran suhu udara menurut WMO adalah?', '0 meter', '1.25 – 2 meter dari permukaan tanah', '10 meter', 'B'),
(40, 'general', 'medium', 'Awan lentikular sering terbentuk di pegunungan karena?', 'Konveksi lokal dari pemanasan permukaan', 'Gelombang atmosfer (mountain wave) yang mengangkat dan menurunkan udara secara berulang', 'Arus laut hangat', 'B'),

-- HARD
(41, 'general', 'hard', 'CAPE digunakan untuk mengukur?', 'Jumlah uap air atmosfer', 'Energi potensial konvektif yang tersedia untuk updraft badai', 'Ketinggian dasar awan cumulonimbus', 'B'),
(42, 'general', 'hard', 'Faktor penyebab curah hujan tercatat lebih rendah dari nilai sebenarnya pada pengamatan permukaan adalah?', 'Rain gauge berada dalam bayangan objek', 'Rain gauge terlalu besar', 'Rain gauge ditempatkan di beton', 'A'),
(43, 'general', 'hard', 'Jika pagi terlihat altocumulus yang luas, interpretasi yang paling mungkin adalah?', 'Atmosfer sangat stabil', 'Potensi konveksi meningkat → kemungkinan badai sore', 'Tanda pasti hujan ekstrem 1 jam lagi', 'B'),
(44, 'general', 'hard', 'Nilai dBZ radar yang sangat tinggi menunjukkan?', 'Aerosol halus pada troposfer', 'Presipitasi kuat dengan kemungkinan hail dan hujan deras', 'Awan cirrus tipis', 'B'),
(45, 'general', 'hard', 'Cold surge dari Siberia dapat memperkuat konveksi maritim karena?', 'Menurunkan suhu laut', 'Menimbulkan konvergensi dan interaksi dengan massa lembap sehingga meningkatkan pengangkatan udara', 'Menciptakan inversi yang menghambat awan', 'B')
ON CONFLICT (id) DO NOTHING;
