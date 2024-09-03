import React from 'react'

export default function SelectInput() {
  return (
      <div className="flex items-center gap-2 mb-2">
          <label htmlFor="size" className="text-sm">
              Size:
          </label>
          <div>
              <select name="size" id="size" className="General_Input_1">
                  <option value="-1">Select Size</option>
                  <option value="lg">lg</option>
                  <option value="md">md</option>
              </select>
          </div>
      </div>
  );
}
