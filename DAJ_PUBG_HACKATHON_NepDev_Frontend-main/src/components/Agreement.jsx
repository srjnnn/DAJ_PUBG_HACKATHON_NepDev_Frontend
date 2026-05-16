import { useState } from "react";

export default function AgreementCheckbox({ checked, onChange }) {
  return (
    <div>
      <label className="flex items-center text-sm">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="mr-2 accent-blue-500"
        />
        I agree to the Terms and{" "}
        <a href="#" className="text-blue-500 ml-1">
          Privacy Policy
        </a>
      </label>
    </div>
  );
}
