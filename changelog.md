# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Avatar Component (`src/components/common/Avatar.tsx`)**
  - Added fallback to display initials derived from the `alt` prop when the image `src` is missing or fails to load.
  - Initials are generated using the first letter of the first word and the first letter of the last word from the `alt` text (e.g., "John Doe" -> "JD").
  - Added `FallbackMissingSrc`, `FallbackInvalidSrc`, and `FallbackInitialsExamples` stories to `Avatar.stories.tsx` to demonstrate the new fallback behavior.

### Changed

- **Refactored `AddExistingCampaignPopup` (`src/components/organisms/campaigns/AddExistingCampaignPopup.tsx`)**

  - Converted into a presentational component, removing internal state (`useState`, `useEffect`) and logic.
  - Component now accepts all data (e.g., `campaigns`, `selectedCampaignId`, `searchTerm`) and event handlers (e.g., `onSelectCampaign`, `onSearchChange`, `onAddCampaign`) via props.
  - Added optional `isLoading` and `isAdding` props for loading states.
  - Updated corresponding story (`AddExistingCampaignPopup.stories.tsx`) to manage state locally and demonstrate new props and loading states.

- **Refactored `RecurringAfterScreen` (`src/components/organisms/checkout/RecurringAfter.tsx`)**

  - Converted into a presentational component, removing internal state (`useState`) and logic.
  - Component now accepts props to control UI state (`showCustomAmountInput`, `customAmountValue`, `customCurrencyValue`) and handlers (`onShowCustomAmountInputToggle`, `onCustomAmountChange`, `onCustomCurrencyChange`, `onSubmit`).
  - Added optional `isSubmitting` prop.
  - Updated corresponding story (`RecurringAfterScreen.stories.tsx`) to manage state locally and demonstrate new props and submitting state.

- **Refactored `RecurringBeforeScreen` (`src/components/organisms/checkout/RecurringBefore.tsx`)**
  - Converted into a presentational component, removing internal calculations.
  - Component now accepts pre-calculated display values (`currencySymbol`, `displayRecurringAmount`, `displayOneTimeAmount`) and simplified event handlers (`onDonateClick`) via props.
  - Changed animation source props (`regularDonorAnimationSrc`, `heartAnimationSrc`) to accept imported animation data objects instead of file paths to work correctly with bundlers.
  - Updated corresponding story (`RecurringBeforeScreen.stories.tsx`) to provide new props and use action loggers.
