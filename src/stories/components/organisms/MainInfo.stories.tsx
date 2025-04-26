import { Meta, StoryObj } from "@storybook/react";
import { MainInfo, MainInfoProps } from "components";
import { useRef, useState } from "react";
import { type Crop } from "react-image-crop";

const meta: Meta<typeof MainInfo> = {
  title: "Components/organisms/MainInfo",
  component: MainInfo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MainInfo>;

// Wrapper component to handle the state and logic for the MainInfo component
const MainInfoWithState = (args: MainInfoProps) => {
  const [firstName, setFirstName] = useState(args.firstName || "");
  const [lastName, setLastName] = useState(args.lastName || "");
  const [phoneNumber, setPhoneNumber] = useState(args.phoneNumber || "");
  const [email, setEmail] = useState(args.email || "");
  const [aboutMe, setAboutMe] = useState(args.aboutMe || "");

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop | undefined>(undefined);

  const avatarRef = useRef<HTMLImageElement>(null);

  const onFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "aboutMe":
        setAboutMe(value);
        break;
    }

    // Simple validation for demo purposes
    if (value.trim() === "" && name !== "aboutMe") {
      setErrors((prev) => ({ ...prev, [name]: "This field is required" }));
    } else if (name === "email" && !value.includes("@")) {
      setErrors((prev) => ({ ...prev, [name]: "Invalid email" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const onFieldBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const onAvatarInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsEditingAvatar(true);
      setAvatarPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onUpdateAvatarCancel = () => {
    setIsEditingAvatar(false);
    setAvatarPreviewUrl(null);
    setCrop(undefined);
  };

  const onUpdateAvatar = () => {
    // In a real application, you would process the cropped image here
    console.log("Avatar updated with crop:", crop);
    setIsEditingAvatar(false);
    // Would normally update avatarUrl with the new cropped image
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with values:", {
      firstName,
      lastName,
      phoneNumber,
      email,
      aboutMe,
    });
    // Check for validation errors
    let hasErrors = false;
    const newErrors: MainInfoProps["errors"] = {};
    const newTouched: MainInfoProps["touched"] = {};

    if (!firstName) {
      newErrors.firstName = "This field is required";
      newTouched.firstName = true;
      hasErrors = true;
    }
    if (!lastName) {
      newErrors.lastName = "This field is required";
      newTouched.lastName = true;
      hasErrors = true;
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = "This field is required";
      newTouched.phoneNumber = true;
      hasErrors = true;
    }
    if (!email) {
      newErrors.email = "This field is required";
      newTouched.email = true;
      hasErrors = true;
    } else if (!email.includes("@")) {
      newErrors.email = "Invalid email";
      newTouched.email = true;
      hasErrors = true;
    }

    setErrors(newErrors);
    setTouched(newTouched);

    if (!hasErrors) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <MainInfo
        avatarUrl={args.avatarUrl}
        firstName={firstName}
        lastName={lastName}
        phoneNumber={phoneNumber}
        email={email}
        aboutMe={aboutMe}
        errors={errors}
        touched={touched}
        isEditingAvatar={isEditingAvatar}
        avatarPreviewUrl={avatarPreviewUrl}
        crop={crop}
        onCropChange={setCrop}
        onAvatarInputChange={onAvatarInputChange}
        onUpdateAvatarCancel={onUpdateAvatarCancel}
        onUpdateAvatar={onUpdateAvatar}
        onFieldChange={onFieldChange}
        onFieldBlur={onFieldBlur}
        onSubmit={onSubmit}
        avatarRef={avatarRef}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <MainInfoWithState {...args} />,
  args: {
    avatarUrl: "https://placehold.co/400",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "1234567890",
    email: "john.doe@example.com",
    aboutMe:
      "Frontend developer passionate about creating beautiful user interfaces.",
  },
};

export const EmptyForm: Story = {
  render: (args) => <MainInfoWithState {...args} />,
  args: {
    avatarUrl: "https://placehold.co/400",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    aboutMe: "",
  },
};

export const WithErrors: Story = {
  render: (args) => {
    const [storyErrors] = useState({
      firstName: "This field is required",
      email: "Invalid email",
    });
    const [storyTouched] = useState({
      firstName: true,
      email: true,
    });

    return (
      <div className="w-full max-w-3xl">
        <MainInfo
          {...args}
          errors={storyErrors}
          touched={storyTouched}
          isEditingAvatar={false}
          avatarPreviewUrl={null}
          crop={undefined}
          onCropChange={() => console.log("has been clicked!")}
          onAvatarInputChange={() => console.log("has been clicked!")}
          onUpdateAvatarCancel={() => console.log("has been clicked!")}
          onUpdateAvatar={() => console.log("has been clicked!")}
          onFieldChange={() => console.log("has been clicked!")}
          onFieldBlur={() => console.log("has been clicked!")}
          onSubmit={(e: React.FormEvent) => e.preventDefault()}
          avatarRef={useRef<HTMLImageElement>(null)}
        />
      </div>
    );
  },
  args: {
    avatarUrl: "https://placehold.co/400",
    firstName: "",
    lastName: "Doe",
    phoneNumber: "1234567890",
    email: "invalid-email",
    aboutMe: "",
  },
};

export const EditingAvatar: Story = {
  render: (args) => {
    const avatarRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>({
      unit: "%",
      x: 25,
      y: 25,
      width: 50,
      height: 50,
    });

    return (
      <div className="w-full max-w-3xl">
        <MainInfo
          {...args}
          isEditingAvatar={true}
          avatarPreviewUrl="https://placehold.co/600x400"
          crop={crop}
          onCropChange={setCrop}
          onAvatarInputChange={() => console.log("has been clicked!")}
          onUpdateAvatarCancel={() => console.log("has been clicked!")}
          onUpdateAvatar={() => console.log("has been clicked!")}
          onFieldChange={() => console.log("has been clicked!")}
          onFieldBlur={() => console.log("has been clicked!")}
          onSubmit={(e) => e.preventDefault()}
          avatarRef={avatarRef}
          errors={{}}
          touched={{}}
        />
      </div>
    );
  },
  args: {
    avatarUrl: "https://placehold.co/400",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "1234567890",
    email: "john.doe@example.com",
    aboutMe:
      "Frontend developer passionate about creating beautiful user interfaces.",
  },
};
