import { classNames } from '@helpers/classNames'
import cls from './Main.module.scss'
import { TextEditorProvider } from '../../module/context'
import { ToolPanel } from '../ToolPanel/ToolPanel'
import { TextEditor } from '../TextEditor/TextEditor'

interface MainProps {
  className?: string
  label?: string
}

export const Main = (props: MainProps) => {
  const { className, label } = props
  return (
    <div className={classNames(cls.Main, {}, [className])}>
      {label && <div className={cls.label}>{label}</div>}
      <TextEditorProvider>
        <ToolPanel />
        <TextEditor />
      </TextEditorProvider>
    </div>
  )
}
