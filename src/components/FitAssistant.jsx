import React, { useState } from 'react';
import { Ruler, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FitAssistant = ({ productType }) => {
  const [showForm, setShowForm] = useState(false);
  const [measurements, setMeasurements] = useState({
    height: '',
    weight: '',
    bust: '',
    waist: '',
    hips: '',
    inseam: '',
    footLength: '',
  });
  const [fitPreference, setFitPreference] = useState('regular');
  const [showResult, setShowResult] = useState(false);
  const [recommendedSize, setRecommendedSize] = useState('');

  // Determine which fields to show based on product type
  const getRelevantFields = () => {
    switch (productType) {
      case 'tops':
      case 'outerwear':
        return ['height', 'weight', 'bust'];
      case 'bottoms':
        return ['height', 'weight', 'waist', 'hips', 'inseam'];
      case 'dresses':
        return ['height', 'weight', 'bust', 'waist', 'hips'];
      case 'shoes':
        return ['footLength'];
      default:
        return ['height', 'weight'];
    }
  };

  const relevantFields = getRelevantFields();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeasurements({
      ...measurements,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock size recommendation algorithm
    // In a real app, this would use more sophisticated logic or API calls
    let size;
    
    if (productType === 'tops' || productType === 'outerwear') {
      const bust = parseInt(measurements.bust);
      if (bust < 85) size = fitPreference === 'snug' ? 'XS' : 'S';
      else if (bust < 90) size = fitPreference === 'loose' ? 'M' : 'S';
      else if (bust < 95) size = fitPreference === 'snug' ? 'S' : 'M';
      else if (bust < 100) size = fitPreference === 'loose' ? 'L' : 'M';
      else if (bust < 105) size = fitPreference === 'snug' ? 'M' : 'L';
      else size = fitPreference === 'snug' ? 'L' : 'XL';
    } else if (productType === 'bottoms') {
      const waist = parseInt(measurements.waist);
      if (waist < 70) size = fitPreference === 'snug' ? '26' : '28';
      else if (waist < 75) size = fitPreference === 'loose' ? '30' : '28';
      else if (waist < 80) size = fitPreference === 'snug' ? '28' : '30';
      else if (waist < 85) size = fitPreference === 'loose' ? '32' : '30';
      else size = fitPreference === 'snug' ? '30' : '32';
    } else if (productType === 'shoes') {
      const footLength = parseInt(measurements.footLength);
      if (footLength < 23) size = '6';
      else if (footLength < 24) size = '7';
      else if (footLength < 25) size = '8';
      else if (footLength < 26) size = '9';
      else if (footLength < 27) size = '10';
      else size = '11';
    } else {
      // Default/fallback
      size = 'M';
    }
    
    setRecommendedSize(size);
    setShowResult(true);
  };

  // Field labels and units
  const fieldLabels = {
    height: { label: 'Height', unit: 'cm', placeholder: '170' },
    weight: { label: 'Weight', unit: 'kg', placeholder: '65' },
    bust: { label: 'Bust/Chest', unit: 'cm', placeholder: '90' },
    waist: { label: 'Waist', unit: 'cm', placeholder: '75' },
    hips: { label: 'Hips', unit: 'cm', placeholder: '95' },
    inseam: { label: 'Inseam', unit: 'cm', placeholder: '78' },
    footLength: { label: 'Foot Length', unit: 'cm', placeholder: '24' },
  };

  const resetForm = () => {
    setShowResult(false);
    // Optionally reset other form fields if needed
  };

  return (
    <div className="mt-6">
      {!showForm ? (
        <Button 
          onClick={() => setShowForm(true)} 
          variant="outline"
          className="w-full flex items-center justify-center"
        >
          <Ruler className="mr-2 h-4 w-4" />
          Find Your Perfect Size
        </Button>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Size Recommendation</h3>
            <button 
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {!showResult ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {relevantFields.map(field => (
                  <div key={field} className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {fieldLabels[field].label}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name={field}
                        value={measurements[field]}
                        onChange={handleChange}
                        placeholder={fieldLabels[field].placeholder}
                        className="w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md focus:ring-ju4u-coral focus:border-ju4u-coral"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                        {fieldLabels[field].unit}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Fit
                </label>
                <div className="flex space-x-2">
                  {['snug', 'regular', 'loose'].map((fit) => (
                    <button
                      key={fit}
                      type="button"
                      className={`px-4 py-2 border rounded-md text-sm ${
                        fitPreference === fit 
                          ? 'border-ju4u-coral bg-ju4u-coral/10 text-ju4u-coral' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setFitPreference(fit)}
                    >
                      {fit.charAt(0).toUpperCase() + fit.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center text-xs text-gray-500 mb-4">
                <Info className="h-3 w-3 mr-1" />
                <span>Your data is used only for size recommendations and is not stored.</span>
              </div>
              
              <Button type="submit" className="w-full bg-ju4u-black hover:bg-black">
                Get Size Recommendation
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <div className="mb-4 p-6 bg-green-50 rounded-lg">
                <p className="text-gray-700 mb-2">Based on your measurements, we recommend:</p>
                <div className="text-3xl font-bold text-green-600 mb-2">{recommendedSize}</div>
                <p className="text-sm text-gray-600">
                  {fitPreference === 'snug' && 'This size will provide a closer, fitted look.'}
                  {fitPreference === 'regular' && 'This size should provide a comfortable, standard fit.'}
                  {fitPreference === 'loose' && 'This size will give you a more relaxed, roomy fit.'}
                </p>
              </div>
              
              <div className="flex text-xs text-gray-600 mb-4">
                <div className="flex flex-col items-center flex-1">
                  <div className="w-6 h-6 border rounded-full flex items-center justify-center mb-1 border-gray-300">S</div>
                  <span>Small</span>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-6 h-6 border rounded-full flex items-center justify-center mb-1 ${
                    recommendedSize === 'M' ? 'bg-ju4u-coral text-white border-ju4u-coral' : 'border-gray-300'
                  }`}>M</div>
                  <span>Medium</span>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <div className="w-6 h-6 border rounded-full flex items-center justify-center mb-1 border-gray-300">L</div>
                  <span>Large</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={resetForm}
              >
                Adjust Measurements
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FitAssistant;
