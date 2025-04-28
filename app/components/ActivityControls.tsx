"use client";

interface ActivityControlsProps {
  onLocationChange: (location: string) => void;
  onAgeRangeChange: (ageRange: string) => void;
  onRandomActivity: () => void;
}

export default function ActivityControls({
  onLocationChange,
  onAgeRangeChange,
  onRandomActivity,
}: ActivityControlsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Random Activity Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Get Random Activity</h2>
        <button
          onClick={onRandomActivity}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          aria-label="Generate a random activity"
        >
          Generate Random Activity
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Filters</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="location-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <select
              id="location-filter"
              name="location"
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full border rounded-lg py-2 px-3"
              aria-label="Filter activities by location"
            >
              <option value="all">All Activities</option>
              <option value="indoor">Indoor Only</option>
              <option value="outdoor">Outdoor Only</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="age-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Age Range
            </label>
            <select
              id="age-filter"
              name="age"
              onChange={(e) => onAgeRangeChange(e.target.value)}
              className="w-full border rounded-lg py-2 px-3"
              aria-label="Filter activities by age range"
            >
              <option value="all">All Ages</option>
              <option value="3-5">3-5 years</option>
              <option value="6-8">6-8 years</option>
              <option value="9-12">9-12 years</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
