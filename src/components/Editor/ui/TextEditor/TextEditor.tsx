import { FC, useEffect } from 'react'
import { Editor } from 'draft-js'
import { classNames } from '@helpers/classNames'
import cls from './TextEditor.module.scss'
import { useEditorApi } from '../../module/context'
import { BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP } from '../../module/config'

interface TextEditorProps {
  className?: string
  setValue: (v: string) => void
}

export const TextEditor: FC<TextEditorProps> = ({ className, setValue }) => {
  const { state, onChange, toHtml } = useEditorApi()

  useEffect(() => {
    setValue(toHtml())
  }, [state])
  return (
    <div className={classNames(cls.TextEditor, {}, [className])}>
      <Editor
        editorState={state}
        onChange={onChange}
        blockRenderMap={BLOCK_RENDER_MAP}
        customStyleMap={CUSTOM_STYLE_MAP}
      />
    </div>
  )
}
