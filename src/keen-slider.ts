import Slider from './core/slider'
import {
  SliderHooks,
  SliderInstance,
  SliderOptions,
  SliderPlugin,
} from './core/types'
import Modes from './plugins/modes'
import {
  DRAG_ANIMATION_MODE_FREE,
  DRAG_ANIMATION_MODE_FREE_SNAP,
  DRAG_ANIMATION_MODE_SNAP,
  DragAnimationOptions,
  HOOK_DRAG_CHECKED,
  HOOK_DRAG_ENDED,
  HOOK_DRAG_STARTED,
  HOOK_DRAGGED,
  HOOK_OPTIONS_CHANGED,
  HOOK_UPDATED,
} from './plugins/types'
import Drag from './plugins/web/drag'
import Renderer from './plugins/web/renderer'
import { Container } from './plugins/web/types'
import {
  DragOptions,
  HOOK_DESTROYED,
  RendererOptions,
  WebInstance,
  WebOptions,
} from './plugins/web/types'
import Web from './plugins/web/web'

export type KeenSliderHooks =
  | SliderHooks
  | HOOK_OPTIONS_CHANGED
  | HOOK_UPDATED
  | HOOK_DRAGGED
  | HOOK_DRAG_ENDED
  | HOOK_DRAG_STARTED
  | HOOK_DRAG_CHECKED
  | HOOK_DESTROYED

export type KeenSliderOptions<
  O = {},
  P = {},
  H extends string = KeenSliderHooks
> = SliderOptions<
  WebOptions<KeenSliderOptions<O, P, H>> &
    DragOptions &
    RendererOptions &
    DragAnimationOptions<
      | DRAG_ANIMATION_MODE_SNAP
      | DRAG_ANIMATION_MODE_FREE
      | DRAG_ANIMATION_MODE_FREE_SNAP
    >
> & {
  [key in Exclude<
    H | KeenSliderHooks,
    keyof SliderOptions<WebOptions<{}>> &
      DragOptions &
      RendererOptions &
      DragAnimationOptions<
        | DRAG_ANIMATION_MODE_SNAP
        | DRAG_ANIMATION_MODE_FREE
        | DRAG_ANIMATION_MODE_FREE_SNAP
      >
  >]?: (slider: KeenSliderInstance<O, P, H>) => void
} & Omit<
    O,
    keyof SliderOptions<WebOptions<{}>> &
      DragOptions &
      RendererOptions &
      DragAnimationOptions<
        | DRAG_ANIMATION_MODE_SNAP
        | DRAG_ANIMATION_MODE_FREE
        | DRAG_ANIMATION_MODE_FREE_SNAP
      >
  >

export type KeenSliderInstance<
  O = {},
  P = {},
  H extends string = KeenSliderHooks
> = SliderInstance<
  KeenSliderOptions<O, P, H>,
  WebInstance<KeenSliderOptions<O, P, H>> & P,
  KeenSliderHooks | H
>

export type KeenSliderPlugin<
  O = {},
  P = {},
  H extends string = KeenSliderHooks
> = SliderPlugin<
  KeenSliderOptions<O, P, H>,
  KeenSliderInstance<O, P, H>,
  KeenSliderHooks | H
>

export * from './plugins/types'
export * from './plugins/web/types'
export * from './core/types'

const KeenSlider = function (
  container: Container,
  options?: KeenSliderOptions,
  plugins?: KeenSliderPlugin[]
): KeenSliderInstance {
  try {
    const defOpts = {
      drag: true,
      mode: 'snap',
      renderMode: 'precision',
      rubberband: true,
      selector: '.keen-slider__slide',
    } as KeenSliderOptions
    return Slider<KeenSliderOptions, KeenSliderInstance, KeenSliderHooks>(
      options,
      [
        Web<KeenSliderOptions>(container, defOpts),
        Renderer,
        Drag,
        Modes,
        ...(plugins || []),
      ]
    )
  } catch (e) {
    console.error(e)
  }
}

export default KeenSlider as unknown as {
  new <O = {}, P = {}, H extends string = KeenSliderHooks>(
    container: Container,
    options?: KeenSliderOptions<O, P, H>,
    plugins?: KeenSliderPlugin<O, P, H>[]
  ): KeenSliderInstance<O, P, H>
}
