export default function CostEfficiencyCard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div
        className="
          relative
          w-[340px]
          h-[480px]
          rounded-3xl
          p-6
          overflow-hidden
          bg-black
          border border-cyan-400/30
          shadow-[0_0_40px_rgba(0,255,255,0.25)]
        "
      >
        {/* Grid Background */}
        <div
          className="
            absolute inset-0
            bg-[linear-gradient(rgba(0,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.08)_1px,transparent_1px)]
            bg-[size:24px_24px]
            pointer-events-none
          "
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          <div>
            <h3 className="text-white text-lg font-semibold">
              Cost Efficiency
            </h3>

            <p className="mt-2 text-cyan-400 text-xl font-bold">
              18–32% reduction in operational costs
            </p>
          </div>

          <div className="mt-6 text-sm text-gray-300 space-y-2 leading-relaxed">
            <p>18–32% reduction in operational costs</p>
            <p>Savings came primarily from:</p>
            <p>• Fewer manual handovers</p>
            <p>• Reduced rework and error correction</p>
            <p>• Better use of existing staff</p>
          </div>

          {/* Arrow Button */}
          <div className="mt-auto flex justify-end">
            <button
              className="
                w-10 h-10
                rounded-full
                border border-cyan-400
                text-cyan-400
                flex items-center justify-center
                hover:bg-cyan-400 hover:text-black
                transition-all
                shadow-[0_0_15px_rgba(0,255,255,0.6)]
              "
            >
              ↗
            </button>
          </div>
        </div>

        {/* Glow Effect */}
        <div
          className="
            absolute inset-0
            rounded-3xl
            shadow-[inset_0_0_30px_rgba(0,255,255,0.25)]
            pointer-events-none
          "
        />
      </div>
    </div>
  );
}
