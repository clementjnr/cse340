-- Run once in Supabase SQL Editor. This does not delete existing data.
CREATE TABLE IF NOT EXISTS project_volunteers (
    user_id INTEGER NOT NULL,
    project_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, project_id),
    CONSTRAINT fk_project_volunteers_user
        FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_project_volunteers_project
        FOREIGN KEY (project_id)
        REFERENCES service_projects (project_id)
        ON DELETE CASCADE
);
