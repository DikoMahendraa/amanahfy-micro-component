/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from "@storybook/react";
import { useState, useCallback } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { UIBuilderElement } from "components";
import {
  FaFileAlt,
  FaImage,
  FaVideo,
  FaYoutube,
  FaVimeo,
} from "react-icons/fa";
import { UIBuilderElementType } from "types/ui-builder";

// Mock for image conversion
const imageToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
  });
};

const meta: Meta<typeof UIBuilderElement> = {
  title: "Components/organisms/UIBuilderElement",
  component: UIBuilderElement,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <DragDropContext onDragEnd={() => ({})}>
        <Droppable droppableId="story-droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-full max-w-4xl"
            >
              <Story />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UIBuilderElement>;

// Define component with state wrapper for the story
const UIBuilderElementWithState = ({ ...args }) => {
  const [elementData, setElementData] = useState(args.data);
  const [collapsed, setCollapsed] = useState(args.collapsed || true);
  const [editing, setEditing] = useState(args.editing || false);
  const [showConfirmRemove, setShowConfirmRemove] = useState(
    args.showConfirmRemove || false
  );
  const [sectionTitle, setSectionTitle] = useState(elementData.name);
  const [errors, setErrors] = useState(args.error || {});
  const [touched, setTouched] = useState(args.touched || {});

  const sectionElementTypeIcon = {
    [UIBuilderElementType.TEXT]: FaFileAlt,
    [UIBuilderElementType.IMAGE]: FaImage,
    [UIBuilderElementType.VIDEO]: FaVideo,
  };

  const sectionElementTypeTitle = {
    [UIBuilderElementType.TEXT]: "Text",
    [UIBuilderElementType.IMAGE]: "Image",
    [UIBuilderElementType.VIDEO]: "Video",
  };

  const sectionElementVideoPlatformTypes = [
    { key: "youtube", label: "YouTube", icon: FaYoutube, available: true },
    { key: "vimeo", label: "Vimeo", icon: FaVimeo, available: true },
    { key: "tiktok", label: "TikTok", icon: FaVideo, available: false },
    { key: "instagram", label: "Instagram", icon: FaVideo, available: false },
  ];

  const allowedImageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".svg"];

  const onSectionTitleChange = useCallback((value: string) => {
    setSectionTitle(value);
  }, []);

  const onChangeTitle = useCallback(() => {
    setElementData((prev: any) => ({
      ...prev,
      name: sectionTitle.trim(),
    }));
    setEditing(false);
  }, [sectionTitle]);

  const onChangeContent = useCallback((newContent: string) => {
    setElementData((prev: any) => ({
      ...prev,
      content: newContent,
    }));
  }, []);

  const onCancelEditing = useCallback(() => {
    setSectionTitle(elementData.name);
    setEditing(false);
  }, [elementData.name]);

  const onStartEditing = useCallback(() => {
    setEditing(true);
  }, []);

  const onToggleCollapse = useCallback(() => {
    setCollapsed((prev: unknown) => !prev);
  }, []);

  const onShowRemoveConfirm = useCallback(() => {
    setShowConfirmRemove(true);
  }, []);

  const onCloseRemoveConfirm = useCallback(() => {
    setShowConfirmRemove(false);
  }, []);

  const onRemoveSection = useCallback(() => {
    alert("Element would be removed in a real application");
    setShowConfirmRemove(false);
  }, []);

  const onDropImage = useCallback(
    async (files: File[]) => {
      const file = files[0];
      if (!file) return;

      const fileExtension = file.name
        .toLowerCase()
        .slice(file.name.lastIndexOf("."));

      if (!allowedImageExtensions.includes(fileExtension)) {
        alert(
          `Invalid file extension. Please upload images with extensions ${allowedImageExtensions.join(
            ", "
          )}.`
        );
        return;
      }

      const base64Image = await imageToBase64(file);
      setElementData((prev: any) => ({
        ...prev,
        images: [base64Image],
      }));
    },
    [allowedImageExtensions]
  );

  const onRemoveImage = useCallback(() => {
    setElementData((prev: any) => ({
      ...prev,
      images: [],
    }));
  }, []);

  const onSelectVideoPlatform = useCallback((platform: string) => {
    setElementData((prev: any) => ({
      ...prev,
      videoPlatform: platform,
    }));
  }, []);

  const onVideoUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setElementData((prev: any) => ({
        ...prev,
        videoUrl: value,
      }));

      // Basic validation
      if (!value.trim()) {
        setErrors((prev: any) => ({
          ...prev,
          videoUrl: "URL is required",
        }));
      } else if (!value.startsWith("https://")) {
        setErrors((prev: any) => ({
          ...prev,
          videoUrl: "URL must start with https://",
        }));
      } else {
        setErrors((prev: any) => ({ ...prev, videoUrl: undefined }));
      }

      setTouched((prev: any) => ({ ...prev, videoUrl: true }));
    },
    []
  );

  const onVideoUrlBlur = useCallback(() => {
    setTouched((prev: any) => ({ ...prev, videoUrl: true }));
  }, []);

  return (
    <UIBuilderElement
      index={args.index}
      data={elementData}
      error={errors}
      touched={touched}
      collapsed={collapsed}
      editing={editing}
      showConfirmRemove={showConfirmRemove}
      sectionTitle={sectionTitle}
      sectionElementTypeTitle={sectionElementTypeTitle}
      sectionElementTypeIcon={sectionElementTypeIcon}
      sectionElementVideoPlatformTypes={sectionElementVideoPlatformTypes}
      allowedImageExtensions={allowedImageExtensions}
      onSectionTitleChange={onSectionTitleChange}
      onChangeTitle={onChangeTitle}
      onChangeContent={onChangeContent}
      onCancelEditing={onCancelEditing}
      onStartEditing={onStartEditing}
      onToggleCollapse={onToggleCollapse}
      onShowRemoveConfirm={onShowRemoveConfirm}
      onRemoveSection={onRemoveSection}
      onCloseRemoveConfirm={onCloseRemoveConfirm}
      onDropImage={onDropImage}
      onRemoveImage={onRemoveImage}
      onSelectVideoPlatform={onSelectVideoPlatform}
      onVideoUrlChange={onVideoUrlChange}
      onVideoUrlBlur={onVideoUrlBlur}
    />
  );
};

export const TextElement: Story = {
  render: (args) => <UIBuilderElementWithState {...args} />,
  args: {
    index: 0,
    data: {
      id: "text-1",
      name: "Text Section",
      type: UIBuilderElementType.TEXT,
      content: "<p>This is a sample text content.</p>",
    },
    collapsed: true,
  },
};

export const ImageElement: Story = {
  render: (args) => <UIBuilderElementWithState {...args} />,
  args: {
    index: 1,
    data: {
      id: "image-1",
      name: "Image Section",
      type: UIBuilderElementType.IMAGE,
      images: [],
    },
    collapsed: true,
  },
};

export const ImageElementWithPreview: Story = {
  render: (args) => <UIBuilderElementWithState {...args} />,
  args: {
    index: 2,
    data: {
      id: "image-2",
      name: "Image With Preview",
      type: UIBuilderElementType.IMAGE,
      images: ["https://placehold.co/600x400"],
    },
    collapsed: true,
  },
};

export const VideoElement: Story = {
  render: (args) => <UIBuilderElementWithState {...args} />,
  args: {
    index: 3,
    data: {
      id: "video-1",
      name: "Video Section",
      type: UIBuilderElementType.VIDEO,
      videoPlatform: "youtube",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    collapsed: true,
  },
};

export const EditingTitle: Story = {
  render: (args) => <UIBuilderElementWithState {...args} />,
  args: {
    index: 4,
    data: {
      id: "text-2",
      name: "Edit This Title",
      type: UIBuilderElementType.TEXT,
      content: "<p>This element shows the title editing state.</p>",
    },
    collapsed: true,
    editing: true,
  },
};

export const WithValidationErrors: Story = {
  render: (args) => <UIBuilderElementWithState {...args} />,
  args: {
    index: 5,
    data: {
      id: "video-2",
      name: "",
      type: UIBuilderElementType.VIDEO,
      videoUrl: "invalid-url",
    },
    error: {
      name: "Title is required",
      videoUrl: "URL must start with https://",
    },
    touched: {
      name: true,
      videoUrl: true,
    },
    collapsed: true,
  },
};
