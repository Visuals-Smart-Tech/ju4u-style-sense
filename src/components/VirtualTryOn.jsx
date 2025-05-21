
import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

const VirtualTryOn = ({ productType, productImage }) => {
  const [tryOnMode, setTryOnMode] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  
  const startTryOn = () => {
    // Simulate camera permission/availability check
    const simulateCameraAvailable = Math.random() > 0.3; // 70% chance camera is available
    
    if (simulateCameraAvailable) {
      setTryOnMode(true);
      setCameraError(false);
      toast("Camera activated! Try moving your head to see the item from different angles.");
    } else {
      setCameraError(true);
      toast.error("Camera access denied or not available on this device.");
    }
  };
  
  const stopTryOn = () => {
    setTryOnMode(false);
  };

  return (
    <div className="mb-6 border rounded-lg p-4 bg-gray-50">
      <div className="flex items-center gap-2 mb-4">
        <Camera className="h-5 w-5 text-ju4u-coral" />
        <h3 className="font-semibold">Virtual Try-On</h3>
      </div>
      
      {!tryOnMode && !cameraError && (
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            See how this {productType === 'tops' ? 'top' : productType === 'glasses' ? 'eyewear' : productType} looks on you with our virtual try-on feature!
          </p>
          <Button onClick={startTryOn} variant="outline">
            Try It On
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Requires camera access. Works best on mobile devices.
          </p>
        </div>
      )}
      
      {cameraError && (
        <div className="bg-red-50 border border-red-100 rounded-md p-4 text-center">
          <p className="text-sm text-red-800 mb-2">
            Camera access is required for virtual try-on. Please enable camera permissions and try again.
          </p>
          <Button onClick={startTryOn} variant="outline" size="sm">
            Retry
          </Button>
        </div>
      )}
      
      {tryOnMode && (
        <div className="relative">
          <div className="aspect-video bg-black rounded-md overflow-hidden relative mb-3">
            {/* Simulated camera feed with product overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-white text-sm">Camera feed simulation</div>
            </div>
            
            {/* Product overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={productImage} 
                alt="Product overlay" 
                className={`
                  ${productType === 'hats' ? 'w-1/3 absolute top-0' : ''}
                  ${productType === 'glasses' ? 'w-1/2 opacity-80' : ''}
                  ${productType === 'tops' ? 'w-3/4 opacity-70' : ''}
                  ${productType === 'accessories' ? 'w-1/4 absolute bottom-0 right-0' : ''}
                `}
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.5))'
                }}
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-600">
              Move around to adjust the position
            </p>
            <Button size="sm" variant="outline" onClick={stopTryOn}>
              <X className="h-4 w-4 mr-1" />
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualTryOn;
