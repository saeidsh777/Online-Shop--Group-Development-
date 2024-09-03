import React from 'react'

export default function CategoryInputs() {
  return (
      <div className="flex items-center gap-2">
          <label htmlFor="ram" className="text-sm">
              RAM:
          </label>

          <div>
              <input id="ram" type="text" className="General_Input_1" />
          </div>
      </div>
  );
}
