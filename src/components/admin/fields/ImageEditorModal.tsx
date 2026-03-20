import { useState, useRef, useEffect } from 'react';
import { X, Copy, RotateCcw, Maximize2 } from 'lucide-react';
import { Button } from '../../ui/button';

interface ImageEditorModalProps {
  imageUrl: string;
  onSave: (editedImageUrl: string) => void;
  onClose: () => void;
}

export function ImageEditorModal({ imageUrl, onSave, onClose }: ImageEditorModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [borderRadius, setBorderRadius] = useState(16);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  // Load image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setImage(img);
    img.onerror = () => console.error('Failed to load image');
    img.src = imageUrl;
  }, [imageUrl]);

  // Draw canvas
  useEffect(() => {
    if (!canvasRef.current || !image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save context state
    ctx.save();

    // Translate to center
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.translate(centerX, centerY);

    // Apply rotation
    ctx.rotate((rotation * Math.PI) / 180);

    // Apply zoom and offset
    const scale = zoom;
    const imgWidth = image.width * scale;
    const imgHeight = image.height * scale;
    const x = -imgWidth / 2 + offsetX;
    const y = -imgHeight / 2 + offsetY;

    // Draw image
    ctx.drawImage(image, x, y, imgWidth, imgHeight);

    // Restore context state
    ctx.restore();

    // Draw rounded rectangle border
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.strokeStyle = '#6366F1';
    ctx.lineWidth = 2;
    drawRoundedRect(ctx, 10, 10, canvas.width - 20, canvas.height - 20, borderRadius);
    ctx.stroke();
  }, [image, zoom, rotation, offsetX, offsetY, borderRadius]);

  const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setOffsetX(offsetX + deltaX);
    setOffsetY(offsetY + deltaY);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSave = async () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create a new canvas with proper dimensions
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = 400;
    outputCanvas.height = 400;
    const outputCtx = outputCanvas.getContext('2d');
    if (!outputCtx) return;

    // Draw the preview
    outputCtx.drawImage(canvas, 0, 0);

    // Apply rounded corners by drawing with clipping
    if (borderRadius > 0) {
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = 400;
      finalCanvas.height = 400;
      const finalCtx = finalCanvas.getContext('2d');
      if (!finalCtx) return;

      // Create clipping region
      finalCtx.beginPath();
      drawRoundedRect(finalCtx, 0, 0, 400, 400, borderRadius);
      finalCtx.clip();

      // Draw image in clipped region
      finalCtx.drawImage(outputCanvas, 0, 0);
      finalCanvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob!);
        onSave(url);
      });
    } else {
      outputCanvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob!);
        onSave(url);
      });
    }
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setBorderRadius(16);
    setOffsetX(0);
    setOffsetY(0);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Edit Image</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Canvas Preview */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Preview
            </label>
            <div className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 p-4 flex justify-center">
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="cursor-grab active:cursor-grabbing border border-slate-200 dark:border-slate-700 rounded-lg"
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Drag to pan • Scroll to zoom
            </p>
          </div>

          {/* Zoom */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Zoom: {zoom.toFixed(2)}x
            </label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Rotation */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Rotation: {rotation}°
            </label>
            <input
              type="range"
              min="0"
              max="360"
              step="15"
              value={rotation}
              onChange={(e) => setRotation(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex gap-2">
              {[0, 90, 180, 270].map((angle) => (
                <Button
                  key={angle}
                  variant={rotation === angle ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setRotation(angle)}
                  className="flex-1"
                >
                  {angle}°
                </Button>
              ))}
            </div>
          </div>

          {/* Border Radius */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Rounded Corners: {borderRadius}px
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={borderRadius}
              onChange={(e) => setBorderRadius(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex gap-2 flex-wrap">
              {[0, 8, 16, 24, 50, 100].map((radius) => (
                <Button
                  key={radius}
                  variant={borderRadius === radius ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setBorderRadius(radius)}
                >
                  {radius}
                  {radius === 100 ? ' (Circle)' : 'px'}
                </Button>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2">
            <Copy className="w-4 h-4" />
            Apply & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
