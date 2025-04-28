import sql from "./db";
import { Activity } from "./types";

// Create the activities table if it doesn't exist
export async function initializeDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS activities (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      age_range VARCHAR(50),
      duration_minutes INTEGER,
      indoor BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

// Add a new activity
export async function addActivity({
  name,
  description,
  ageRange,
  durationMinutes,
  indoor,
}: {
  name: string;
  description?: string;
  ageRange?: string;
  durationMinutes?: number;
  indoor?: boolean;
}): Promise<Activity> {
  const result = await sql`
    INSERT INTO activities (name, description, age_range, duration_minutes, indoor)
    VALUES (${name}, ${description}, ${ageRange}, ${durationMinutes}, ${indoor})
    RETURNING *;
  `;
  return result[0] as Activity;
}

// Get all activities
export async function getAllActivities(): Promise<Activity[]> {
  const result = await sql`
    SELECT * FROM activities
    ORDER BY created_at DESC;
  `;
  return result as Activity[];
}

// Get a random activity
export async function getRandomActivity(): Promise<Activity | null> {
  const result = await sql`
    SELECT * FROM activities
    ORDER BY RANDOM()
    LIMIT 1;
  `;
  return (result[0] as Activity) || null;
}

// Get activities filtered by indoor/outdoor
export async function getActivitiesByLocation(
  indoor: boolean
): Promise<Activity[]> {
  const result = await sql`
    SELECT * FROM activities
    WHERE indoor = ${indoor}
    ORDER BY created_at DESC;
  `;
  return result as Activity[];
}

// Get activities filtered by age range
export async function getActivitiesByAgeRange(
  ageRange: string
): Promise<Activity[]> {
  const result = await sql`
    SELECT * FROM activities
    WHERE age_range = ${ageRange}
    ORDER BY created_at DESC;
  `;
  return result as Activity[];
}

// Delete an activity
export async function deleteActivity(id: number): Promise<void> {
  await sql`
    DELETE FROM activities
    WHERE id = ${id};
  `;
}

// Update an activity
export async function updateActivity({
  id,
  name,
  description,
  ageRange,
  durationMinutes,
  indoor,
}: {
  id: number;
  name?: string;
  description?: string;
  ageRange?: string;
  durationMinutes?: number;
  indoor?: boolean;
}): Promise<Activity> {
  const result = await sql`
    UPDATE activities
    SET 
      name = COALESCE(${name}, name),
      description = COALESCE(${description}, description),
      age_range = COALESCE(${ageRange}, age_range),
      duration_minutes = COALESCE(${durationMinutes}, duration_minutes),
      indoor = COALESCE(${indoor}, indoor)
    WHERE id = ${id}
    RETURNING *;
  `;
  return result[0] as Activity;
}
