import { FC } from 'react'
import { classNames } from '@helpers/classNames'
import cls from './ToolPanel.module.scss'

interface ToolPanelProps {
  className?: string
}

export const ToolPanel: FC<ToolPanelProps> = ({ className }) => {
  return (
    <div className={classNames(cls.ToolPanel, {}, [className])}>ToolPanel</div>
  )
}
