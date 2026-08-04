CREATE TABLE goals (
    goals_id SERIAL PRIMARY KEY,
    weekly_mileage_goal INT,
    weekly_goal_start TIMESTAMP,
    monthly_mileage_goal INT,
    monthly_goal_start TIMESTAMP,
    yearly_mileage_goal INT,
    yearly_goal_start TIMESTAMP,
    monthly_segments_goal INT,
    yearly_segments_goal INT,
    biggest_hill_goal FLOAT,
    biggest_hill_goal_set TIMESTAMP
)