import { DEFAULT_COLORS, DEFAULT_TEXT_COLORS } from '../utils/colors';

interface ColorPickerProps {
  currentColor: string;
  currentTextColor: string;
  onColorChange: (color: string) => void;
  onTextColorChange: (color: string) => void;
}

export function ColorPicker({ 
  currentColor, 
  currentTextColor, 
  onColorChange,
  onTextColorChange 
}: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <div>
        <p className="text-sm mb-1 opacity-75 text-black">Background</p>
        <div className="flex gap-1 flex-wrap">
          {DEFAULT_COLORS.map((color) => (
            <button
              key={color}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                currentColor === color ? 'border-gray-800 dark:border-white scale-110' : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
              aria-label={`Select background color ${color}`}
            />
          ))}
        </div>
      </div>
      
      <div>
        <p className="text-sm mb-1 opacity-75 text-black">Text</p>
        <div className="flex gap-1 flex-wrap">
          {DEFAULT_TEXT_COLORS.map((color) => (
            <button
              key={color}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                currentTextColor === color ? 'border-gray-800 dark:border-white scale-110' : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => onTextColorChange(color)}
              aria-label={`Select text color ${color}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}