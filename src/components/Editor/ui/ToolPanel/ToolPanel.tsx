import { FC } from 'react'
import { classNames } from '@helpers/classNames'
import cls from './ToolPanel.module.scss'
import { InlineStyle } from '../../module/config'
import { useEditorApi } from '../../module/context'
import { BoldIcon } from '../icons/BoldIcon'
import { ItalicIcon } from '../icons/ItalicIcon'
import { UnderLineIcon } from '../icons/UnderLineIcon'
import { AccentIcon } from '../icons/AccentIcon'

const INLINE_STYLES_CODES = Object.values(InlineStyle)

interface ToolPanelProps {
  className?: string
}

const Icons: Record<InlineStyle, any> = {
  [InlineStyle.BOLD]: <BoldIcon />,
  [InlineStyle.ITALIC]: <ItalicIcon />,
  [InlineStyle.UNDERLINE]: <UnderLineIcon />,
  [InlineStyle.ACCENT]: <AccentIcon />,
}

export const ToolPanel: FC<ToolPanelProps> = ({ className }) => {
  const { toggleInlineStyle, hasInlineStyle } = useEditorApi()

  console.log(INLINE_STYLES_CODES)
  return (
    <div className={classNames(cls.ToolPanel, {}, [className])}>
      <ul className={cls.buttonErapper}>
        {INLINE_STYLES_CODES.map((item) => (
          <li key={item}>
            <button
              onClick={() => {
                toggleInlineStyle(item)
              }}
              className={classNames(cls.panelBtn, {
                [cls.active]: hasInlineStyle(item),
              })}>
              {Icons[item]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
