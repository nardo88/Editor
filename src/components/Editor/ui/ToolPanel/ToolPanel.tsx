import { FC, useMemo } from 'react'
import { classNames } from '@helpers/classNames'
import cls from './ToolPanel.module.scss'
import { InlineStyle } from '../../module/config'
import { useEditorApi } from '../../module/context'
import { BoldIcon } from '../icons/BoldIcon'
import { ItalicIcon } from '../icons/ItalicIcon'
import { UnderLineIcon } from '../icons/UnderLineIcon'
import { AccentIcon } from '../icons/AccentIcon'
import { LinkIcon } from '../icons/LinkIcon'

const INLINE_STYLES_CODES = Object.values(InlineStyle)

interface ToolPanelProps {
  className?: string
}

export const ToolPanel: FC<ToolPanelProps> = ({ className }) => {
  const { toggleInlineStyle, hasInlineStyle, addLink } = useEditorApi()

  const handlerAddLink = () => {
    console.log('click')
    const url = prompt('URL:')

    if (url) {
      addLink(url)
    }
  }

  const Icons: Record<InlineStyle, any> = useMemo(
    () => ({
      [InlineStyle.BOLD]: <BoldIcon />,
      [InlineStyle.ITALIC]: <ItalicIcon />,
      [InlineStyle.UNDERLINE]: <UnderLineIcon />,
      [InlineStyle.ACCENT]: <AccentIcon />,
      [InlineStyle.LINK]: <LinkIcon />,
    }),
    [InlineStyle]
  )

  return (
    <div className={classNames(cls.ToolPanel, {}, [className])}>
      <ul className={cls.buttonErapper}>
        {INLINE_STYLES_CODES.map((item) => (
          <li key={item}>
            <button
              onClick={() => {
                if (item === InlineStyle.LINK) {
                  handlerAddLink()
                } else {
                  toggleInlineStyle(item)
                }
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
