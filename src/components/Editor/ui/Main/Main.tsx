import { FC } from 'react'
import { classNames } from '@helpers/classNames'
import cls from './Main.module.scss'
import { TextEditorProvider } from '../../module/context'
import { ToolPanel } from '../ToolPanel/ToolPanel'
import { TextEditor } from '../TextEditor/TextEditor'

interface MainProps {
  className?: string
}

export const Main: FC<MainProps> = ({ className }) => {
  return (
    <div className={classNames(cls.Main, {}, [className])}>
      <TextEditorProvider>
        <ToolPanel />
        <TextEditor />
      </TextEditorProvider>
    </div>
  )
}
