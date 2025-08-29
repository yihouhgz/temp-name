// import type { Position } from './type'
// export type PopupContainerDOMRect = {
//   scrollLeft?: number
//   scrollTop?: number
// } & DOMRect

// const REGS = {
//   TOP: /top/i,
//   RIGHT: /right/i,
//   BOTTOM: /bottom/i,
//   LEFT: /left/i
// }

// export const isReverse = (rowSpace: number, reverseSpace: number, size: number) => {
//   // 原空间不足，反向空间足够
//   // Insufficient original space, enough reverse space
//   return rowSpace < size && reverseSpace > size
// }

// export const isOverFlow = (rowSpace: number, reverseSpace: number, size: number) => {
//   // 原空间且反向空间都不足
//   // The original space and the reverse space are not enough
//   return rowSpace < size && reverseSpace < size
// }

// export const isHalfOverFlow = (posSpace: number, negSpace: number, size: number) => {
//   // 正半空间或者负半空间不足，即表示有遮挡，需要偏移
//   // Insufficient positive half space or negative half space means that there is occlusion and needs to be offset
//   return posSpace < size || negSpace < size
// }

// export const isHalfAllEnough = (posSpace: number, negSpace: number, size: number) => {
//   // 正半空间和负半空间都足够，即表示可以从 topLeft/topRight 变成 top
//   // Both positive and negative half-spaces are sufficient, which means you can change from topLeft/topRight to top
//   return posSpace >= size || negSpace >= size
// }

// export const getReverse = (
//   viewOverFlow: boolean,
//   containerOverFlow: boolean,
//   shouldReverseView: boolean,
//   shouldReverseContainer: boolean
// ) => {
//   /**
//    * 基于视口和容器一起判断，以下几种情况允许从原方向转到反方向，以判断是否应该由top->bottom为例子
//    *
//    * 1. 视口上下空间不足 且 容器上空间❌下空间✅
//    * 2. 视口上空间❌下空间✅
//    *
//    * Based on the judgment of the viewport and the container, the following situations are allowed to turn from the original direction to the opposite direction
//    * to judge whether it should be top->bottom as an example
//    * 1. There is insufficient space above and below the viewport and the space above the container ❌ the space below ✅
//    * 2. The space above the viewport ❌ the space below ✅ and the space above and below the container is insufficient
//    * 3. Viewport upper space ❌ lower space✅ and container upper space ❌ lower space✅
//    */
//   return (viewOverFlow && shouldReverseContainer) || shouldReverseView
// }

// const _expandPos = (position = '', concatPos: string) => {
//   return position.concat(concatPos)
// }

// const isLR = (position = '') => {
//   return position.includes('left') || position.includes('right')
// }

// const isTB = (position = '') => {
//   return position.includes('top') || position.includes('bottom')
// }

// const _reducePos = (position = '') => {
//   // if cur position consists of two directions, remove the last position
//   const found = ['Top', 'Bottom', 'Left', 'Right'].find((pos) => position.endsWith(pos))
//   return found ? position.replace(found, '') : position
// }

// const _reversePos = (position = '', isVertical = false) => {
//   if (isVertical) {
//     if (REGS.TOP.test(position)) {
//       return position.replace('top', 'bottom').replace('Top', 'Bottom')
//     } else if (REGS.BOTTOM.test(position)) {
//       return position.replace('bottom', 'top').replace('Bottom', 'Top')
//     }
//   } else if (REGS.LEFT.test(position)) {
//     return position.replace('left', 'right').replace('Left', 'Right')
//   } else if (REGS.RIGHT.test(position)) {
//     return position.replace('right', 'left').replace('Right', 'Left')
//   }
//   return position
// }

// const _adjustPos = (
//   position = '',
//   isVertical = false,
//   adjustType = 'reverse',
//   concatPos?: unknown
// ) => {
//   switch (adjustType) {
//     case 'reverse':
//       return _reversePos(position, isVertical)
//     case 'expand':
//       // only happens when position is top/bottom/left/right
//       return _expandPos(position, concatPos as string)
//     case 'reduce':
//       // only happens when position other than top/bottom/left/right
//       return _reducePos(position)
//     default:
//       return _reversePos(position, isVertical)
//   }
// }

// export const adjustPosIfNeed = (
//   position: Position | string,
//   style: Record<string, unknown>,
//   triggerRect: DOMRect,
//   wrapperRect: DOMRect,
//   containerRect: PopupContainerDOMRect
// ) => {
//   const { innerWidth, innerHeight } = window

//   const [marginLeft, marginTop, marginRight, marginBottom] = [0, 0, 0, 0]

//   let isHeightOverFlow = false
//   let isWidthOverFlow = false

//   const raw_spacing = { x: 8, y: 8 }
//   let spacing = 0
//   let ano_spacing = 0

//   if (typeof raw_spacing !== 'number') {
//     const isTopOrBottom = position.includes('top') || position.includes('bottom')
//     spacing = isTopOrBottom ? raw_spacing.y : raw_spacing.x
//     ano_spacing = isTopOrBottom ? raw_spacing.x : raw_spacing.y
//   }

//   if (wrapperRect.width > 0 && wrapperRect.height > 0) {
//     const clientLeft = triggerRect.left
//     const clientRight = triggerRect.right
//     const clientTop = triggerRect.top
//     const clientBottom = triggerRect.bottom

//     const restClientLeft = innerWidth - clientLeft
//     const restClientTop = innerHeight - clientTop
//     const restClientRight = innerWidth - clientRight
//     const restClientBottom = innerHeight - clientBottom

//     const widthIsBigger = wrapperRect.width > triggerRect.width
//     const heightIsBigger = wrapperRect.height > triggerRect.height

//     // 基于视口的微调判断
//     // Fine-tuning judgment based on viewport
//     const shouldViewReverseTop =
//       clientTop - marginTop < wrapperRect.height + spacing &&
//       restClientBottom - marginBottom > wrapperRect.height + spacing
//     const shouldViewReverseLeft =
//       clientLeft - marginLeft < wrapperRect.width + spacing &&
//       restClientRight - marginRight > wrapperRect.width + spacing
//     const shouldViewReverseBottom =
//       restClientBottom - marginBottom < wrapperRect.height + spacing &&
//       clientTop - marginTop > wrapperRect.height + spacing
//     const shouldViewReverseRight =
//       restClientRight - marginRight < wrapperRect.width + spacing &&
//       clientLeft - marginLeft > wrapperRect.width + spacing
//     // const shouldViewReverseTopOver =
//     //   restClientTop - marginBottom < wrapperRect.height + spacing &&
//     //   clientBottom - marginTop > wrapperRect.height + spacing
//     // const shouldViewReverseBottomOver =
//     //   clientBottom - marginTop < wrapperRect.height + spacing &&
//     //   restClientTop - marginBottom > wrapperRect.height + spacing

//     const shouldViewReverseTopSide =
//       restClientTop < wrapperRect.height + ano_spacing &&
//       clientBottom > wrapperRect.height + ano_spacing
//     const shouldViewReverseBottomSide =
//       clientBottom < wrapperRect.height + ano_spacing &&
//       restClientTop > wrapperRect.height + ano_spacing
//     const shouldViewReverseLeftSide =
//       restClientLeft < wrapperRect.width + ano_spacing &&
//       clientRight > wrapperRect.width + ano_spacing
//     const shouldViewReverseRightSide =
//       clientRight < wrapperRect.width + ano_spacing &&
//       restClientLeft > wrapperRect.width + ano_spacing

//     const shouldReverseTopOver =
//       restClientTop < wrapperRect.height + spacing && clientBottom > wrapperRect.height + spacing
//     const shouldReverseBottomOver =
//       clientBottom < wrapperRect.height + spacing && restClientTop > wrapperRect.height + spacing

//     const shouldReverseLeftOver =
//       restClientLeft < wrapperRect.width && clientRight > wrapperRect.width
//     const shouldReverseRightOver =
//       clientRight < wrapperRect.width && restClientLeft > wrapperRect.width

//     // 基于容器的微调判断
//     // Fine-tuning judgment based on container
//     const clientTopInContainer = clientTop - containerRect.top
//     const clientLeftInContainer = clientLeft - containerRect.left
//     const clientBottomInContainer = clientTopInContainer + triggerRect.height
//     const clientRightInContainer = clientLeftInContainer + triggerRect.width

//     const restClientBottomInContainer = containerRect.bottom - clientBottom
//     const restClientRightInContainer = containerRect.right - clientRight
//     const restClientTopInContainer = restClientBottomInContainer + triggerRect.height
//     const restClientLeftInContainer = restClientRightInContainer + triggerRect.width

//     // 当原空间不足，反向空间足够时，可以反向。
//     // When the original space is insufficient and the reverse space is sufficient, the reverse can be performed.
//     const shouldContainerReverseTop = isReverse(
//       clientTopInContainer - marginTop,
//       restClientBottomInContainer - marginBottom,
//       wrapperRect.height + spacing
//     )
//     const shouldContainerReverseLeft = isReverse(
//       clientLeftInContainer - marginLeft,
//       restClientRightInContainer - marginRight,
//       wrapperRect.width + spacing
//     )
//     const shouldContainerReverseBottom = isReverse(
//       restClientBottomInContainer - marginBottom,
//       clientTopInContainer - marginTop,
//       wrapperRect.height + spacing
//     )
//     const shouldContainerReverseRight = isReverse(
//       restClientRightInContainer - marginRight,
//       clientLeftInContainer - marginLeft,
//       wrapperRect.width + spacing
//     )
//     // const shouldContainerReverseTopOver = isReverse(
//     //   restClientTopInContainer - marginBottom,
//     //   clientBottomInContainer - marginTop,
//     //   wrapperRect.height + spacing
//     // )
//     // const shouldContainerReverseBottomOver = isReverse(
//     //   clientBottomInContainer - marginTop,
//     //   restClientTopInContainer - marginBottom,
//     //   wrapperRect.height + spacing
//     // )

//     const shouldContainerReverseTopSide = isReverse(
//       restClientTopInContainer,
//       clientBottomInContainer,
//       wrapperRect.height + ano_spacing
//     )
//     const shouldContainerReverseBottomSide = isReverse(
//       clientBottomInContainer,
//       restClientTopInContainer,
//       wrapperRect.height + ano_spacing
//     )
//     const shouldContainerReverseLeftSide = isReverse(
//       restClientLeftInContainer,
//       clientRightInContainer,
//       wrapperRect.width + ano_spacing
//     )
//     const shouldContainerReverseRightSide = isReverse(
//       clientRightInContainer,
//       restClientLeftInContainer,
//       wrapperRect.width + ano_spacing
//     )

//     const halfHeight = triggerRect.height / 2
//     const halfWidth = triggerRect.width / 2
//     // 视口, 原空间与反向空间是否都不足判断
//     // Viewport, whether the original space and the reverse space are insufficient to judge
//     const isViewYOverFlow = isOverFlow(
//       clientTop - marginTop,
//       restClientBottom - marginBottom,
//       wrapperRect.height + spacing
//     )
//     const isViewXOverFlow = isOverFlow(
//       clientLeft - marginLeft,
//       restClientRight - marginRight,
//       wrapperRect.width + spacing
//     )
//     const isViewYOverFlowSide = isOverFlow(
//       clientBottom - marginTop,
//       restClientTop - marginBottom,
//       wrapperRect.height + spacing
//     )
//     const isViewXOverFlowSide = isOverFlow(
//       clientRight - marginLeft,
//       restClientLeft - marginRight,
//       wrapperRect.width + spacing
//     )
//     const isViewYOverFlowSideHalf = isHalfOverFlow(
//       clientBottom - halfHeight,
//       restClientTop - halfHeight,
//       (wrapperRect.height + ano_spacing) / 2
//     )
//     const isViewXOverFlowSideHalf = isHalfOverFlow(
//       clientRight - halfWidth,
//       restClientLeft - halfWidth,
//       (wrapperRect.width + ano_spacing) / 2
//     )
//     const isViewYEnoughSideHalf = isHalfAllEnough(
//       clientBottom - halfHeight,
//       restClientTop - halfHeight,
//       (wrapperRect.height + ano_spacing) / 2
//     )
//     const isViewXEnoughSideHalf = isHalfAllEnough(
//       clientRight - halfWidth,
//       restClientLeft - halfWidth,
//       (wrapperRect.width + ano_spacing) / 2
//     )

//     // 容器, 原空间与反向空间是否都不足判断
//     // container, whether the original space and the reverse space are insufficient to judge
//     const isContainerYOverFlow = isOverFlow(
//       clientTopInContainer - marginTop,
//       restClientBottomInContainer - marginBottom,
//       wrapperRect.height + spacing
//     )
//     const isContainerXOverFlow = isOverFlow(
//       clientLeftInContainer - marginLeft,
//       restClientRightInContainer - marginRight,
//       wrapperRect.width + spacing
//     )
//     const isContainerYOverFlowSide = isOverFlow(
//       clientBottomInContainer - marginTop,
//       restClientTopInContainer - marginBottom,
//       wrapperRect.height + spacing
//     )
//     const isContainerXOverFlowSide = isOverFlow(
//       clientRightInContainer - marginLeft,
//       restClientLeftInContainer - marginRight,
//       wrapperRect.width + spacing
//     )
//     const isContainerYOverFlowSideHalf = isHalfOverFlow(
//       clientBottomInContainer - halfHeight,
//       restClientTopInContainer - halfHeight,
//       (wrapperRect.height + ano_spacing) / 2
//     )
//     const isContainerXOverFlowSideHalf = isHalfOverFlow(
//       clientRightInContainer - halfWidth,
//       restClientLeftInContainer - halfWidth,
//       (wrapperRect.width + ano_spacing) / 2
//     )
//     const isContainerYEnoughSideHalf = isHalfAllEnough(
//       clientBottomInContainer - halfHeight,
//       restClientTopInContainer - halfHeight,
//       (wrapperRect.height + ano_spacing) / 2
//     )
//     const isContainerXEnoughSideHalf = isHalfAllEnough(
//       clientRightInContainer - halfWidth,
//       restClientLeftInContainer - halfWidth,
//       (wrapperRect.width + ano_spacing) / 2
//     )

//     // 综合 viewport + container 判断微调，即视口 + 容器都放置不行时才能考虑位置调整
//     // Comprehensive viewport + container judgment fine-tuning, that is, the position adjustment can only be considered when the viewport + container cannot be placed.
//     const shouldReverseTop = getReverse(
//       isViewYOverFlow,
//       isContainerYOverFlow,
//       shouldViewReverseTop,
//       shouldContainerReverseTop
//     )
//     const shouldReverseLeft = getReverse(
//       isViewXOverFlow,
//       isContainerXOverFlow,
//       shouldViewReverseLeft,
//       shouldContainerReverseLeft
//     )
//     const shouldReverseBottom = getReverse(
//       isViewYOverFlow,
//       isContainerYOverFlow,
//       shouldViewReverseBottom,
//       shouldContainerReverseBottom
//     )
//     const shouldReverseRight = getReverse(
//       isViewXOverFlow,
//       isContainerXOverFlow,
//       shouldViewReverseRight,
//       shouldContainerReverseRight
//     )

//     // const shouldReverseTopOver = getReverse(isViewYOverFlowSide, isContainerYOverFlowSide, shouldViewReverseTopOver, shouldContainerReverseTopOver);
//     // const shouldReverseBottomOver = getReverse(isViewYOverFlowSide, isContainerYOverFlowSide, shouldViewReverseBottomOver, shouldContainerReverseBottomOver);

//     const shouldReverseTopSide = getReverse(
//       isViewYOverFlowSide,
//       isContainerYOverFlowSide,
//       shouldViewReverseTopSide,
//       shouldContainerReverseTopSide
//     )
//     const shouldReverseBottomSide = getReverse(
//       isViewYOverFlowSide,
//       isContainerYOverFlowSide,
//       shouldViewReverseBottomSide,
//       shouldContainerReverseBottomSide
//     )
//     const shouldReverseLeftSide = getReverse(
//       isViewXOverFlowSide,
//       isContainerXOverFlowSide,
//       shouldViewReverseLeftSide,
//       shouldContainerReverseLeftSide
//     )
//     const shouldReverseRightSide = getReverse(
//       isViewXOverFlowSide,
//       isContainerXOverFlowSide,
//       shouldViewReverseRightSide,
//       shouldContainerReverseRightSide
//     )

//     const isYOverFlowSideHalf = isViewYOverFlowSideHalf && isContainerYOverFlowSideHalf
//     const isXOverFlowSideHalf = isViewXOverFlowSideHalf && isContainerXOverFlowSideHalf

//     switch (position) {
//       case 'top':
//         if (shouldReverseTop) {
//           position = _adjustPos(position, true)
//         }
//         if (isXOverFlowSideHalf && (shouldReverseLeftSide || shouldReverseRightSide)) {
//           position = _adjustPos(position, true, 'expand', shouldReverseLeftSide ? 'Right' : 'Left')
//         }
//         break
//       case 'topLeft':
//         if (shouldReverseTop) {
//           position = _adjustPos(position, true)
//         }
//         if (shouldReverseLeftSide && widthIsBigger) {
//           position = _adjustPos(position)
//         }
//         if (isWidthOverFlow && (isViewXEnoughSideHalf || isContainerXEnoughSideHalf)) {
//           position = _adjustPos(position, true, 'reduce')
//         }
//         break
//       case 'topRight':
//         if (shouldReverseTop) {
//           position = _adjustPos(position, true)
//         }
//         if (shouldReverseRightSide && widthIsBigger) {
//           position = _adjustPos(position)
//         }
//         if (isWidthOverFlow && (isViewXEnoughSideHalf || isContainerXEnoughSideHalf)) {
//           position = _adjustPos(position, true, 'reduce')
//         }
//         break
//       case 'left':
//         if (shouldReverseLeft) {
//           position = _adjustPos(position)
//         }
//         if (isYOverFlowSideHalf && (shouldReverseTopSide || shouldReverseBottomSide)) {
//           position = _adjustPos(position, false, 'expand', shouldReverseTopSide ? 'Bottom' : 'Top')
//         }
//         break
//       case 'leftTop':
//         if (shouldReverseLeft) {
//           position = _adjustPos(position)
//         }
//         if (shouldReverseTopSide && heightIsBigger) {
//           position = _adjustPos(position, true)
//         }
//         if (isHeightOverFlow && (isViewYEnoughSideHalf || isContainerYEnoughSideHalf)) {
//           position = _adjustPos(position, false, 'reduce')
//         }
//         break
//       case 'leftBottom':
//         if (shouldReverseLeft) {
//           position = _adjustPos(position)
//         }
//         if (shouldReverseBottomSide && heightIsBigger) {
//           position = _adjustPos(position, true)
//         }
//         if (isHeightOverFlow && (isViewYEnoughSideHalf || isContainerYEnoughSideHalf)) {
//           position = _adjustPos(position, false, 'reduce')
//         }
//         break
//       case 'bottom':
//         if (shouldReverseBottom) {
//           position = _adjustPos(position, true)
//         }
//         if (isXOverFlowSideHalf && (shouldReverseLeftSide || shouldReverseRightSide)) {
//           position = _adjustPos(position, true, 'expand', shouldReverseLeftSide ? 'Right' : 'Left')
//         }
//         break
//       case 'bottomLeft':
//         if (shouldReverseBottom) {
//           position = _adjustPos(position, true)
//         }
//         if (shouldReverseLeftSide && widthIsBigger) {
//           position = _adjustPos(position)
//         }
//         if (isWidthOverFlow && (isViewXEnoughSideHalf || isContainerXEnoughSideHalf)) {
//           position = _adjustPos(position, true, 'reduce')
//         }
//         break
//       case 'bottomRight':
//         if (shouldReverseBottom) {
//           position = _adjustPos(position, true)
//         }
//         if (shouldReverseRightSide && widthIsBigger) {
//           position = _adjustPos(position)
//         }
//         if (isWidthOverFlow && (isViewXEnoughSideHalf || isContainerXEnoughSideHalf)) {
//           position = _adjustPos(position, true, 'reduce')
//         }
//         break
//       case 'right':
//         if (shouldReverseRight) {
//           position = _adjustPos(position)
//         }
//         if (isYOverFlowSideHalf && (shouldReverseTopSide || shouldReverseBottomSide)) {
//           position = _adjustPos(position, false, 'expand', shouldReverseTopSide ? 'Bottom' : 'Top')
//         }
//         break
//       case 'rightTop':
//         if (shouldReverseRight) {
//           position = _adjustPos(position)
//         }
//         if (shouldReverseTopSide && heightIsBigger) {
//           position = _adjustPos(position, true)
//         }
//         if (isHeightOverFlow && (isViewYEnoughSideHalf || isContainerYEnoughSideHalf)) {
//           position = _adjustPos(position, false, 'reduce')
//         }
//         break
//       case 'rightBottom':
//         if (shouldReverseRight) {
//           position = _adjustPos(position)
//         }
//         if (shouldReverseBottomSide && heightIsBigger) {
//           position = _adjustPos(position, true)
//         }
//         if (isHeightOverFlow && (isViewYEnoughSideHalf || isContainerYEnoughSideHalf)) {
//           position = _adjustPos(position, false, 'reduce')
//         }
//         break
//       case 'leftTopOver':
//         if (shouldReverseTopOver) {
//           position = _adjustPos(position, true)
//         }
//         if (shouldReverseLeftOver) {
//           position = _adjustPos(position)
//         }
//         break
//       case 'leftBottomOver':
//         if (shouldReverseBottomOver) {
//           position = _adjustPos(position, true)
//         }
//         if (shouldReverseLeftOver) {
//           position = _adjustPos(position)
//         }
//         break
//       case 'rightTopOver':
//         if (shouldReverseTopOver) {
//           position = _adjustPos(position, true)
//         }
//         if (shouldReverseRightOver) {
//           position = _adjustPos(position)
//         }
//         break
//       case 'rightBottomOver':
//         if (shouldReverseBottomOver) {
//           position = _adjustPos(position, true)
//         }
//         if (shouldReverseRightOver) {
//           position = _adjustPos(position)
//         }
//         break
//       default:
//         break
//     }
//     // 判断溢出 Judgment overflow
//     // 上下方向 top and bottom
//     if (isTB(position)) {
//       isHeightOverFlow = isViewYOverFlow && isContainerYOverFlow
//       // Related PR: https://github.com/DouyinFE/semi-design/pull/1297
//       // If clientRight or restClientRight less than 0, means that the left and right parts of the trigger are blocked
//       // Then the display of the wrapper will also be affected, make width overflow to offset the wrapper
//       if (position === 'top' || position === 'bottom') {
//         isWidthOverFlow =
//           (isViewXOverFlowSideHalf && isContainerXOverFlowSideHalf) ||
//           clientRight < 0 ||
//           restClientRight < 0
//       } else {
//         isWidthOverFlow =
//           (isViewXOverFlowSide && isContainerXOverFlowSide) ||
//           clientRight < 0 ||
//           restClientRight < 0
//       }
//     }
//     // 左右方向 left and right
//     if (isLR(position)) {
//       isWidthOverFlow = isViewXOverFlow && isContainerXOverFlow
//       // If clientTop or restClientTop less than 0, means that the top and bottom parts of the trigger are blocked
//       // Then the display of the wrapper will also be affected, make height overflow to offset the wrapper
//       if (position === 'left' || position === 'right') {
//         isHeightOverFlow =
//           (isViewYOverFlowSideHalf && isContainerYOverFlowSideHalf) ||
//           clientTop < 0 ||
//           restClientTop < 0
//       } else {
//         isHeightOverFlow =
//           (isViewYOverFlowSide && isContainerYOverFlowSide) || clientTop < 0 || restClientTop < 0
//       }
//     }
//   }
//   return { position, isHeightOverFlow, isWidthOverFlow }
// }

// const _roundPixel = (pixel: number) => {
//   if (typeof pixel === 'number') {
//     return Math.round(pixel)
//   }

//   return pixel
// }

// export const calcPosStyle = (props: {
//   triggerRect: DOMRect
//   wrapperRect: DOMRect
//   containerRect: PopupContainerDOMRect
//   position: Position
//   spacing: number | { x: number; y: number }
//   isOverFlow?: [boolean, boolean]
//   arrowPointAtCenter: boolean
//   showArrow: boolean
//   arrowBounding: DOMRect & { offsetY: number; offsetX: number }
// }) => {
//   const { spacing, isOverFlow } = props
//   const { innerWidth } = window
//   const triggerRect = props.triggerRect
//   const wrapperRect = props.wrapperRect
//   const containerRect = props.containerRect
//   const position = props.position
//   const RAW_SPACING = spacing
//   const showArrow = props.showArrow
//   const arrowPointAtCenter = props.arrowPointAtCenter
//   const arrowBounding = props.arrowBounding
//   const pointAtCenter = showArrow && arrowPointAtCenter

//   let SPACING = RAW_SPACING
//   let ANO_SPACING = 0

//   if (typeof RAW_SPACING !== 'number') {
//     // extended spacing api with {x: number, y: number}, the axes of the spacing is determined based on the position
//     const isTopOrBottom = position.includes('top') || position.includes('bottom')
//     SPACING = isTopOrBottom ? RAW_SPACING.y : RAW_SPACING.x
//     ANO_SPACING = isTopOrBottom ? RAW_SPACING.x : RAW_SPACING.y
//   }

//   const horizontalArrowWidth = arrowBounding.width ? arrowBounding.width : 24
//   const arrowOffsetY = arrowBounding.offsetY ? arrowBounding.offsetY : 0
//   const positionOffsetX = 6
//   const positionOffsetY = 6

//   let left
//   let top
//   let translateX = 0
//   let translateY = 0

//   const middleX = triggerRect.left + triggerRect.width / 2
//   const middleY = triggerRect.top + triggerRect.height / 2
//   const offsetXWithArrow = positionOffsetX + horizontalArrowWidth / 2
//   const offsetYWithArrow = positionOffsetY + verticalArrowHeight / 2

//   const heightDifference = wrapperRect.height - containerRect.height
//   const widthDifference = wrapperRect.width - containerRect.width

//   const offsetHeight = heightDifference > 0 ? heightDifference : 0
//   const offsetWidth = widthDifference > 0 ? widthDifference : 0
//   const isHeightOverFlow = isOverFlow && isOverFlow[0]
//   const isWidthOverFlow = isOverFlow && isOverFlow[1]

//   const isTriggerNearLeft = middleX - containerRect.left < containerRect.right - middleX
//   const isTriggerNearTop = middleY - containerRect.top < containerRect.bottom - middleY

//   const isWrapperWidthOverflow = wrapperRect.width > innerWidth

//   const scaled = Math.abs(wrapperRect?.width - this._adapter.getContainer()?.clientWidth) > 1
//   if (scaled) {
//     SPACING = (SPACING * wrapperRect.width) / this._adapter.getContainer().clientWidth
//   }

//   switch (position) {
//     case 'top':
//       // left = middleX;
//       // top = triggerRect.top - SPACING;
//       left = isWidthOverFlow
//         ? isTriggerNearLeft
//           ? containerRect.left + wrapperRect.width / 2
//           : containerRect.right - wrapperRect.width / 2 + offsetWidth
//         : middleX + ANO_SPACING
//       top = isHeightOverFlow ? containerRect.bottom + offsetHeight : triggerRect.top - SPACING
//       translateX = -0.5
//       translateY = -1
//       break
//     case 'topLeft':
//       // left = pointAtCenter ? middleX - offsetXWithArrow : triggerRect.left;
//       // top = triggerRect.top - SPACING;
//       left = isWidthOverFlow
//         ? isWrapperWidthOverflow
//           ? containerRect.left
//           : containerRect.right - wrapperRect.width
//         : pointAtCenter
//           ? middleX - offsetXWithArrow + ANO_SPACING
//           : triggerRect.left + ANO_SPACING
//       top = isHeightOverFlow ? containerRect.bottom + offsetHeight : triggerRect.top - SPACING
//       translateY = -1
//       break
//     case 'topRight':
//       // left = pointAtCenter ? middleX + offsetXWithArrow : triggerRect.right;
//       // top = triggerRect.top - SPACING;
//       left = isWidthOverFlow
//         ? containerRect.right + offsetWidth
//         : pointAtCenter
//           ? middleX + offsetXWithArrow + ANO_SPACING
//           : triggerRect.right + ANO_SPACING
//       top = isHeightOverFlow ? containerRect.bottom + offsetHeight : triggerRect.top - SPACING
//       translateY = -1
//       translateX = -1
//       break
//     case 'left':
//       // left = triggerRect.left - SPACING;
//       // top = middleY;
//       // left = isWidthOverFlow? containerRect.right - SPACING : triggerRect.left - SPACING;
//       left = isWidthOverFlow
//         ? containerRect.right + offsetWidth - SPACING + offsetXWithArrow
//         : triggerRect.left - SPACING
//       top = isHeightOverFlow
//         ? isTriggerNearTop
//           ? containerRect.top + wrapperRect.height / 2
//           : containerRect.bottom - wrapperRect.height / 2 + offsetHeight
//         : middleY + ANO_SPACING
//       translateX = -1
//       translateY = -0.5
//       break
//     case 'leftTop':
//       // left = triggerRect.left - SPACING;
//       // top = pointAtCenter ? middleY - offsetYWithArrow : triggerRect.top;
//       left = isWidthOverFlow
//         ? containerRect.right + offsetWidth - SPACING + offsetXWithArrow
//         : triggerRect.left - SPACING
//       top = isHeightOverFlow
//         ? containerRect.top
//         : pointAtCenter
//           ? middleY - offsetYWithArrow + ANO_SPACING
//           : triggerRect.top + ANO_SPACING
//       translateX = -1
//       break
//     case 'leftBottom':
//       // left = triggerRect.left - SPACING;
//       // top = pointAtCenter ? middleY + offsetYWithArrow : triggerRect.bottom;
//       left = isWidthOverFlow
//         ? containerRect.right + offsetWidth - SPACING + offsetXWithArrow
//         : triggerRect.left - SPACING
//       top = isHeightOverFlow
//         ? containerRect.bottom + offsetHeight
//         : pointAtCenter
//           ? middleY + offsetYWithArrow + ANO_SPACING
//           : triggerRect.bottom + ANO_SPACING
//       translateX = -1
//       translateY = -1
//       break
//     case 'bottom':
//       // left = middleX;
//       // top = triggerRect.top + triggerRect.height + SPACING;
//       left = isWidthOverFlow
//         ? isTriggerNearLeft
//           ? containerRect.left + wrapperRect.width / 2
//           : containerRect.right - wrapperRect.width / 2 + offsetWidth
//         : middleX + ANO_SPACING
//       top = isHeightOverFlow
//         ? containerRect.top + offsetYWithArrow - SPACING
//         : triggerRect.top + triggerRect.height + SPACING
//       translateX = -0.5
//       break
//     case 'bottomLeft':
//       // left = pointAtCenter ? middleX - offsetXWithArrow : triggerRect.left;
//       // top = triggerRect.bottom + SPACING;
//       left = isWidthOverFlow
//         ? isWrapperWidthOverflow
//           ? containerRect.left
//           : containerRect.right - wrapperRect.width
//         : pointAtCenter
//           ? middleX - offsetXWithArrow + ANO_SPACING
//           : triggerRect.left + ANO_SPACING
//       top = isHeightOverFlow
//         ? containerRect.top + offsetYWithArrow - SPACING
//         : triggerRect.top + triggerRect.height + SPACING
//       break
//     case 'bottomRight':
//       // left = pointAtCenter ? middleX + offsetXWithArrow : triggerRect.right;
//       // top = triggerRect.bottom + SPACING;
//       left = isWidthOverFlow
//         ? containerRect.right + offsetWidth
//         : pointAtCenter
//           ? middleX + offsetXWithArrow + ANO_SPACING
//           : triggerRect.right + ANO_SPACING
//       top = isHeightOverFlow
//         ? containerRect.top + offsetYWithArrow - SPACING
//         : triggerRect.top + triggerRect.height + SPACING
//       translateX = -1
//       break
//     case 'right':
//       // left = triggerRect.right + SPACING;
//       // top = middleY;
//       left = isWidthOverFlow
//         ? containerRect.left - SPACING + offsetXWithArrow
//         : triggerRect.right + SPACING
//       top = isHeightOverFlow
//         ? isTriggerNearTop
//           ? containerRect.top + wrapperRect.height / 2
//           : containerRect.bottom - wrapperRect.height / 2 + offsetHeight
//         : middleY + ANO_SPACING
//       translateY = -0.5
//       break
//     case 'rightTop':
//       // left = triggerRect.right + SPACING;
//       // top = pointAtCenter ? middleY - offsetYWithArrow : triggerRect.top;
//       left = isWidthOverFlow
//         ? containerRect.left - SPACING + offsetXWithArrow
//         : triggerRect.right + SPACING
//       top = isHeightOverFlow
//         ? containerRect.top
//         : pointAtCenter
//           ? middleY - offsetYWithArrow + ANO_SPACING
//           : triggerRect.top + ANO_SPACING
//       break
//     case 'rightBottom':
//       // left = triggerRect.right + SPACING;
//       // top = pointAtCenter ? middleY + offsetYWithArrow : triggerRect.bottom;
//       left = isWidthOverFlow
//         ? containerRect.left - SPACING + offsetXWithArrow
//         : triggerRect.right + SPACING
//       top = isHeightOverFlow
//         ? containerRect.bottom + offsetHeight
//         : pointAtCenter
//           ? middleY + offsetYWithArrow + ANO_SPACING
//           : triggerRect.bottom + ANO_SPACING
//       translateY = -1
//       break
//     case 'leftTopOver':
//       left = triggerRect.left - SPACING
//       top = triggerRect.top - SPACING
//       break
//     case 'rightTopOver':
//       left = triggerRect.right + SPACING
//       top = triggerRect.top - SPACING
//       translateX = -1
//       break
//     case 'leftBottomOver':
//       left = triggerRect.left - SPACING
//       top = triggerRect.bottom + SPACING
//       translateY = -1
//       break
//     case 'rightBottomOver':
//       left = triggerRect.right + SPACING
//       top = triggerRect.bottom + SPACING
//       translateX = -1
//       translateY = -1
//       break
//     default:
//       break
//   }

//   const transformOrigin = this.calcTransformOrigin(position, triggerRect, translateX, translateY) // Transform origin

//   const _containerIsBody = this._adapter.containerIsBody()
//   // Calculate container positioning relative to window
//   left = left - containerRect.left
//   top = top - containerRect.top

//   if (scaled) {
//     left /= wrapperRect.width / this._adapter.getContainer().clientWidth
//   }

//   if (scaled) {
//     top /= wrapperRect.height / this._adapter.getContainer().clientHeight
//   }

//   /**
//    * container为body时，如果position不为relative或absolute，这时trigger计算出的top/left会根据html定位（initial containing block）
//    * 此时如果body有margin，则计算出的位置相对于body会有问题 fix issue #1368
//    *
//    * When container is body, if position is not relative or absolute, then the top/left calculated by trigger will be positioned according to html
//    * At this time, if the body has a margin, the calculated position will have a problem relative to the body fix issue #1368
//    */
//   if (_containerIsBody && !this._adapter.containerIsRelativeOrAbsolute()) {
//     const documentEleRect = this._adapter.getDocumentElementBounding()
//     // Represents the left of the body relative to html
//     left += containerRect.left - documentEleRect.left
//     // Represents the top of the body relative to html
//     top += containerRect.top - documentEleRect.top
//   }

//   // ContainerRect.scrollLeft to solve the inner scrolling of the container
//   left = _containerIsBody ? left : left + containerRect.scrollLeft
//   top = _containerIsBody ? top : top + containerRect.scrollTop

//   const triggerHeight = triggerRect.height

//   if (
//     this.getProp('showArrow') &&
//     !arrowPointAtCenter &&
//     triggerHeight <= (verticalArrowHeight / 2 + arrowOffsetY) * 2
//   ) {
//     const offsetY = triggerHeight / 2 - (arrowOffsetY + verticalArrowHeight / 2)

//     if ((position.includes('Top') || position.includes('Bottom')) && !position.includes('Over')) {
//       top = position.includes('Top') ? top + offsetY : top - offsetY
//     }
//   }

//   // The left/top value here must be rounded, otherwise it will cause the small triangle to shake
//   const style: Record<string, string | number> = {
//     left: _roundPixel(left),
//     top: _roundPixel(top)
//   }

//   let transform = ''

//   if (translateX != null) {
//     transform += `translateX(${translateX * 100}%) `
//     Object.defineProperty(style, 'translateX', {
//       enumerable: false,
//       value: translateX
//     })
//   }
//   if (translateY != null) {
//     transform += `translateY(${translateY * 100}%) `
//     Object.defineProperty(style, 'translateY', {
//       enumerable: false,
//       value: translateY
//     })
//   }
//   if (transformOrigin != null) {
//     style.transformOrigin = transformOrigin
//   }

//   if (transform) {
//     style.transform = transform
//   }

//   return style
// }

// const defaultRect = {
//   width: 0,
//   height: 0,
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0
//   x: 0,
//   y: 0
// }

// export const calcPosition = (
//   triggerRect?: DOMRect,
//   wrapperRect?: DOMRect,
//   containerRect?: PopupContainerDOMRect,
//   shouldUpdatePos = true
// ) => {
//   triggerRect = triggerRect || { ...defaultRect }
//   containerRect = containerRect || { ...defaultRect }
//   wrapperRect = wrapperRect || { ...defaultRect }

//   let style = calcPosStyle({ triggerRect, wrapperRect, containerRect })
//   let position = getProp('position')
// }
