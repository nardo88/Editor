import { EditorState, RichUtils } from 'draft-js'
import { useCallback, useMemo, useState } from 'react'
import { BlockType, InlineStyle } from './config'

export type EditorApi = {
  state: EditorState
  onChange: (state: EditorState) => void
  toggleBlockType: (blockType: BlockType) => void
  currentBlockType: BlockType
  toggleInlineStyle: (inlineStyle: InlineStyle) => void
  hasInlineStyle: (inlineStyle: InlineStyle) => boolean
}

export const useEditor = (): EditorApi => {
  // С помощью метода EditorState.createEmpty() мы создаем пустое имутабельное состояние нашего редактора и сохраняем его в локальном состоянии.
  const [state, setState] = useState(() => EditorState.createEmpty())

  const toggleBlockType = useCallback((blockType: BlockType) => {
    setState((currentState) =>
      RichUtils.toggleBlockType(currentState, blockType)
    )
  }, [])
  const currentBlockType = useMemo(() => {
    // получаем карту, в которой хранится информация о том, где находится каретка пользователя. Напомню что Draft.js работает с имутабельными данными, и чтобы посмотреть что хранится в selection, можно воспользоваться методом toJS
    const selection = state.getSelection()
    // получаем карту контента нашего редактора.
    const content = state.getCurrentContent()
    // по ключу находим блок, в котором сейчас находимся. Ключ — это просто уникальный хеш, который сгенерировал Draft.js.
    const block = content.getBlockForKey(selection.getStartKey())
    // получаем тип найденного блока.
    return block.getType() as BlockType
  }, [state])

  const toggleInlineStyle = useCallback((inlineStyle: InlineStyle) => {
    setState((currentState) =>
      RichUtils.toggleInlineStyle(currentState, inlineStyle)
    )
  }, [])

  const hasInlineStyle = useCallback(
    (inlineStyle: InlineStyle) => {
      /* Получаем иммутабельный Set с ключами стилей */
      const currentStyle = state.getCurrentInlineStyle()
      /* Проверяем содержится ли там переданный стиль */
      return currentStyle.has(inlineStyle)
    },
    [state]
  )

  return useMemo(
    () => ({
      state,
      onChange: setState,
      toggleBlockType,
      currentBlockType,
      toggleInlineStyle,
      hasInlineStyle,
    }),
    [state, toggleInlineStyle, hasInlineStyle]
  )
}
