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
    return { shortfall, riskLevel: shortfall > 0 ? "High" : "Low" };
  }

  const { shortfall, riskLevel } = calculateShortfall();

  return (
    <div>
      <h2>Margin Shortfall Calculator</h2>
      <label>Initial Margin (₹)</label>
      <input
        type="number"
        value={initialMargin}
        onChange={(e) => handleInputChange(e, setInitialMargin)}
      />
      <label>Current Margin (₹)</label>
      <input
        type="number"
        value={currentMargin}
        onChange={(e) => handleInputChange(e, setCurrentMargin)}
      />
      <label>MTM Loss (₹)</label>
      <input
        type="number"
        value={mtmLoss}
        onChange={(e) => handleInputChange(e, setMtmLoss)}
      />
      <label>Hedge Exit</label>
      <select value={hedgeExit} onChange={(e) => setHedgeExit(e.target.value)}>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
      <label>Exchange Margin Increase (%)</label>
      <input
        type="number"
        value={exchangeMarginIncrease}
        onChange={(e) => handleInputChange(e, setExchangeMarginIncrease)}
      />
      <p>Shortfall Amount: ₹{shortfall.toFixed(2)}</p>
      <p>Risk Level: {riskLevel}</p>
    </div>
  );
}
