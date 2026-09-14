-- =========================================================
-- CSE 340 W02 DATABASE SETUP
-- Community Service Directory
-- =========================================================

-- =========================================================
-- DROP TABLES
-- Drop child/dependent tables first because of foreign keys.
-- =========================================================

DROP TABLE IF EXISTS project_categories;
DROP TABLE IF EXISTS service_projects;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS organizations;

-- =========================================================
-- ORGANIZATIONS TABLE
-- One organization can sponsor many service projects.
-- =========================================================

CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL
);

-- =========================================================
-- CATEGORIES TABLE
-- =========================================================

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- =========================================================
-- SERVICE PROJECTS TABLE
-- Each project belongs to one organization.
-- =========================================================

CREATE TABLE service_projects (
    project_id SERIAL PRIMARY KEY,

    organization_id INTEGER NOT NULL,

    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organizations (organization_id)
        ON DELETE CASCADE
);

-- =========================================================
-- PROJECT_CATEGORIES JUNCTION TABLE
-- This creates a many-to-many relationship:
-- One project can have many categories.
-- One category can belong to many projects.
-- =========================================================

CREATE TABLE project_categories (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project_categories_project
        FOREIGN KEY (project_id)
        REFERENCES service_projects (project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_project_categories_category
        FOREIGN KEY (category_id)
        REFERENCES categories (category_id)
        ON DELETE CASCADE
);

-- =========================================================
-- INSERT ORGANIZATIONS
-- =========================================================

INSERT INTO organizations
    (name, description, location)
VALUES
    (
        'Community Helpers',
        'Connects volunteers with individuals and families who need assistance.',
        'Lagos, Nigeria'
    ),
    (
        'Hope Foundation',
        'Supports families and individuals through educational and social programs.',
        'Abuja, Nigeria'
    ),
    (
        'Green Future Initiative',
        'Promotes environmental responsibility through cleanup and education projects.',
        'Ibadan, Nigeria'
    );

-- =========================================================
-- INSERT CATEGORIES
-- At least 3 categories are required.
-- We use 4 categories.
-- =========================================================

INSERT INTO categories
    (name)
VALUES
    ('Environmental'),
    ('Educational'),
    ('Community Service'),
    ('Health and Wellness');

-- =========================================================
-- INSERT SERVICE PROJECTS
-- At least 5 projects for each organization.
-- Total: 15 projects.
-- =========================================================

-- Organization 1: Community Helpers

INSERT INTO service_projects
    (organization_id, title, description, location, project_date)
VALUES
    (
        1,
        'Community Food Distribution',
        'Distribute food packages to families in need.',
        'Lagos Community Center',
        '2026-10-05'
    ),
    (
        1,
        'Neighborhood Support Visit',
        'Visit elderly residents and provide basic assistance.',
        'Ikeja, Lagos',
        '2026-10-12'
    ),
    (
        1,
        'Clothing Donation Drive',
        'Collect and distribute clean clothing to families.',
        'Yaba, Lagos',
        '2026-10-19'
    ),
    (
        1,
        'Community Health Awareness',
        'Share information about healthy living and preventive care.',
        'Surulere, Lagos',
        '2026-10-26'
    ),
    (
        1,
        'Volunteer Skills Workshop',
        'Teach volunteers practical skills for community service.',
        'Lagos Community Center',
        '2026-11-02'
    );

-- Organization 2: Hope Foundation

INSERT INTO service_projects
    (organization_id, title, description, location, project_date)
VALUES
    (
        2,
        'School Supply Drive',
        'Collect school supplies for children who need educational resources.',
        'Abuja Learning Center',
        '2026-10-07'
    ),
    (
        2,
        'After-School Tutoring',
        'Provide tutoring support to primary and secondary students.',
        'Wuse, Abuja',
        '2026-10-14'
    ),
    (
        2,
        'Reading Development Program',
        'Help children improve reading and literacy skills.',
        'Garki, Abuja',
        '2026-10-21'
    ),
    (
        2,
        'Family Wellness Workshop',
        'Teach families about nutrition, exercise, and healthy routines.',
        'Maitama, Abuja',
        '2026-10-28'
    ),
    (
        2,
        'Youth Career Guidance',
        'Help young people explore educational and career opportunities.',
        'Abuja Learning Center',
        '2026-11-04'
    );

-- Organization 3: Green Future Initiative

INSERT INTO service_projects
    (organization_id, title, description, location, project_date)
VALUES
    (
        3,
        'Neighborhood Cleanup',
        'Clean public spaces and remove litter from local neighborhoods.',
        'Bodija, Ibadan',
        '2026-10-09'
    ),
    (
        3,
        'Tree Planting Day',
        'Plant trees and teach participants about environmental conservation.',
        'Ibadan Community Park',
        '2026-10-16'
    ),
    (
        3,
        'Recycling Awareness Campaign',
        'Educate residents about recycling and waste reduction.',
        'Dugbe, Ibadan',
        '2026-10-23'
    ),
    (
        3,
        'Clean Water Awareness',
        'Promote clean water practices and environmental health.',
        'Mokola, Ibadan',
        '2026-10-30'
    ),
    (
        3,
        'Community Garden Project',
        'Create and maintain a garden for community use.',
        'Ibadan Community Park',
        '2026-11-06'
    );

-- =========================================================
-- ASSOCIATE PROJECTS WITH CATEGORIES
-- Project IDs 1-5 belong to Community Helpers.
-- Project IDs 6-10 belong to Hope Foundation.
-- Project IDs 11-15 belong to Green Future Initiative.
-- =========================================================

-- Community Helpers projects

INSERT INTO project_categories (project_id, category_id)
VALUES
    (1, 3), -- Community Service
    (1, 4), -- Health and Wellness

    (2, 3), -- Community Service
    (3, 3), -- Community Service
    (4, 4), -- Health and Wellness
    (5, 2); -- Educational

-- Hope Foundation projects

INSERT INTO project_categories (project_id, category_id)
VALUES
    (6, 2), -- Educational
    (7, 2), -- Educational
    (8, 2), -- Educational
    (9, 4), -- Health and Wellness
    (10, 2), -- Educational
    (10, 3); -- Community Service

-- Green Future Initiative projects

INSERT INTO project_categories (project_id, category_id)
VALUES
    (11, 1), -- Environmental
    (12, 1), -- Environmental
    (13, 1), -- Environmental
    (14, 1), -- Environmental
    (14, 4), -- Health and Wellness
    (15, 1), -- Environmental
    (15, 3); -- Community Service

-- =========================================================
-- TEST QUERIES
-- =========================================================

-- Display all organizations
SELECT *
FROM organizations
ORDER BY organization_id;

-- Display all categories
SELECT *
FROM categories
ORDER BY category_id;

-- Display all projects with organization names
SELECT
    sp.project_id,
    sp.title,
    o.name AS organization_name,
    sp.description,
    sp.location,
    sp.project_date
FROM service_projects AS sp
INNER JOIN organizations AS o
    ON sp.organization_id = o.organization_id
ORDER BY sp.project_date;

-- Display projects and their categories
SELECT
    sp.title AS project_title,
    c.name AS category_name
FROM service_projects AS sp
INNER JOIN project_categories AS pc
    ON sp.project_id = pc.project_id
INNER JOIN categories AS c
    ON pc.category_id = c.category_id
ORDER BY sp.title, c.name;
