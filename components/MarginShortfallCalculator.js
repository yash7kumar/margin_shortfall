import React, { useState } from "react";

export default function MarginShortfallCalculator() {
  const [initialMargin, setInitialMargin] = useState(0);
  const [currentMargin, setCurrentMargin] = useState(0);
  const [mtmLoss, setMtmLoss] = useState(0);
  const [hedgeExit, setHedgeExit] = useState("No");
  const [exchangeMarginIncrease, setExchangeMarginIncrease] = useState(0);

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
      <p>Shortfall Amount: ₹{shortfall.toFixed(2)}</p>
      <p>Risk Level: {riskLevel}</p>
    </div>
  );
}
