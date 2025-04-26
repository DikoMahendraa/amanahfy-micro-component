import type { Meta, StoryObj } from "@storybook/react";
import { AddFundraisersPopup, FundraiserActionType } from "components";
import { useState } from "react";

// Sample avatar images
const avatarImages = {
  avatar1: "https://i.pravatar.cc/150?img=1",
  avatar2: "https://i.pravatar.cc/150?img=2",
  avatar3: "https://i.pravatar.cc/150?img=3",
};

// Sample fundraisers data
const sampleFundraisers = [
  {
    id: 1,
    name: "Luqni Maulana",
    username: "luqni_maula",
    avatar: "https://i.pravatar.cc/150?img=4",
    role: "Fundraiser",
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "jane_smith",
    avatar: "https://i.pravatar.cc/150?img=5",
    role: "Fundraiser",
  },
  {
    id: 3,
    name: "John Doe",
    username: "john_doe",
    avatar: "https://i.pravatar.cc/150?img=6",
    role: "Fundraiser",
  },
  {
    id: 4,
    name: "Alice Johnson",
    username: "alice_j",
    avatar: "https://i.pravatar.cc/150?img=7",
    role: "Fundraiser",
  },
  {
    id: 5,
    name: "Robert Lee",
    username: "rob_lee",
    avatar: "https://i.pravatar.cc/150?img=8",
    role: "Fundraiser",
  },
];

// Define component metadata
const meta: Meta<typeof AddFundraisersPopup> = {
  title: "Components/organisms/AddFundraisersPopup",
  component: AddFundraisersPopup,
  parameters: {
    layout: "centered",
  },
  // Define controls for certain props
  argTypes: {
    show: { control: "boolean" },
    actionType: {
      control: { type: "select" },
      options: Object.values(FundraiserActionType),
    },
    onClose: { action: "closed" },
    onActionTypeChange: { action: "action type changed" },
    onInviteFundraisers: { action: "fundraisers invited" },
    onAddFundraiser: { action: "fundraiser added" },
  },
  // Default values for all stories
  args: {
    show: true,
    avatarImages,
    allowedImageExtensions: [".png", ".jpg", ".jpeg"],
    onInvalidFileType: (message) => console.log(message),
  },
};

export default meta;
type Story = StoryObj<typeof AddFundraisersPopup>;

// Interactive wrapper component for complex stories
const InteractiveWrapper = ({
  initialActionType = FundraiserActionType.CHOOSE_ACTION,
  ...args
}) => {
  const [actionType, setActionType] = useState(initialActionType);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFundraisers, setSelectedFundraisers] = useState<
    Array<string | number>
  >([]);

  // Form values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState<File | null>(null);

  // Form errors
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pictureError] = useState("");

  // Form touched
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [pictureTouched] = useState(false);

  // Form validation helpers
  const validateFirstName = (value: string) => {
    if (!value.trim()) {
      setFirstNameError("First name is required");
      return false;
    }
    setFirstNameError("");
    return true;
  };

  const validateLastName = (value: string) => {
    if (!value.trim()) {
      setLastNameError("Last name is required");
      return false;
    }
    setLastNameError("");
    return true;
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      setEmailError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Invalid email format");
      return false;
    }

    setEmailError("");
    return true;
  };

  // Handler for fundraiser selection
  const handleFundraiserSelect = (id: string | number) => {
    setSelectedFundraisers((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <AddFundraisersPopup
      show={false}
      onClose={function (): void {
        throw new Error("Function not implemented.");
      }}
      avatarImages={{
        avatar1: "",
        avatar2: "",
        avatar3: "",
      }}
      allowedImageExtensions={[]}
      onInvalidFileType={(_message: string): void => {
        throw new Error(`Function not implemented. ${_message}`);
      }}
      {...args}
      actionType={actionType}
      onActionTypeChange={setActionType}
      // Search and select props
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      fundraisers={sampleFundraisers.filter(
        (f) =>
          f.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          f.username.toLowerCase().includes(searchValue.toLowerCase())
      )}
      selectedFundraisers={selectedFundraisers}
      onFundraiserSelect={handleFundraiserSelect}
      onInviteFundraisers={() => {
        console.log("Inviting fundraisers:", selectedFundraisers);
        args.onInviteFundraisers?.();
      }}
      // Form fields
      firstName={firstName}
      lastName={lastName}
      email={email}
      picture={picture}
      // Form errors
      firstNameError={firstNameError}
      lastNameError={lastNameError}
      emailError={emailError}
      pictureError={pictureError}
      // Form touched states
      firstNameTouched={firstNameTouched}
      lastNameTouched={lastNameTouched}
      emailTouched={emailTouched}
      pictureTouched={pictureTouched}
      // Form handlers
      onFirstNameChange={(value) => {
        setFirstName(value);
        if (firstNameTouched) validateFirstName(value);
      }}
      onLastNameChange={(value) => {
        setLastName(value);
        if (lastNameTouched) validateLastName(value);
      }}
      onEmailChange={(value) => {
        setEmail(value);
        if (emailTouched) validateEmail(value);
      }}
      onFirstNameBlur={() => {
        setFirstNameTouched(true);
        validateFirstName(firstName);
      }}
      onLastNameBlur={() => {
        setLastNameTouched(true);
        validateLastName(lastName);
      }}
      onEmailBlur={() => {
        setEmailTouched(true);
        validateEmail(email);
      }}
      onPictureUpload={(file) => setPicture(file)}
      onPictureRemove={() => setPicture(null)}
      onAddFundraiser={() => {
        setFirstNameTouched(true);
        setLastNameTouched(true);
        setEmailTouched(true);

        const isFirstNameValid = validateFirstName(firstName);
        const isLastNameValid = validateLastName(lastName);
        const isEmailValid = validateEmail(email);

        if (isFirstNameValid && isLastNameValid && isEmailValid) {
          console.log("Adding fundraiser:", {
            firstName,
            lastName,
            email,
            picture,
          });
          args.onAddFundraiser?.();
        }
      }}
    />
  );
};

// Choose Action View Story
export const ChooseActionView: Story = {
  render: (args) => (
    <InteractiveWrapper
      {...args}
      initialActionType={FundraiserActionType.CHOOSE_ACTION}
    />
  ),
};

// Invite Fundraisers View Story
export const InviteFundraisersView: Story = {
  render: (args) => (
    <InteractiveWrapper
      {...args}
      initialActionType={FundraiserActionType.INVITE_FUNDRAISERS}
    />
  ),
};

// Manually Add View Story
export const ManuallyAddView: Story = {
  render: (args) => (
    <InteractiveWrapper
      {...args}
      initialActionType={FundraiserActionType.MANUALLY_ADD}
    />
  ),
};

// Story with validation errors
export const WithValidationErrors: Story = {
  render: (args) => {
    return (
      <AddFundraisersPopup
        {...args}
        actionType={FundraiserActionType.MANUALLY_ADD}
        onActionTypeChange={() => ({})}
        // Empty form values
        firstName=""
        lastName=""
        email="invalid-email"
        picture={null}
        // Display errors
        firstNameError="First name is required"
        lastNameError="Last name is required"
        emailError="Invalid email format"
        pictureError=""
        // Show touched state
        firstNameTouched={true}
        lastNameTouched={true}
        emailTouched={true}
        pictureTouched={false}
        // Empty handlers for the story
        onFirstNameChange={() => ({})}
        onLastNameChange={() => ({})}
        onEmailChange={() => ({})}
        onFirstNameBlur={() => ({})}
        onLastNameBlur={() => ({})}
        onEmailBlur={() => ({})}
        onPictureUpload={() => ({})}
        onPictureRemove={() => ({})}
        onAddFundraiser={() => ({})}
        fundraisers={sampleFundraisers}
        selectedFundraisers={[]}
      />
    );
  },
};

// Story with uploaded picture
export const WithUploadedPicture: Story = {
  render: (args) => {
    // Mock File object for the story
    // Note: In Storybook this won't actually display an image since we can't create real Files
    const mockPicture = new File(["dummy content"], "test-image.jpg", {
      type: "image/jpeg",
    });

    return (
      <AddFundraisersPopup
        {...args}
        actionType={FundraiserActionType.MANUALLY_ADD}
        onActionTypeChange={() => ({})}
        // Form values with filled data
        firstName="John"
        lastName="Doe"
        email="john.doe@example.com"
        picture={mockPicture}
        // Empty errors
        firstNameError=""
        lastNameError=""
        emailError=""
        pictureError=""
        // All fields touched
        firstNameTouched={true}
        lastNameTouched={true}
        emailTouched={true}
        pictureTouched={true}
        // Empty handlers for the story
        onFirstNameChange={() => ({})}
        onLastNameChange={() => ({})}
        onEmailChange={() => ({})}
        onFirstNameBlur={() => ({})}
        onLastNameBlur={() => ({})}
        onEmailBlur={() => ({})}
        onPictureUpload={() => ({})}
        onPictureRemove={() => ({})}
        onAddFundraiser={() => ({})}
        fundraisers={sampleFundraisers}
        selectedFundraisers={[]}
      />
    );
  },
};

// Story with selected fundraisers
export const WithSelectedFundraisers: Story = {
  render: (args) => {
    return (
      <AddFundraisersPopup
        {...args}
        actionType={FundraiserActionType.INVITE_FUNDRAISERS}
        onActionTypeChange={() => ({})}
        // Fundraisers data
        fundraisers={sampleFundraisers}
        selectedFundraisers={[1, 3]} // IDs 1 and 3 are selected
        searchValue=""
        onSearchChange={() => ({})}
        onFundraiserSelect={() => ({})}
        onInviteFundraisers={() => ({})}
        // Required form props even if not used in this view
        firstName=""
        lastName=""
        email=""
        picture={null}
        firstNameError=""
        lastNameError=""
        emailError=""
        pictureError=""
        firstNameTouched={false}
        lastNameTouched={false}
        emailTouched={false}
        pictureTouched={false}
        onFirstNameChange={() => ({})}
        onLastNameChange={() => ({})}
        onEmailChange={() => ({})}
        onFirstNameBlur={() => ({})}
        onLastNameBlur={() => ({})}
        onEmailBlur={() => ({})}
        onPictureUpload={() => ({})}
        onPictureRemove={() => ({})}
        onAddFundraiser={() => ({})}
      />
    );
  },
};
