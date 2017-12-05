import { PerspectiveCameraProjectionContext } from './projection'
import { PerspectiveCameraInfoContext } from './info'
import { PerspectiveCameraViewContext } from './view'
import { Object3DContext } from '../../../object3d'
import { Entity } from '../../../core'

import {
  CameraInverseViewContext,
  CameraInfoContext,
  CameraEyeContext,
} from '../../context'

export function PerspectiveCameraContext(ctx, initialState = {}) {
  return Entity(ctx, initialState,
    Object3DContext(ctx, initialState),
    CameraInfoContext(ctx, initialState),
    PerspectiveCameraInfoContext(ctx, initialState),
    PerspectiveCameraViewContext(ctx, initialState),
    CameraInverseViewContext(ctx, initialState),
    PerspectiveCameraProjectionContext(ctx, initialState),
    CameraEyeContext(ctx, initialState),
  )
}
