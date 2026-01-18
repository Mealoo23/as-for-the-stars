import { useState } from 'react';

export default function BirthChartForm() {
  const [birthDate, setBirthDate] = useState('');
  const [birthCity, setBirthCity] = useState('');
  const [birthState, setBirthState] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      birthDate,
      birthCity,
      birthState,
      birthTime,
      timeZone,
    });
    setSubmitted(true);
    // TODO: Query Swiss Ephemeris with these values
  };

  const timezones = [
    'UTC',
    'EST', 'EDT',
    'CST', 'CDT',
    'MST', 'MDT',
    'PST', 'PDT',
    'GMT', 'BST',
    'CET', 'CEST',
    'IST', 'AST',
  ];

  return (
    <div className="relative z-20 flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/80 backdrop-blur-sm rounded-lg p-8 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Birth Chart Calculator
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Birth Date */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Birth Date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Birth City */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Birth City
            </label>
            <input
              type="text"
              value={birthCity}
              onChange={(e) => setBirthCity(e.target.value)}
              placeholder="e.g., New York"
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Birth State */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Birth State/Province
            </label>
            <input
              type="text"
              value={birthState}
              onChange={(e) => setBirthState(e.target.value)}
              placeholder="e.g., NY"
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Birth Time */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Birth Time
            </label>
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Time Zone
            </label>
            <select
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-orange-500"
            >
              <option value="">Select timezone...</option>
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition-colors"
          >
            Generate Birth Chart
          </button>
        </form>

        {submitted && (
          <div className="mt-4 p-4 bg-green-900/50 border border-green-500/50 rounded text-green-200 text-sm">
            Form submitted! Ready to query Swiss Ephemeris.
          </div>
        )}
      </div>
    </div>
  );
}
