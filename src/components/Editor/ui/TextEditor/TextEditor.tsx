import { FC } from 'react'
import { Editor } from 'draft-js'
import { classNames } from '@helpers/classNames'
import cls from './TextEditor.module.scss'
import { useEditorApi } from '../../module/context'

interface TextEditorProps {
  className?: string
}

export const TextEditor: FC<TextEditorProps> = ({ className }) => {
  const { state, onChange } = useEditorApi()
  return (
    <div className={classNames(cls.TextEditor, {}, [className])}>
      <Editor
        // placeholder="Введите ваш текст"
        editorState={state}
        onChange={onChange}
      />
    </div>
  )
}
