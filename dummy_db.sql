DROP TABLE shelters CASCADE;
DROP TABLE feedback CASCADE;

CREATE TABLE IF NOT EXISTS shelters
(
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    address     TEXT NOT NULL,
    rating      DECIMAL(2, 1) DEFAULT 0,
    photo_url   TEXT,
    description TEXT
    );

CREATE TABLE IF NOT EXISTS feedback
(
    id         SERIAL PRIMARY KEY,
    shelter_id INT REFERENCES shelters (id) ON DELETE CASCADE,
    user_name  TEXT NOT NULL,
    rating     INT CHECK (rating BETWEEN 1 AND 5),
    comment    TEXT NOT NULL,
    image_url  TEXT
    );

INSERT INTO shelters (name, address, rating, photo_url, description)
VALUES ('Centre of Children and Youth Arts', '18 Chystiakivska St', 3.5,
        'https://domik.ua/images/orig/full/00006138794a0aa06d26', 'Basement of an educational institution.'),
       ('Kyiv School of Economics', '3 Mykoly Shpaka St', 0, 'https://kse.ua/wp-content/uploads/2022/02/18.jpg',
        'Basement of an educational institution.'),
       ('Khreshchatyk Metro Station', '19 Khreshchatyk St', 4.2,
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Khreschatyk_metro_station_Kiev_2011_01.jpg/1920px-Khreschatyk_metro_station_Kiev_2011_01.jpg',
        'Underground metro station with access to shelter areas.'),
       ('Olympiiska Metro Station', '57 Fizkultury St', 4.5,
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Respublikanskyi_Stadion_metro_station_2010_01.jpg/1280px-Respublikanskyi_Stadion_metro_station_2010_01.jpg',
        'Spacious underground station.'),
       ('Golden Gate Metro Station', '42 Volodymyrska St', 4.8,
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Zoloti_Vorota_Metro_Station_Cental_Hall.jpg/1280px-Zoloti_Vorota_Metro_Station_Cental_Hall.jpg',
        'Historical metro station with deep underground access.'),
       ('Palace of Sports Shelter', '1 Sportyvna Sq', 3.9,
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Hungary_vs._Austria_at_2017_IIHF_World_Championship_Division_I_01.jpg/1280px-Hungary_vs._Austria_at_2017_IIHF_World_Championship_Division_I_01.jpg',
        'Large hall with limited amenities.'),
       ('Shevchenko University Shelter', '60 Volodymyrska St', 4.3,
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Universidad_Roja_de_Kiev.jpg/1280px-Universidad_Roja_de_Kiev.jpg', 'University basement repurposed as a shelter.'),
       ('Podil Theatre Shelter', '20-B Andriyivsky Desc', 3.6,
        'https://mizanscena.com/wp-content/uploads/2020/09/teatr-na-podole-v-vechernem-osveshenii-960x600.jpg',
        'Limited space but centrally located.'),
       ('Dnipro Metro Station', '25 Naberezhne Hw', 3.7,
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Dnipro_Metro_Station_Kiev_02.jpg/1280px-Dnipro_Metro_Station_Kiev_02.jpg',
        'Metro station available as a shelter.'),
       ('Darnytsia Railway Station', '3 Pryvokzalna St', 4.1,
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/%D0%9F%D1%80%D0%B8%D0%BC%D1%96%D1%81%D1%8C%D0%BA%D0%B8%D0%B9_%D0%B2%D0%BE%D0%BA%D0%B7%D0%B0%D0%BB_%D0%94%D0%B0%D1%80%D0%BD%D0%B8%D1%86%D1%8F.jpg/1200px-%D0%9F%D1%80%D0%B8%D0%BC%D1%96%D1%81%D1%8C%D0%BA%D0%B8%D0%B9_%D0%B2%D0%BE%D0%BA%D0%B7%D0%B0%D0%BB_%D0%94%D0%B0%D1%80%D0%BD%D0%B8%D1%86%D1%8F.jpg',
        'Underground passage used as a shelter.'),
       ('Vokzalna Metro Station', '1-A Vokzalna Sq', 4.0,
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Vokzalna_metro_station_Kiev_2010_02.jpg/1280px-Vokzalna_metro_station_Kiev_2010_02.jpg',
        'Busy metro station with deep underground protection.'),
       ('Lybidska Metro Station', '176 Antonovycha St', 4.4,
        'https://kyiv.depo.ua/uploads/posts/20210205/750x/q3hJrKttpGy1LviUT73lDd80FgpjZg6pe9T7rCtK.jpeg',
        'Strategic location with good facilities.');

INSERT INTO feedback (shelter_id, user_name, rating, comment, image_url)
VALUES (1, 'Maryna R.', 4, 'Nice shelter for children and adults. Unfortunately, not enough seats.', ''),
       (1, 'Hryhir V.', 3, 'Bad air flow.', ''),
       (1, 'Ostap B.', 4, 'Good location, but could use better lighting.', ''),
       (2, 'Serhii L.', 5, 'Excellent place with good space.', ''),
       (2, 'Iryna P.', 3, 'Would be great if there were more toilets.', ''),
       (3, 'Petro H.', 5, 'Spacious and well-ventilated.', ''),
       (3, 'Anna K.', 4, 'Bit crowded but feels safe.', ''),
       (4, 'Mykola V.', 4, 'Better than most shelters, but needs better seating.', ''),
       (4, 'Lina O.', 5, 'Great place! Clean and safe.', ''),
       (5, 'Svitlana R.', 5, 'I love the architecture and safety.', ''),
       (5, 'Viktor I.', 4, 'Historical but a bit cold inside.', ''),
       (6, 'Andriy T.', 3, 'Limited amenities but serves its purpose.', ''),
       (6, 'Oksana B.', 4, 'Decent shelter but gets hot.', ''),
       (7, 'Dmytro S.', 4, 'Great for students, good internet.', ''),
       (7, 'Maria Y.', 3, 'Noisy but spacious.', ''),
       (8, 'Valerii Z.', 3, 'Very basic, but it works.', ''),
       (8, 'Olha P.', 3, 'Could use better seating.', ''),
       (9, 'Roman D.', 4, 'Well-structured but limited access.', ''),
       (9, 'Tetiana K.', 5, 'Love the location, but gets humid.', ''),
       (10, 'Igor M.', 4, 'Shopping and shelter in one, nice idea.', ''),
       (10, 'Natalia V.', 5, 'Best shelter so far! Very modern.', ''),
       (11, 'Yevhen S.', 4, 'Busy but reliable.', ''),
       (11, 'Alina L.', 3, 'Too many people at rush hours.', ''),
       (12, 'Oleksii N.', 5, 'My go-to shelter, clean and modern.', ''),
       (12, 'Sofia R.', 4, 'Better than expected.', '');
