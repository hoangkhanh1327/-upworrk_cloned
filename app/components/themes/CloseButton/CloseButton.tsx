import { forwardRef } from 'react'
import { HiX } from 'react-icons/hi'
import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface CloseButtonProps {
    className?: string
    children?: ReactNode
    style?: CSSProperties
    absolute?: boolean
    defaultStyle?: boolean
    onClick?: (e: MouseEvent<HTMLSpanElement>) => void
}

const CloseButton = forwardRef<HTMLElement, CloseButtonProps>((props, ref) => {
    const { absolute, className, defaultStyle, ...rest } = props
    const closeButtonAbsoluteClass = 'absolute z-10'

    const closeButtonClass = cn(
        'close-btn',
        defaultStyle && 'close-btn-default',
        absolute && closeButtonAbsoluteClass,
        className
    )

    return (
        <span className={closeButtonClass} role="button" {...rest} ref={ref}>
            <HiX />
        </span>
    )
})

CloseButton.displayName = 'CloseButton'

export default CloseButton
