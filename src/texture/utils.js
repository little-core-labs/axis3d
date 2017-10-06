import window from 'global/window'

const {HTMLVideoElement} = window
const {HTMLCanvasElement} = window
const {HTMLImageElement} = window

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
const {
  HAVE_NOTHING = 0,
  HAVE_METADATA = 1,
  HAVE_CURRENT_DATA = 2,
  HAVE_FUTURE_DATA = 3,
  HAVE_ENOUGH_DATA = 4,
} = (HTMLVideoElement || {})

export {
  HAVE_NOTHING,
  HAVE_METADATA,
  HAVE_CURRENT_DATA,
  HAVE_FUTURE_DATA,
  HAVE_ENOUGH_DATA,
}

export const isCanvas = (d) => d instanceof HTMLCanvasElement
export const isVideo = (d) => d instanceof HTMLVideoElement
export const isImage = (d) => d instanceof HTMLImageElement

export function isTextureDataReady(data) {
  if (!data) { return false }
  const resolution = getTextureDataResolution(data)
  if (!resolution[0] || !resolution[1]) { return false }
  if (isVideo(data) && data.readyState >= HAVE_CURRENT_DATA) {
    return true
  } else if (isImage(data) || isCanvas(data)) {
    if (data.width && data.height) {
      return true
    }
  }
  return false
}

export function getTextureDataResolution(data) {
  if (isImage(data) || isCanvas(data)) {
    return [data.width, data.height]
  } else if (isVideo(data)) {
    return [data.videoWidth || 0, data.videoHeight || 0]
  } else if (data && data.shape) {
    return data.shape
  } else {
    return [0, 0]
  }
}

export function isCubeTextureDataReady(data) {
  if (isVideo(data) && data.readyState >= HAVE_CURRENT_DATA) {
    return true
  } else if (isImage(data) || isCanvas(data)) {
    if (data.width && data.height) {
      return true
    }
  }
  return false
}

export function getCubeTextureDataResolution(data) {
  if (Array.isArray(data)) {
    data = data
      .filter((d) => d)
      .filter((d) => isImage(d) || isVideo(d) || d.shape.every(Boolean))
      [0]
    return getCubeTextureDataResolution(data)
  }
  if (isImage(data) || isCanvas(data)) {
    return [data.width, data.height]
  } else if (isVideo(data)) {
    return [data.videoWidth || 0, data.videoHeight || 0]
  } else if (data && data.shape) {
    return data.shape
  } else {
    return [0, 0]
  }
}
