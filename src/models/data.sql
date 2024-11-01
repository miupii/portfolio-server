DROP TABLE games;

CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL UNIQUE,
    project VARCHAR(10) NOT NULL,
    date_submitted DATE NOT NULL,
    jam VARCHAR(30),
    ranking INT,
    total_entries INT,
    engine VARCHAR(20)
);

INSERT INTO games(title, project, date_submitted, jam, ranking, total_entries, engine) VALUES
('Tugboat', 'solo', '2024-05-27', 'Mini Jam', 4, 126, 'Unity'),
('Cards of Light', 'solo', '2024-01-22', 'Mini Jam', 10, 129, 'Unity'),
('Zine', 'solo', '2023-10-15', 'Mini Jam', 2, 64, 'Unity'),
('SolarPunk', 'solo', '2023-04-30', 'Mini Jam', 13, 59, 'Unity'),
('Bump-A-Butt', 'solo', '2022-05-15', 'Mini Jam', 71, 292, 'Unity'),
('Pockets', 'solo', '2022-10-02', 'Mini Jam', 25, 45, 'Unity'),
('Jurassic Run', 'team', '2024-08-31', 'Trijam', 1, 33, 'Godot'),
('Dinky Deck Dynasty', 'team', '2024-08-21', 'GMTK', 266, 7601, 'Godot'),
('Frog Fury', 'team', '2024-06-23', 'Godot Wild Jam', 2, 202, 'Godot'),
('Oni Express', 'team', '2024-06-10', 'Mini Jam', 24, 123, 'Godot'),
('Eat Your Cake', 'team', '2024-07-21', 'Mini Jam', 1, 53, 'Godot');
