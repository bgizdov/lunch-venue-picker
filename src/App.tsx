import React, { useState, useEffect } from 'react';
import { Utensils, Shuffle } from 'lucide-react';
import VenueManager from './components/VenueManager';

function App() {
  const [venues, setVenues] = useState<string[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);
  const [isChoosing, setIsChoosing] = useState(false);

  useEffect(() => {
    const savedVenues = localStorage.getItem('venues');
    if (savedVenues) {
      setVenues(JSON.parse(savedVenues));
    } else {
      const defaultVenues = ['Monteray', 'Posolstvoto', 'Happy', 'Chehov'];
      setVenues(defaultVenues);
      localStorage.setItem('venues', JSON.stringify(defaultVenues));
    }
  }, []);

  const saveVenues = (updatedVenues: string[]) => {
    setVenues(updatedVenues);
    localStorage.setItem('venues', JSON.stringify(updatedVenues));
  };

  const chooseRandomVenue = () => {
    if (venues.length > 0 && !isChoosing) {
      setIsChoosing(true);
      setSelectedVenue(null);
      
      const animationDuration = 5000; // 5 seconds
      const intervalDuration = 100; // Change venue every 100ms during animation
      
      const intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * venues.length);
        setSelectedVenue(venues[randomIndex]);
      }, intervalDuration);

      setTimeout(() => {
        clearInterval(intervalId);
        const finalRandomIndex = Math.floor(Math.random() * venues.length);
        setSelectedVenue(venues[finalRandomIndex]);
        setIsChoosing(false);
      }, animationDuration);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">
          <Utensils className="mr-2" /> Lunch Venue Picker
        </h1>
        <VenueManager venues={venues} setVenues={saveVenues} />
        <button
          onClick={chooseRandomVenue}
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 flex items-center justify-center ${isChoosing ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isChoosing}
        >
          <Shuffle className={`mr-2 ${isChoosing ? 'animate-spin' : ''}`} /> 
          {isChoosing ? 'Choosing...' : 'Choose Random Venue'}
        </button>
        {selectedVenue && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">Selected Venue:</h2>
            <p className={`text-2xl text-blue-600 ${isChoosing ? 'animate-pulse' : 'animate-bounce'}`}>
              {selectedVenue}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;