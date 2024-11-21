import React, { useState, useRef, useEffect } from 'react';
import './output.css';

function App() {
  const [image, setImage] = useState(null);
  const [useCamera, setUseCamera] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const seasons = {
    spring: {
      'Light Spring': {
        characteristics: 'Light, warm, and fresh',
        palette: ['#FFB5A7', '#FCD5CE', '#F8EDEB', '#F9DCC4', '#FFE5D9', '#FEC89A', '#D4E09B', '#A7BEA9', '#86A3C3', '#B6CCE0'],
        confidence: 0
      },
      'Warm Spring': {
        characteristics: 'Warm, clear, and vibrant',
        palette: ['#FF9B71', '#FFB627', '#FDA403', '#E8871E', '#D4B996', '#A1CC7D', '#679436', '#4FA3A5', '#5784BA', '#4B6982'],
        confidence: 0
      },
      'Clear Spring': {
        characteristics: 'Clear, warm, and bright',
        palette: ['#FF4D4D', '#FF8C42', '#FDB833', '#C8DF52', '#9EE493', '#66D2D6', '#4DA1F2', '#537BC1', '#845EC2', '#F95794'],
        confidence: 0
      },
      'Bright Spring': {
        characteristics: 'Bright, warm, and dynamic',
        palette: ['#FF0000', '#FF8700', '#FFD700', '#32CD32', '#00FFFF', '#1E90FF', '#FF1493', '#FF69B4', '#4169E1', '#9932CC'],
        confidence: 0
      }
    },
    summer: {
      'Light Summer': {
        characteristics: 'Light, cool, and soft',
        palette: ['#E6B3B3', '#D4C1C1', '#B6CFD0', '#ABC4C7', '#9FB7B9', '#93AAAC', '#879D9E', '#7B9091', '#6F8384', '#627677'],
        confidence: 0
      },
      'Cool Summer': {
        characteristics: 'Cool, soft, and dusty',
        palette: ['#BFB4B4', '#A69999', '#8D7F7F', '#746666', '#5B4D4D', '#425F85', '#5B7BA3', '#7497C1', '#8DB3DF', '#A6CFFD'],
        confidence: 0
      },
      'Soft Summer': {
        characteristics: 'Soft, cool, and muted',
        palette: ['#98817B', '#B4A6A1', '#D0CCC7', '#A5BEBC', '#7B9492', '#6F8A8E', '#506F7C', '#3F586A', '#2D4159', '#1C2A47'],
        confidence: 0
      },
      'True Summer': {
        characteristics: 'Cool, gentle, and refined',
        palette: ['#7D9BA1', '#8FB2B8', '#A1C9CF', '#B3E0E6', '#C5F7FD', '#ADC2D9', '#95ADB5', '#7D9891', '#65836D', '#4D6E49'],
        confidence: 0
      }
    },
    autumn: {
      'Soft Autumn': {
        characteristics: 'Soft, warm, and subtle',
        palette: ['#B1947A', '#9B7E64', '#85684E', '#6F5238', '#593C22', '#435E45', '#5D7A68', '#77968B', '#91B2AE', '#ABCED1'],
        confidence: 0
      },
      'Warm Autumn': {
        characteristics: 'Warm, rich, and earthy',
        palette: ['#8B4513', '#CD853F', '#DEB887', '#D2691E', '#B8860B', '#556B2F', '#6B8E23', '#808000', '#BDB76B', '#F4A460'],
        confidence: 0
      },
      'Deep Autumn': {
        characteristics: 'Deep, warm, and intense',
        palette: ['#800000', '#8B4513', '#A0522D', '#6B4423', '#4A3728', '#2F4F4F', '#556B2F', '#8B008B', '#4B0082', '#191970'],
        confidence: 0
      },
      'True Autumn': {
        characteristics: 'Warm, golden, and rich',
        palette: ['#AF601A', '#C17817', '#D35400', '#E67E22', '#F39C12', '#7D6608', '#935116', '#A93226', '#C0392B', '#884EA0'],
        confidence: 0
      }
    },
    winter: {
      'Clear Winter': {
        characteristics: 'Clear, cool, and bright',
        palette: ['#0C0C54', '#1F1F7A', '#3232A0', '#4545C6', '#5858EC', '#6B6BFF', '#7E7EFF', '#9191FF', '#A4A4FF', '#B7B7FF'],
        confidence: 0
      },
      'Cool Winter': {
        characteristics: 'Cool, deep, and sophisticated',
        palette: ['#000080', '#191970', '#27408B', '#4169E1', '#1E90FF', '#00BFFF', '#87CEEB', '#B0E0E6', '#AFEEEE', '#E0FFFF'],
        confidence: 0
      },
      'Deep Winter': {
        characteristics: 'Deep, cool, and dramatic',
        palette: ['#000000', '#0C0C0C', '#191919', '#262626', '#333333', '#0D0D35', '#1A1A6B', '#2727A0', '#3434D6', '#4141FF'],
        confidence: 0
      },
      'True Winter': {
        characteristics: 'Cool, clear, and contrasting',
        palette: ['#2C3E50', '#34495E', '#1ABC9C', '#2ECC71', '#3498DB', '#9B59B6', '#8E44AD', '#2980B9', '#16A085', '#27AE60'],
        confidence: 0
      }
    }
  };
  const getMainSeason = (season) => {
    if (season.includes('Spring')) return 'spring';
    if (season.includes('Summer')) return 'summer';
    if (season.includes('Autumn')) return 'autumn';
    if (season.includes('Winter')) return 'winter';
    return 'spring';
  };

  useEffect(() => {
    if (useCamera) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [useCamera]);

  const handleToggle = () => {
    setUseCamera(!useCamera);
    setImage(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please check your permissions.');
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
      await analyzeImageWithGoogleVision(file);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      const video = videoRef.current;
      
      // Set canvas dimensions to match video
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;
      
      context.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const dataURL = canvasRef.current.toDataURL('image/png');
      setImage(dataURL);
      stopCamera(); // Stop the camera after taking photo
      setUseCamera(false); // Turn off camera mode
      
      fetch(dataURL)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'captured-image.png', { type: 'image/png' });
          analyzeImageWithGoogleVision(file);
        });
    }
  };

  const analyzeImageWithGoogleVision = async (imageData) => {
    const apiKey = 'AIzaSyBioa8waG3tl3kclrlSeb8L7AvJHMI0Z-E';
    setLoading(true);

    let base64Image;
    if (typeof imageData === 'string') {
      base64Image = imageData.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(imageData);
      await new Promise((resolve) => {
        reader.onloadend = () => {
          base64Image = reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
          resolve();
        };
      });
    }

    try {
      const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [
            {
              image: { content: base64Image },
              features: [{ type: 'IMAGE_PROPERTIES' }],
            },
          ],
        }),
      });

      const data = await response.json();
      if (!data.responses?.[0]?.imagePropertiesAnnotation?.dominantColors?.colors) {
        throw new Error('No color properties found');
      }

      const colors = data.responses[0].imagePropertiesAnnotation.dominantColors.colors;
      const result = analyzeBasicColors(colors);
      setAnalysisResult(result);

    } catch (error) {
      console.error('Detailed error:', error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  

  const analyzeBasicColors = (colors) => {
    const dominantColor = colors[0].color;
    const secondaryColor = colors[1]?.color || dominantColor;
    const tertiaryColor = colors[2]?.color || dominantColor;
  
    const { season, confidence, characteristics, sliderValues } = determineSeasonAndConfidence(
      dominantColor,
      secondaryColor,
      tertiaryColor
    );
  
    const mainSeason = getMainSeason(season);
  
    return {
      season,
      confidence,
      characteristics,
      features: {
        skin: rgbToHex(dominantColor),
        eyes: rgbToHex(secondaryColor),
        hair: rgbToHex(tertiaryColor)
      },
      ratings: {
        temperature: { 
          score: sliderValues.temperature,
          leftLabel: 'Cold',
          rightLabel: 'Warm',
          type: 'temperature'
        },
        brightness: { 
          score: sliderValues.brightness,
          leftLabel: 'Dark',
          rightLabel: 'Light',
          type: 'brightness'
        },
        contrast: { 
          score: sliderValues.contrast,
          leftLabel: 'Soft',
          rightLabel: 'Contrast',
          type: 'contrast'
        }
      },
      palette: seasons[mainSeason][season].palette
    };
  };

  const rgbToHex = (color) => {
    const toHex = (n) => {
      const hex = Math.round(n).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(color.red)}${toHex(color.green)}${toHex(color.blue)}`;
  };
  const resetAnalysis = () => {
    setImage(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const determineSeasonAndConfidence = (dominantColor, secondaryColor, tertiaryColor) => {
    // Calculate more nuanced values
    const warmth = ((dominantColor.red - dominantColor.blue) / 255 + 1) * 5;
    const brightness = ((dominantColor.red + dominantColor.green + dominantColor.blue) / (255 * 3)) * 10;
    const contrast = Math.abs(
      (dominantColor.red + dominantColor.green + dominantColor.blue) -
      (secondaryColor.red + secondaryColor.green + secondaryColor.blue)
    ) / (255 * 3) * 10;
  
    // More balanced season determination
    let season;
    if (warmth > 5) { // Warm
      if (brightness > 7) { // Very bright
        season = contrast > 6 ? 'Clear Spring' : 'Light Spring';
      } else if (brightness > 4) { // Medium brightness
        season = contrast > 6 ? 'Warm Spring' : 'Warm Autumn';
      } else { // Dark
        season = contrast > 6 ? 'Deep Autumn' : 'Soft Autumn';
      }
    } else { // Cool
      if (brightness > 7) { // Very bright
        season = contrast > 6 ? 'Cool Summer' : 'Light Summer';
      } else if (brightness > 4) { // Medium brightness
        season = contrast > 6 ? 'Cool Winter' : 'True Summer';
      } else { // Dark
        season = contrast > 6 ? 'Deep Winter' : 'Soft Summer';
      }
    }
  
    // Calculate more varied confidence
    const confidence = Math.min(
      Math.abs(warmth - 5) * 10 +
      Math.abs(brightness - 5) * 5 +
      Math.abs(contrast - 5) * 5,
      30
    ) + 70; // This will give us a range from 70-100
  
    const mainSeason = getMainSeason(season);
    const characteristics = seasons[mainSeason][season].characteristics;
  
    return {
      season,
      sliderValues: {
        temperature: Math.round(warmth),
        brightness: Math.round(brightness),
        contrast: Math.round(contrast)
      },
      confidence: Math.round(confidence),
      characteristics
    };
  };
  

  return (
    <div className="bg-base-100 absolute inset-0 bg-no-repeat bg-cover bg-center">
      <div className="navbar bg-neutral shadow-md py-4">
        <div className="navbar-start">
        <button onClick={() => window.location.href = '/'} className="btn btn-ghost">
  <div className="flex items-center space-x-2">
    <div className="relative w-10 h-10">
      <div className="absolute top-0 left-0 w-6 h-6 bg-blue-600 rounded-tl-lg"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-400 rounded-br-lg"></div>
    </div>
    <span className="text-3xl font-black tracking-tight">
      <span className="text-blue-600">COLOR</span>
      <span className="text-blue-400">YZE</span>
    </span>
  </div>
</button>
        </div>
        <div className="navbar bg-white py-4 px-8">
          <div className="navbar-start"></div>
          <div className="navbar-end space-x-8 text-lg font-medium">
            <a href="/about" className="text-black hover:text-gray-600">About</a>
            <a href="/database" className="text-black hover:text-gray-600">Database</a>
            <a href="/calculator" className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700">
              Download App
            </a>
          </div>
        </div>
      </div>

      <section className="flex flex-row items-start justify-center gap-8 p-8 mt-8">
        <div className="w-3/4 bg-neutral shadow-xl rounded-xl p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-blue-500">Input Your Picture</h2>
            <div className="form-control">
              <label className="cursor-pointer flex items-center">
                <span className="mr-2">Camera On</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={useCamera}
                  onChange={handleToggle}
                />
              </label>
            </div>
          </div>

          <div className="relative flex justify-center items-center h-[400px] bg-gray-100 border-dashed border-2 border-gray-300 rounded-md overflow-hidden">
            {useCamera ? (
              <video ref={videoRef} className="w-full h-full object-cover rounded-md"></video>
            ) : (
              <>
                {!image && (
                  <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                    <span className="text-gray-500">Upload an Image</span>
                    <input type="file" className="hidden" onChange={handleImageUpload} ref={fileInputRef} accept="image/jpeg,image/png,image/jpg" />
                  </label>
                )}
                {image && (
                  <div className="w-full h-full">
                    <img src={image} alt="Uploaded Preview" className="w-full h-full object-contain rounded-lg" />
                  </div>
                )}
              </>
            )}
            {useCamera && (
              <button
                className="absolute bottom-4 bg-white p-4 rounded-full shadow-lg"
                onClick={takePhoto}
              >
                <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
              </button>
            )}
            <canvas ref={canvasRef} className="hidden" width="640" height="480"></canvas>
          </div>

          {loading && (
            <div className="text-center text-blue-500">Analyzing image...</div>
          )}

          {analysisResult && (
            <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
              <div className="text-center mb-8">
                <h3 className="text-4xl font-bold text-blue-600">{analysisResult.season}</h3>
                <p className="text-lg mt-2">{analysisResult.characteristics}</p>
                <p className="text-sm text-gray-600">Confidence: {analysisResult.confidence}%</p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Recommended Color Palette</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.palette.map((color, index) => (
                      <div 
                        key={index} 
                        className="w-12 h-12 rounded-full"
                        style={{backgroundColor: color}}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                {Object.entries(analysisResult.ratings).map(([key, value]) => (
  <div key={key} className="w-full">
    <div className="flex justify-between text-sm mb-1">
      <span className="font-bold">{value.leftLabel}</span>
      <span className="font-bold">{value.rightLabel}</span>
    </div>
    <input 
      type="range" 
      min="0" 
      max="10" 
      value={value.score} 
      className="range range-primary w-full" 
      readOnly 
    />
  </div>
))}
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Your Colors</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(analysisResult.features).map(([feature, color]) => (
                      <div key={feature} className="text-center">
                        <div 
                          className="w-12 h-12 rounded-full mx-auto mb-2"
                          style={{backgroundColor: color}}
                        />
                        <span className="text-sm capitalize">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 flex justify-center space-x-4">
        <button 
          onClick={resetAnalysis}
          className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors font-semibold shadow-md"
        >
          Reset Image
        </button>
        {useCamera && (
          <button 
            onClick={() => {
              setImage(null);
              setAnalysisResult(null);
              startCamera();
            }}
            className="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors font-semibold shadow-md"
          >
            Retake Photo
          </button>
        )}
      </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-1/2 bg-white shadow-xl rounded-xl p-8 space-y-6 text-gray-700">
          <h2 className="text-2xl font-bold text-blue-600">What the AI Analyzes</h2>
          <p>
            Upload a photo or take a live picture to let our AI analyze your color profile. The AI
            identifies dominant and subtle colors in your image, matching them to seasonal palettes
            and rating key attributes like warmth, lightness, and contrast.
          </p>
          <ul className="list-disc pl-6">
            <li>
              <strong>Season:</strong> Indicates which color palettes best suit your natural tones.
            </li>
            <li>
              <strong>Warmth:</strong> Determines if warm or cool colors complement you.
            </li>
            <li>
            <strong>Brightness:</strong> Measures the balance between light and dark colors.
            </li>
            <li>
              <strong>Contrast:</strong> Reflects whether soft or bold tones enhance your features.
            </li>
          </ul>
          <p className="mt-4">
            Use these insights to pick clothing, makeup, and accessories that enhance your natural beauty!
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;