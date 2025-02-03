import React, { useState } from "react";

export default function MarginShortfallCalculator() {
  const [initialMargin, setInitialMargin] = useState(0);
  const [currentMargin, setCurrentMargin] = useState(0);
  const [mtmLoss, setMtmLoss] = useState(0);
  const [hedgeExit, setHedgeExit] = useState("No");
  const [exchangeMarginIncrease, setExchangeMarginIncrease] = useState(0);

  function handleInputChange(event, setter) {
    setter(parseFloat(event.target.value) || 0);
  }

  function calculateShortfall() {
    let requiredMargin = initialMargin * (1 + exchangeMarginIncrease / 100);
    if (hedgeExit === "Yes") requiredMargin *= 1.5;
    let shortfall = requiredMargin - currentMargin - mtmLoss;
    
    let riskLevel = "Low";
    if (shortfall > 0) riskLevel = shortfall > currentMargin * 0.8 ? "High" : "Medium";

    return { shortfall, riskLevel };
  }

  const { shortfall, riskLevel } = calculateShortfall();

  // Color for risk level
  const riskColors = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-red-600",
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Margin Shortfall Calculator</h2>
      
      {/* Input Fields */}
      <div className="space-y-4">
        <label className="block font-medium">Initial Margin (₹)</label>
        <input
          type="number"
          value={initialMargin}
          onChange={(e) => handleInputChange(e, setInitialMargin)}
          className="w-full p-2 border rounded-md"
        />

        <label className="block font-medium">Current Margin (₹)</label>
        <input
          type="number"
          value={currentMargin}
          onChange={(e) => handleInputChange(e, setCurrentMargin)}
          className="w-full p-2 border rounded-md"
        />

        <label className="block font-medium">MTM Loss (₹)</label>
        <input
          type="number"
          value={mtmLoss}
          onChange={(e) => handleInputChange(e, setMtmLoss)}
          className="w-full p-2 border rounded-md"
        />

        <label className="block font-medium">Did you exit a hedge?</label>
        <select
          value={hedgeExit}
          onChange={(e) => setHedgeExit(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>

        <label className="block font-medium">Exchange Margin Increase (%)</label>
        <input
          type="number"
          value={exchangeMarginIncrease}
          onChange={(e) => handleInputChange(e, setExchangeMarginIncrease)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Risk Meter */}
      <div className={`mt-6 p-4 text-white text-center rounded-md ${riskColors[riskLevel]}`}>
        <h3 className="text-lg font-bold">Risk Level</h3>
        <p className="text-2xl">{riskLevel}</p>
      </div>

      {/* Shortfall Output */}
      <div className="mt-4 p-4 bg-gray-100 rounded-md text-center">
        <p className="text-lg">
          Shortfall Amount: <strong>₹{shortfall.toFixed(2)}</strong>
        </p>
      </div>
    </div>
  );
}
