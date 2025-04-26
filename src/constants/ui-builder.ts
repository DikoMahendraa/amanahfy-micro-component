import { CustomIconType } from "types/types-icons";
import {
  UIBuilderElementType,
  UIBuilderElementVideoPlatformType,
} from "types/ui-builder";
import { IconType } from "react-icons";
import { FaImage } from "react-icons/fa6";
import { IoText } from "react-icons/io5";
import { PiVideoFill } from "react-icons/pi";
import {
  IconFacebookCircle,
  IconInstagramCircle,
  IconXCircle,
  IconYoutubeCircle,
} from "components";
import * as yup from "yup";

export const uiBuilderValidationSchema = yup.object().shape({
  elements: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().default("").trim().required("Element ID is required"),
        name: yup.string().default(""),
        type: yup
          .string()
          .default("")
          .trim()
          .required("Element type is required"),
        content: yup.string().when("type", {
          is: (val: UIBuilderElementType) => val === UIBuilderElementType.TEXT,
          then: (schema) =>
            schema.default("").trim().required("Text content is required"),
          otherwise: (schema) => schema.optional(),
        }),
        videoPlatform: yup.string().when("type", {
          is: (val: UIBuilderElementType) => val === UIBuilderElementType.VIDEO,
          then: (schema) =>
            schema.default("").trim().required("Platform is required"),
          otherwise: (schema) => schema.optional(),
        }),
        videoUrl: yup.string().when("type", {
          is: (val: UIBuilderElementType) => val === UIBuilderElementType.VIDEO,
          then: (schema) =>
            schema
              .default("")
              .url("Invalid URL")
              .trim()
              .required("Video URL is required"),
          otherwise: (schema) => schema.optional(),
        }),
        images: yup
          .array()
          .of(yup.string())
          .when("type", {
            is: (val: UIBuilderElementType) =>
              val === UIBuilderElementType.IMAGE,
            then: (schema) =>
              schema
                .required("Image is required")
                .min(1, "Please upload an image"),
            otherwise: (schema) => schema.optional(),
          }),
      })
    )
    .min(1, "Please add at least 1 element"),
});

export const sectionElementVideoPlatformTypes: Array<{
  available: boolean;
  label: string;
  icon: CustomIconType;
  key: UIBuilderElementVideoPlatformType;
}> = [
  {
    available: true,
    label: "Upload from YouTube",
    icon: IconYoutubeCircle,
    key: UIBuilderElementVideoPlatformType.YOUTUBE,
  },
  {
    available: false,
    label: "Coming soon!",
    icon: IconXCircle,
    key: UIBuilderElementVideoPlatformType.TWITTER,
  },
  {
    available: true,
    label: "Upload from Instagram",
    icon: IconInstagramCircle,
    key: UIBuilderElementVideoPlatformType.INSTAGRAM,
  },
  {
    available: true,
    label: "Upload from Facebook",
    icon: IconFacebookCircle,
    key: UIBuilderElementVideoPlatformType.FACEBOOK,
  },
];

export const sectionElementTypeTitle: Record<UIBuilderElementType, string> = {
  [UIBuilderElementType.TEXT]: "Text",
  [UIBuilderElementType.VIDEO]: "Video",
  [UIBuilderElementType.IMAGE]: "Image",
};

export const sectionElementTypeIcon: Record<UIBuilderElementType, IconType> = {
  [UIBuilderElementType.TEXT]: IoText,
  [UIBuilderElementType.VIDEO]: PiVideoFill,
  [UIBuilderElementType.IMAGE]: FaImage,
};

export const addSectionOptions: Array<{
  type: UIBuilderElementType;
  title: string;
  icon: IconType;
}> = [
  {
    type: UIBuilderElementType.TEXT,
    title: sectionElementTypeTitle[UIBuilderElementType.TEXT],
    icon: sectionElementTypeIcon[UIBuilderElementType.TEXT],
  },
  {
    type: UIBuilderElementType.IMAGE,
    title: sectionElementTypeTitle[UIBuilderElementType.IMAGE],
    icon: sectionElementTypeIcon[UIBuilderElementType.IMAGE],
  },
  {
    type: UIBuilderElementType.VIDEO,
    title: sectionElementTypeTitle[UIBuilderElementType.VIDEO],
    icon: sectionElementTypeIcon[UIBuilderElementType.VIDEO],
  },
];
