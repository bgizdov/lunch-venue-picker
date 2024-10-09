import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface VenueManagerProps {
  venues: string[];
  setVenues: (venues: string[]) => void;
}

const VenueManager: React.FC<VenueManagerProps> = ({ venues, setVenues }) => {
  const [newVenue, setNewVenue] = useState('');

  const addVenue = () => {
    if (newVenue && !venues.includes(newVenue)) {
      setVenues([...venues, newVenue]);
      setNewVenue('');
    }
  };

  const removeVenue = (venue: string) => {
    setVenues(venues.filter((v) => v !== venue));
  };

  return (
    <div>
      <div className="flex mb-4">
        <input
          type="text"
          value={newVenue}
          onChange={(e) => setNewVenue(e.target.value)}
          placeholder="Add new venue"
          className="flex-grow border rounded-l px-3 py-2"
        />
        <button
          onClick={addVenue}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r flex items-center"
        >
          <Plus size={20} />
        </button>
      </div>
      <ul className="space-y-2">
        {venues.map((venue) => (
          <li key={venue} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <span>{venue}</span>
            <button
              onClick={() => removeVenue(venue)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VenueManager;