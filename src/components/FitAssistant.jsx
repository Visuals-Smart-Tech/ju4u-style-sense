
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Ruler, User } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const FitAssistant = ({ productType }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    bust: '',
    waist: '',
    hips: '',
    preferredFit: 'regular'
  });
  const [showResult, setShowResult] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.height || !formData.weight) {
      toast.error("Please fill in at least your height and weight");
      return;
    }
    
    // Show results
    setShowResult(true);
    toast.success("Fit analysis complete!");
  };
  
  const resetForm = () => {
    setShowResult(false);
    setShowForm(false);
  };

  return (
    <div className="mb-6 border rounded-lg p-4 bg-gray-50">
      <div className="flex items-center gap-2 mb-2">
        <Ruler className="h-5 w-5 text-ju4u-coral" />
        <h3 className="font-semibold">Perfect Fit Assistant</h3>
      </div>
      
      {!showForm && !showResult && (
        <div>
          <p className="text-sm text-gray-600 mb-3">
            Not sure which size to choose? Our fit assistant can help you find the perfect fit.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowForm(true)}
          >
            Find My Size
          </Button>
        </div>
      )}
      
      {showForm && !showResult && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-gray-600 mb-2">
            Enter your measurements below for an accurate size recommendation:
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full border rounded-md px-3 py-1.5 text-sm"
                placeholder="e.g., 170"
              />
            </div>
            <div>
              <label className="text-sm">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full border rounded-md px-3 py-1.5 text-sm"
                placeholder="e.g., 65"
              />
            </div>
            
            {(productType === 'tops' || productType === 'dresses' || productType === 'outerwear') && (
              <div>
                <label className="text-sm">Bust (cm)</label>
                <input
                  type="number"
                  name="bust"
                  value={formData.bust}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-1.5 text-sm"
                  placeholder="Optional"
                />
              </div>
            )}
            
            {(productType === 'bottoms' || productType === 'dresses') && (
              <>
                <div>
                  <label className="text-sm">Waist (cm)</label>
                  <input
                    type="number"
                    name="waist"
                    value={formData.waist}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-1.5 text-sm"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="text-sm">Hips (cm)</label>
                  <input
                    type="number"
                    name="hips"
                    value={formData.hips}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-1.5 text-sm"
                    placeholder="Optional"
                  />
                </div>
              </>
            )}
          </div>
          
          <div>
            <label className="text-sm block mb-2">Preferred Fit:</label>
            <div className="flex gap-3">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="preferredFit" 
                  value="slim"
                  checked={formData.preferredFit === 'slim'} 
                  onChange={handleInputChange}
                  className="mr-1"
                />
                <span className="text-sm">Slim</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="preferredFit" 
                  value="regular"
                  checked={formData.preferredFit === 'regular'} 
                  onChange={handleInputChange}
                  className="mr-1"
                />
                <span className="text-sm">Regular</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="preferredFit" 
                  value="loose"
                  checked={formData.preferredFit === 'loose'} 
                  onChange={handleInputChange}
                  className="mr-1"
                />
                <span className="text-sm">Loose</span>
              </label>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button type="submit" size="sm">Get Recommendation</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}
      
      {showResult && (
        <div className="text-center py-3">
          <div className="mb-4">
            <div className="w-16 h-16 rounded-full bg-green-100 mx-auto mb-3 flex items-center justify-center">
              <User className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="font-medium text-lg">Size M</h4>
            <p className="text-sm text-gray-600">Recommended for your body type</p>
          </div>
          
          <div className="bg-green-50 border border-green-100 rounded-md p-3 mb-4">
            <p className="text-sm">
              Based on your measurements, we recommend size <strong>M</strong> with a{' '}
              {formData.preferredFit === 'slim' ? 'snug' : formData.preferredFit === 'loose' ? 'relaxed' : 'standard'}{' '}
              fit. This will provide the most comfortable fit for your body type.
            </p>
          </div>
          
          <Button variant="outline" size="sm" onClick={resetForm}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};

export default FitAssistant;
