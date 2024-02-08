/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

function App() {
  const [bodyMass, setBodyMass] = useState(60);
  const [equipmentMass, setEquipmentMass] = useState(10);
  // const [totalDiverMass, setTotalDiverMass] = useState(70);
  const [wetSuit, setWetSuit] = useState(0.03); // Default value for 3 mm wet suit
  const [waterType, setWaterType] = useState(0); // Default value for Fresh
  const [tankType, setTankType] = useState(0.53); // Default value for Aluminum 10l
  const [ballastWeight, setBallastWeight] = useState(0);
  const [weightUnit, setWeightUnit] = useState("kg");
  const totalDiverMass = bodyMass + equipmentMass;
  const calculateBallastWeight = () => {
    const estimatedWeight =
      bodyMass * wetSuit + totalDiverMass * waterType + tankType;
    setBallastWeight(estimatedWeight);
  };

  const handleUnitChange = (e) => {
    setWeightUnit(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md my-10">
      <h2 className="text-lg font-semibold mb-4">Scuba Weight Calculator</h2>
      <div className="mb-4">
        <label htmlFor="bodyMass" className="block mb-1">
          Body mass (kg)
        </label>
        <input
          type="number"
          id="bodyMass"
          className="w-full p-1 outline-none rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
          value={bodyMass}
          onChange={(e) => setBodyMass(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="equipmentMass" className="block mb-1">
          Equipment mass (kg)
        </label>
        <input
          type="number"
          id="equipmentMass"
          className="w-full p-1 outline-none rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
          value={equipmentMass}
          onChange={(e) => setEquipmentMass(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="totalDiverMass" className="block mb-1">
          Total diver mass (kg)
        </label>
        <input
          type="number"
          id="totalDiverMass"
          className="w-full p-1 outline-none rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
          value={totalDiverMass}
          readOnly
        />
      </div>
      <div className="mb-4">
        <label htmlFor="wetSuit" className="block mb-1">
          Wet suit
        </label>
        <select
          id="wetSuit"
          className="w-full p-1 outline-none rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
          value={wetSuit}
          onChange={(e) => setWetSuit(parseFloat(e.target.value))}
        >
          <option value={0.03}>3 mm wet suit</option>
          <option value={0.05}>5 mm wet suit</option>
          <option value={0.07}>7 mm wet suit</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="waterType" className="block mb-1">
          Water type
        </label>
        <select
          id="waterType"
          className="w-full p-1 outline-none rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
          value={waterType}
          onChange={(e) => setWaterType(parseFloat(e.target.value))}
        >
          <option value={0}>Fresh</option>
          <option value={0.0008}>Brackish</option>
          <option value={0.03}>Salty</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="tankType" className="block mb-1">
          Tank type
        </label>
        <select
          id="tankType"
          className="w-full p-1 outline-none rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
          value={tankType}
          onChange={(e) => setTankType(parseFloat(e.target.value))}
        >
          <option value={0.53}>Aluminum 10l (0.35 cu ft)</option>
          <option value={-0.11}>Aluminum 12l (0.42 cu ft)</option>
          <option value={-0.32}>Steel 10l (0.35 cu ft)</option>
          <option value={-0.18}>Steel 12l (0.42 cu ft)</option>
        </select>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500"
        onClick={calculateBallastWeight}
      >
        Calculate
      </button>
      <div className="mt-4">
        <label htmlFor="weightUnit" className="block mb-1">
          Weight unit
        </label>
        <select
          id="weightUnit"
          className="w-full p-1 outline-none rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
          value={weightUnit}
          onChange={handleUnitChange}
        >
          <option value="kg">Kilograms (kg)</option>
          <option value="g">Grams (g)</option>
          <option value="oz">Ounces (oz)</option>
          <option value="lb">Pounds (lb)</option>
          <option value="stones">Stones</option>
        </select>
      </div>
      <div className="mt-4">
        <label htmlFor="ballastWeight" className="block mb-1">
          Estimated ballast belt weight
        </label>
        <input
          type="text"
          id="ballastWeight"
          className="w-full p-1 outline-none rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
          value={`${(weightUnit === "kg"
            ? ballastWeight
            : convertToSelectedUnit(ballastWeight, weightUnit)
          ).toFixed(2)} ${weightUnit}`}
          readOnly
        />
      </div>
    </div>
  );
}

const convertToSelectedUnit = (weightInKg, unit) => {
  switch (unit) {
    case "g":
      return weightInKg * 1000;
    case "oz":
      return weightInKg * 35.274;
    case "lb":
      return weightInKg * 2.20462;
    case "stones":
      return weightInKg * 0.157473;
    default:
      return weightInKg;
  }
};

export default App;
