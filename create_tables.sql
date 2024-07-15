CREATE TABLE todo (
    id SERIAL,
    title VARCHAR(255),
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT personal_trainer_pk PRIMARY KEY (id)
);