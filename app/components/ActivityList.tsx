"use client";

import { useState } from "react";
import { Activity } from "@/lib/types";
import ActivityControls from "./ActivityControls";
import AddActivityForm from "./AddActivityForm";

interface ActivityListProps {
  initialActivities: Activity[];
}

export default function ActivityList({ initialActivities }: ActivityListProps) {
  const [activities] = useState(initialActivities);
  const [location, setLocation] = useState("all");
  const [ageRange, setAgeRange] = useState("all");
  const [randomActivity, setRandomActivity] = useState<Activity | null>(null);

  const filteredActivities = activities.filter((activity) => {
    const matchesLocation =
      location === "all" ||
      (location === "indoor" && activity.indoor) ||
      (location === "outdoor" && !activity.indoor);

    const matchesAge =
      ageRange === "all" ||
      (ageRange === "3-5" && activity.age_range.includes("3")) ||
      (ageRange === "6-8" && activity.age_range.includes("6")) ||
      (ageRange === "9-12" && activity.age_range.includes("9"));

    return matchesLocation && matchesAge;
  });

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    setRandomActivity(null);
  };

  const handleAgeRangeChange = (newAgeRange: string) => {
    setAgeRange(newAgeRange);
    setRandomActivity(null);
  };

  const handleRandomActivity = () => {
    const filtered =
      filteredActivities.length > 0 ? filteredActivities : activities;
    const randomIndex = Math.floor(Math.random() * filtered.length);
    setRandomActivity(filtered[randomIndex]);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <AddActivityForm />
        <ActivityControls
          onLocationChange={handleLocationChange}
          onAgeRangeChange={handleAgeRangeChange}
          onRandomActivity={handleRandomActivity}
        />

        {/* Random Activity Display */}
        {randomActivity && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              Your Random Activity
            </h2>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2">
                {randomActivity.name}
              </h3>
              <p className="text-gray-600 mb-4">{randomActivity.description}</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>Age: {randomActivity.age_range}</span>
                <span>•</span>
                <span>{randomActivity.duration_minutes} minutes</span>
                <span>•</span>
                <span>{randomActivity.indoor ? "Indoor" : "Outdoor"}</span>
              </div>
            </div>
          </div>
        )}

        {/* Activities List */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">
            All Activities ({filteredActivities.length})
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {activity.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{activity.description}</p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>Age: {activity.age_range}</span>
                      <span>•</span>
                      <span>{activity.duration_minutes} minutes</span>
                      <span>•</span>
                      <span>{activity.indoor ? "Indoor" : "Outdoor"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
