import { Player } from "@lottiefiles/react-lottie-player";
import clsx from "clsx";

type RecurringAfterScreenProps = {
  thankYouTitle?: string;
  thankYouMessage: string;
  customText: string;
  recurringAmount: number;
  recurringCurrencySymbol: string;
  recurringPeriodLabel: string;
  nextPaymentDate: string;
  availableCurrencies: string[];
  onCancel: () => void;

  showCustomAmountInput: boolean;
  onShowCustomAmountInputToggle: () => void;

  customAmountValue: number;
  onCustomAmountChange: (value: number) => void;
  customCurrencyValue: string;
  onCustomCurrencyChange: (value: string) => void;

  rewardAnimationSrc: object;
  onSubmit: () => void;
  isSubmitting?: boolean;
};

export function RecurringAfterScreen({
  thankYouTitle = "Thank you!",
  thankYouMessage,
  customText,
  recurringAmount,
  recurringCurrencySymbol,
  recurringPeriodLabel,
  nextPaymentDate,
  availableCurrencies,
  onCancel,
  showCustomAmountInput,
  onShowCustomAmountInputToggle,
  customAmountValue,
  onCustomAmountChange,
  customCurrencyValue,
  onCustomCurrencyChange,
  onSubmit,
  rewardAnimationSrc,
  isSubmitting = false,
}: RecurringAfterScreenProps) {
  return (
    <div className="bg-white">
      <h2 className="text-2xl text-[#212121] font-bold text-center mb-4">
        {thankYouTitle}
      </h2>

      <div className="border-t border-[#D4D4D4] my-4" />

      <div className="mb-6 relative">
        <div className="absolute left-[-2rem] top-[-4rem]">
          <Player
            src={rewardAnimationSrc}
            style={{ width: "8rem", height: "8rem" }}
            autoplay
            loop
            speed={1}
          />
        </div>

        <p className="text-[#666666] text-sm ml-12">
          <span className="font-bold">{thankYouMessage}</span>
        </p>
      </div>

      <div className="bg-primary text-white rounded-xl p-5">
        <div className="text-center text-sm mb-6">
          <p className="mb-4">{customText}</p>
          <p className="text-sm">
            Next payment would be from ({nextPaymentDate})
          </p>
        </div>

        <div className="text-center">
          <p className="font-bold text-white text-[32px]">
            <span className="text-xl">{recurringCurrencySymbol}</span>
            {recurringAmount}/
            <span className="text-xl capitalize">{recurringPeriodLabel}</span>
          </p>
        </div>

        <div className="text-center mb-6">
          <button
            onClick={onShowCustomAmountInputToggle}
            className="text-white underline text-sm"
            hidden={showCustomAmountInput}
          >
            Or another amount
          </button>
        </div>

        {showCustomAmountInput && (
          <div className="relative rounded-[1rem] border bg-white border-[#d4d4d4] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] w-full px-3 py-2 mb-6 flex items-center">
            <div className="text-primary">{recurringCurrencySymbol}</div>
            <div className="flex items-center flex-grow">
              <input
                className={clsx(
                  "border-0 outline-none bg-transparent text-primary pl-[10px] text-[32px] font-bold",
                  "flex-grow min-w-0"
                )}
                inputMode="decimal"
                value={customAmountValue}
                onChange={(e) => onCustomAmountChange(Number(e.target.value))}
                name="amount"
                placeholder="Enter amount"
                disabled={isSubmitting}
              />
              <div>
                <select
                  value={customCurrencyValue}
                  onChange={(e) => onCustomCurrencyChange(e.target.value)}
                  className="bg-transparent border-none focus:outline-none text-primary text-[1rem] font-normal leading-normal"
                  disabled={isSubmitting}
                >
                  {availableCurrencies.map((cur) => (
                    <option key={cur} value={cur}>
                      {cur}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className={clsx(
            "w-full border font-bold text-xs border-white rounded-lg py-3 mb-3 transition-colors",
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "hover:bg-primary/15"
          )}
        >
          {isSubmitting ? (
            "Processing..."
          ) : (
            <>
              I want to give{" "}
              <span className="capitalize">({recurringPeriodLabel})</span>
            </>
          )}
        </button>

        <div className="text-center">
          <button
            onClick={onCancel}
            className="text-white text-xs font-bold"
            disabled={isSubmitting}
          >
            Not this time
          </button>
        </div>
      </div>
    </div>
  );
}
