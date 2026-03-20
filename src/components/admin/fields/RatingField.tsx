import React from 'react';
import { FormField } from './FormField';
import { Star } from 'lucide-react';

interface RatingFieldProps {
  label: string;
  value: number;
  onChange: (rating: number) => void;
  maxRating?: number;
  required?: boolean;
  description?: string;
}

export function RatingField({
  label,
  value,
  onChange,
  maxRating = 5,
  required,
  description,
}: RatingFieldProps) {
  const handleRatingChange = (rating: number) => {
    if (rating >= 1 && rating <= maxRating) {
      onChange(rating);
    }
  };

  return (
    <FormField
      label={label}
      required={required}
      description={description}
    >
      <div className="flex gap-2">
        {Array.from({ length: maxRating }).map((_, index) => {
          const rating = index + 1;
          const isFilled = rating <= value;

          return (
            <button
              key={rating}
              type="button"
              onClick={() => handleRatingChange(rating)}
              className="transition-transform hover:scale-110 focus:outline-none"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  isFilled
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-slate-300 dark:text-slate-600'
                }`}
              />
            </button>
          );
        })}
        <span className="ml-4 text-sm font-medium text-slate-700 dark:text-slate-300">
          {value} / {maxRating}
        </span>
      </div>
    </FormField>
  );
}
