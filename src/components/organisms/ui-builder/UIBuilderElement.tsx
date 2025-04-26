import clsx from "clsx";
import { UIBuilderElementType } from "types/ui-builder";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaCheck, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { FiTrash, FiUploadCloud } from "react-icons/fi";
import { PiPencilSimpleLine } from "react-icons/pi";
import { TbGridDots } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import RemoveElementConfirm from "./RemoveElementConfirm";
import Dropzone from "react-dropzone";
import { Input } from "components";
import { IconType } from "react-icons";

// Dynamically import ReactQuill and its CSS
const ReactQuill = React.lazy(() =>
  import("react-quill").then((module) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    import("react-quill/dist/quill.snow.css");
    return module;
  })
);

// Types
export type UIBuilderElementProps = {
  index?: number;
  data?: {
    id: string;
    name: string;
    type: UIBuilderElementType;
    content?: string;
    images?: string[];
    videoPlatform?: string;
    videoUrl?: string;
  };
  error?: {
    name?: string;
    content?: string;
    images?: string;
    videoPlatform?: string;
    videoUrl?: string;
  };
  touched?: {
    name?: boolean;
    content?: boolean;
    images?: boolean;
    videoPlatform?: boolean;
    videoUrl?: boolean;
  };
  collapsed?: boolean;
  editing?: boolean;
  showConfirmRemove?: boolean;
  sectionTitle?: string;
  sectionElementTypeIcon?: Record<string, IconType>;
  sectionElementTypeTitle?: Record<string, string>;
  sectionElementVideoPlatformTypes?: Array<{
    key: string;
    label: string;
    icon: IconType;
    available: boolean;
  }>;
  allowedImageExtensions?: string[];
  // Handlers passed from parent
  onSectionTitleChange?: (value: string) => void;
  onChangeTitle?: () => void;
  onChangeContent?: (newContent: string) => void;
  onCancelEditing?: () => void;
  onStartEditing?: () => void;
  onToggleCollapse?: () => void;
  onShowRemoveConfirm?: () => void;
  onRemoveSection?: () => void;
  onCloseRemoveConfirm?: () => void;
  onDropImage?: (files: File[]) => void;
  onRemoveImage?: () => void;
  onSelectVideoPlatform?: (platform: string) => void;
  onVideoUrlChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVideoUrlBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export const UIBuilderElement: React.FC<UIBuilderElementProps> = (props) => {
  const {
    index,
    data,
    error,
    touched,
    collapsed,
    editing,
    showConfirmRemove,
    sectionTitle,
    sectionElementTypeIcon,
    sectionElementTypeTitle,
    sectionElementVideoPlatformTypes,
    onSectionTitleChange,
    onChangeTitle,
    onChangeContent,
    onCancelEditing,
    onStartEditing,
    onToggleCollapse,
    onShowRemoveConfirm,
    onRemoveSection,
    onCloseRemoveConfirm,
    onDropImage,
    onRemoveImage,
    onSelectVideoPlatform,
    onVideoUrlChange,
    onVideoUrlBlur,
  } = props;

  const ElementTypeIcon = sectionElementTypeIcon?.[data?.type as string];

  return (
    <Draggable
      key={data?.id}
      index={index as number}
      draggableId={`element-${data?.id}`}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={clsx(
            "w-full p-4 border-2 rounded-xl space-y-4 shadow-sm transition-all",
            snapshot.isDragging ? "bg-gray-100" : "bg-white"
          )}
        >
          <div className="w-full flex justify-between">
            <div className="inline-flex items-center gap-4">
              <div
                className="p-1.5 rounded-lg cursor-pointer bg-gray-300"
                {...provided.dragHandleProps}
              >
                {/* @ts-ignore */}
                <TbGridDots className="w-6 h-6" />
              </div>
              {/* @ts-ignore */}
              {!!ElementTypeIcon && <ElementTypeIcon className="w-6 h-6" />}
              <div className="text-gray-500 font-light mr-6">
                {sectionElementTypeTitle?.[data?.type as string]}
              </div>
              {editing ? (
                <div className="inline-flex items-center gap-4">
                  <input
                    type="text"
                    className="border-b-2 w-64 text-lg px-2 placeholder:font-light"
                    placeholder="Enter title here"
                    value={sectionTitle}
                    onChange={(e) => onSectionTitleChange?.(e.target.value)}
                  />
                  {/* @ts-ignore */}
                  <FaCheck
                    title="Save"
                    className="w-5 h-5 cursor-pointer text-green-600"
                    onClick={onChangeTitle}
                  />
                  {/* @ts-ignore */}
                  <IoMdClose
                    title="Cancel"
                    className="w-5 h-5 cursor-pointer text-red-600"
                    onClick={onCancelEditing}
                  />
                </div>
              ) : (
                <div className="inline-flex items-center gap-4">
                  <div className="text-lg">{data?.name}</div>
                  {/* @ts-ignore */}
                  <PiPencilSimpleLine
                    className="w-6 h-6 cursor-pointer"
                    onClick={onStartEditing}
                  />
                </div>
              )}
              {error?.name && touched?.name && (
                <div className="text-red-500">{error?.name}</div>
              )}
            </div>
            <div className="inline-flex items-center gap-4">
              {/* @ts-ignore */}
              <FiTrash
                title="Remove"
                className="w-6 h-6 cursor-pointer"
                onClick={onShowRemoveConfirm}
              />
              <div className="cursor-pointer" onClick={onToggleCollapse}>
                {collapsed ? (
                  // @ts-ignore
                  <FaChevronDown className="w-5 h-5" />
                ) : (
                  // @ts-ignore
                  <FaChevronUp className="w-5 h-5" />
                )}
              </div>
            </div>
          </div>
          <div className={clsx("w-full text-base", !collapsed && "hidden")}>
            {data?.type === UIBuilderElementType.TEXT && (
              <div
                className={clsx(
                  "w-full element-text-editor space-y-1",
                  error?.content && touched?.content && "error"
                )}
              >
                <React.Suspense fallback={<div>Loading editor...</div>}>
                  <ReactQuill
                    theme="snow"
                    value={data?.content || ""}
                    placeholder="Enter a description..."
                    onChange={(val) => onChangeContent?.(val)}
                  />
                </React.Suspense>
                {error?.content && touched?.content && (
                  <div className="text-red-500">{error.content}</div>
                )}
              </div>
            )}
            {data?.type === UIBuilderElementType.IMAGE && (
              <div className="w-full space-y-2">
                {(data?.images || []).length > 0 ? (
                  <div className="w-full relative rounded-xl overflow-hidden">
                    <img
                      alt=""
                      draggable="false"
                      className="w-full"
                      src={data?.images?.[0]}
                    />
                    <div
                      onClick={onRemoveImage}
                      className="cursor-pointer w-10 pt-0 text-4xl aspect-square rounded-full bg-red-500 transition-all hover:bg-red-600 text-white absolute top-4 right-4 grid place-items-center"
                    >
                      {/* @ts-ignore */}
                      <IoMdClose />
                    </div>
                  </div>
                ) : (
                  <Dropzone multiple={false} onDrop={onDropImage}>
                    {({ getRootProps, getInputProps, isDragAccept }) => (
                      <div
                        {...getRootProps()}
                        className={clsx(
                          "w-full py-16 flex flex-col justify-center items-center gap-1 cursor-pointer transition-all rounded-xl",
                          error?.images && touched?.images
                            ? "bg-red-50 border-red-500"
                            : isDragAccept
                            ? "bg-primary/20"
                            : "bg-gray-100"
                        )}
                      >
                        <input {...getInputProps()} />
                        <div className="w-full flex flex-col items-center justify-center gap-1 text-gray-500">
                          <div className="py-2">
                            {/* @ts-ignore */}
                            <FiUploadCloud className="w-16 h-16 text-primary pb-2" />
                          </div>
                          <div className="text-xs lg:text-base">
                            <span className="text-primary font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </div>
                          <div className="text-sm lg:text-lg">
                            SVG, PNG, JPG or GIF
                          </div>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                )}
                {error?.images && touched?.images && (
                  <div className="text-red-500">{error.images}</div>
                )}
              </div>
            )}
            {data?.type === UIBuilderElementType.VIDEO && (
              <div className="w-full space-y-6">
                <div className="w-full py-8 lg:py-16 flex flex-col justify-center items-center gap-1">
                  <div className="text-xl font-semibold">
                    Upload a video from one of these social media platforms.
                  </div>
                  <div className="text-gray-500 font-light">
                    Copy your favorite video links to the input text.
                  </div>
                </div>
                <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {sectionElementVideoPlatformTypes?.map((platform) => (
                    <div
                      key={platform.key}
                      onClick={() =>
                        platform.available &&
                        onSelectVideoPlatform?.(platform.key)
                      }
                      className={clsx(
                        "w-full border-2 rounded-lg p-4 flex items-center gap-4 transition-all",
                        platform.available
                          ? data?.videoPlatform === platform.key
                            ? "bg-primary/20 border-primary"
                            : "cursor-pointer hover:bg-gray-100"
                          : "opacity-50 cursor-not-allowed pointer-events-none bg-gray-200/60"
                      )}
                    >
                      {/* @ts-ignore */}
                      <platform.icon size={36} />
                      <div>{platform.label}</div>
                    </div>
                  ))}
                </div>
                {error?.videoPlatform && touched?.videoPlatform && (
                  <div className="text-red-500 mb-4">{error.videoPlatform}</div>
                )}
                <div className="w-full space-y-1">
                  <label className="font-semibold">URL Video</label>
                  <Input
                    type="url"
                    name={`elements[${index}].videoUrl`}
                    value={data?.videoUrl || ""}
                    onChange={onVideoUrlChange}
                    onBlur={onVideoUrlBlur}
                    placeholder="https://..."
                    className={clsx(
                      !!(error?.videoUrl && touched?.videoUrl) &&
                        "!border-red-500 !bg-red-50 !text-red-500"
                    )}
                  />
                </div>
                {error?.videoUrl && touched?.videoUrl && (
                  <div className="text-red-500">{error.videoUrl}</div>
                )}
              </div>
            )}
          </div>
          <RemoveElementConfirm
            show={showConfirmRemove}
            onClose={onCloseRemoveConfirm}
            onConfirm={onRemoveSection}
          />
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(UIBuilderElement);
