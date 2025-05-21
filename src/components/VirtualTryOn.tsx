
import React, { useState } from 'react';
import { Camera, XCircle, Camera as CameraIcon, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VirtualTryOnProps {
  productType: 'hats' | 'tops' | 'glasses' | 'accessories';
  productImage: string;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ productType, productImage }) => {
  const [showModal, setShowModal] = useState(false);
  const [cameraState, setCameraState] = useState<'inactive' | 'requesting' | 'active' | 'error'>('inactive');
  const [isVideoCaptureSupported, setIsVideoCaptureSupported] = useState(true);

  const handleOpenTryOn = () => {
    // Check if browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsVideoCaptureSupported(false);
    }
    
    setShowModal(true);
  };

  const handleStartCamera = () => {
    setCameraState('requesting');
    
    // Simulate camera access request with timeout
    setTimeout(() => {
      // In a real implementation, this would use navigator.mediaDevices.getUserMedia()
      // For demo, we'll simulate camera access being granted 80% of the time
      if (Math.random() > 0.2) {
        setCameraState('active');
      } else {
        setCameraState('error');
      }
    }, 1500);
  };

  const renderCameraView = () => {
    switch (cameraState) {
      case 'inactive':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-gray-100 rounded-full p-4 mb-3">
              <Camera className="h-8 w-8 text-gray-500" />
            </div>
            <p className="text-center text-gray-700 mb-6">
              Allow camera access to virtually try on this item
            </p>
            <Button
              onClick={handleStartCamera}
              className="bg-ju4u-black hover:bg-black"
            >
              Start Camera
            </Button>
          </div>
        );
      
      case 'requesting':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-pulse">
              <Camera className="h-12 w-12 text-gray-400" />
            </div>
            <p className="text-center text-gray-700 mt-4">
              Requesting camera access...
            </p>
          </div>
        );
      
      case 'active':
        return (
          <div className="relative h-full">
            {/* Mock camera feed - in a real app, this would be a video element */}
            <div className="relative h-full bg-gray-900">
              {/* Simulated webcam feed using a placeholder image */}
              <img 
                src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923"
                alt="Camera feed"
                className="w-full h-full object-cover opacity-85"
              />
              
              {/* Overlay the product image on the "camera feed" */}
              <div 
                className={`absolute ${
                  productType === 'hats' ? 'top-5 left-1/2 transform -translate-x-1/2 w-40' : 
                  productType === 'glasses' ? 'top-1/4 left-1/2 transform -translate-x-1/2 w-32' :
                  productType === 'tops' ? 'top-1/3 left-1/2 transform -translate-x-1/2 w-48' :
                  'top-1/3 right-10 w-24'
                }`}
              >
                <img 
                  src={productImage} 
                  alt="Virtual try-on" 
                  className="w-full h-auto"
                  style={{ opacity: 0.9, filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))' }}
                />
              </div>
              
              {/* Controls overlay */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                <Button 
                  size="icon" 
                  variant="secondary"
                  className="rounded-full h-12 w-12 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                >
                  <CameraIcon className="h-6 w-6 text-white" />
                </Button>
                
                <Button 
                  size="icon" 
                  variant="secondary"
                  className="rounded-full h-12 w-12 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                >
                  <Video className="h-6 w-6 text-white" />
                </Button>
              </div>
            </div>
          </div>
        );
      
      case 'error':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-red-50 rounded-full p-4 mb-3">
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-lg font-medium text-red-800 mb-2">Camera access denied</h3>
            <p className="text-center text-gray-700 mb-6">
              To use the virtual try-on feature, please allow camera access in your browser settings.
            </p>
            <Button
              variant="outline"
              onClick={() => setCameraState('inactive')}
            >
              Try Again
            </Button>
          </div>
        );
    }
  };

  return (
    <>
      <Button 
        variant="outline"
        className="w-full mt-4 flex items-center justify-center"
        onClick={handleOpenTryOn}
      >
        <Camera className="mr-2 h-4 w-4" />
        Virtual Try-On
      </Button>
      
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-medium">Virtual Try-On</h3>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setCameraState('inactive');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            
            {!isVideoCaptureSupported ? (
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-yellow-50 rounded-full p-4 mb-3">
                    <XCircle className="h-8 w-8 text-yellow-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Device Not Supported</h3>
                  <p className="text-gray-600 mb-6">
                    Your browser or device doesn't support the camera features needed for virtual try-on.
                  </p>
                  <p className="text-sm text-gray-500">
                    Try using a modern browser like Chrome, Firefox, or Safari on a device with a camera.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-96">
                {renderCameraView()}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VirtualTryOn;
