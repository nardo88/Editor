import { createContext, useContext } from 'react'
import { EditorApi, useEditor } from './useEditor'

interface IProviderProps {
  children: React.ReactNode
  value: string
}

const TextEditorContext = createContext<EditorApi | undefined>(undefined)

export const useEditorApi = () => {
  const context = useContext(TextEditorContext)
  if (context === undefined) {
    throw new Error('useEditorApi must be used within TextEditorProvider')
  }

  return context
}

export const TextEditorProvider = (props: IProviderProps) => {
  const { children, value } = props
  const editorApi = useEditor(value)

  return (
    <TextEditorContext.Provider value={editorApi}>
      {children}
    </TextEditorContext.Provider>
  )
}
