import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

// Import default animations for default prop values
import defaultRegularDonorAnimationData from "assets/animations/checkout-regular-donor-image.json";
import defaultHeartAnimationData from "assets/animations/heart-lottie-ll.json";

// Updated Prop Types for Presentational Component
type RecurringBeforeScreenProps = {
  organizationLogo?: string;
  selectedFrequency: string; // Keep for display
  customText?: string;
  currencySymbol: string; // Pass symbol directly
  displayRecurringAmount: string | number; // Pass pre-calculated display amount
  displayOneTimeAmount: string | number; // Pass pre-calculated display amount
  onDonateClick: () => void; // Simplified callback
  onOneTimeClick: () => void;
  // Expect animation data objects (or specific Lottie type)
  regularDonorAnimationSrc?: object;
  heartAnimationSrc?: object;
};

export const RecurringBeforeScreen: React.FC<RecurringBeforeScreenProps> = ({
  organizationLogo,
  selectedFrequency,
  customText,
  currencySymbol,
  displayRecurringAmount,
  displayOneTimeAmount,
  onDonateClick,
  onOneTimeClick,
  // Use imported data for defaults
  regularDonorAnimationSrc = defaultRegularDonorAnimationData,
  heartAnimationSrc = defaultHeartAnimationData,
}) => {
  return (
    <section className="bg-white w-full mx-auto space-y-4 relative">
      <div className="mt-4">
        {customText && (
          <div className="text-[#344054] font-semibold text-sm mb-2">
            {customText}
          </div>
        )}
        <div className="relative">
          <Player
            src={regularDonorAnimationSrc}
            autoplay
            loop
            speed={1}
            className="w-[18.1875rem] h-[18.1875rem] mx-auto"
          />
          {organizationLogo && (
            <img
              alt="organisation-logo"
              src={organizationLogo}
              draggable="false"
              className="rounded-full h-[4.5625rem] w-[4.5625rem] object-cover top-[7rem] right-[3.5rem] -z-10 absolute"
              width={70}
              height={70}
            />
          )}
        </div>
      </div>
      <div className="mt-4 bottom-0 left-0 right-0">
        <button
          className="bg-primary rounded-lg py-[1.15625rem] font-bold text-white text-base w-full relative"
          onClick={onDonateClick}
        >
          <div className="absolute bottom-0 z-10">
            <Player
              src={heartAnimationSrc}
              autoplay
              className="absolute w-[10rem] bottom-[-1rem] left-[-1rem]"
              loop
              speed={1}
            />
          </div>
          Donate {currencySymbol}
          {displayRecurringAmount}/
          <span className="capitalize">{selectedFrequency}</span>
        </button>
        <button
          className="bg-transparent py-[18.5px] mt-2 font-bold text-primary text-base w-full"
          onClick={onOneTimeClick}
        >
          Keep my one-off {currencySymbol}
          {displayOneTimeAmount}
          gift
        </button>
      </div>
    </section>
  );
};
