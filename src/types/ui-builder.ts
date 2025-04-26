export enum UIBuilderElementType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video'
}

export enum UIBuilderElementVideoPlatformType {
  YOUTUBE = 'youtube',
  TWITTER = 'twitter',
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook'
}

export type UIBuilderElementPayload = {
  id: string
  name: string
  type: UIBuilderElementType
  content?: string
  images?: string[]
  videoPlatform?: string
  videoUrl?: string
}

export type UIBuilderPayload = {
  elements: Array<UIBuilderElementPayload>
}

export type UIBuilderElementProperties = {
  id: string
  name: string
  type: UIBuilderElementType

  // type  = text
  content?: string

  // type = video
  videoPlatform?: string
  videoUrl?: string

  // type = image
  images?: string[]
}