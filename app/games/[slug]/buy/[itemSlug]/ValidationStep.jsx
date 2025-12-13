import HelpImagePopup from "../../../../../components/HelpImage/HelpImagePopup";

export default function ValidationStep({
  playerId,
  setPlayerId,
  zoneId,
  setZoneId,
  onValidate,
}) {
  return (
    <div className="space-y-5">
<div className="flex items-center justify-between mb-2">
  <h2 className="text-2xl font-bold">Player Verification</h2>
  <HelpImagePopup />
</div>
      
      <input
        value={playerId}
        onChange={(e) => setPlayerId(e.target.value)}
        placeholder="Enter Player ID"
        className="p-3 rounded-lg bg-black/20 border border-gray-700 w-full"
      />
      
      <input
        value={zoneId}
        onChange={(e) => setZoneId(e.target.value)}
        placeholder="Enter Zone ID"
        className="p-3 rounded-lg bg-black/20 border border-gray-700 w-full"
      />
      
      <button
        onClick={onValidate}
        className="bg-[var(--accent)] text-black py-3 rounded-lg w-full font-semibold hover:opacity-90"
      >
        Validate
      </button>
    </div>
  );
}