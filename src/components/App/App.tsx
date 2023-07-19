import { Editor } from '@components/Editor'
import './styles/App.scss'
import { useEffect, useState } from 'react'

function App() {
  const [value, setValue] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setValue(
        '<p><strong>Жирный</strong></p><p></p><p><em>Курсив</em></p><p></p><p><span class="underline" style="text-decoration:underline">Подчеркнутый</span></p><p></p><p><span class="accent" style="background-color:#F7F6F3;color:#A41E68">Кастомный</span></p><p></p><p><a href="http://localhost:3000/www.yandex.ru">Ссылка</a></p>'
      )
    }, 3000)
  }, [])

  return (
    <div className="container">
      <Editor
        value={value}
        onChange={(v: string) => {
          console.log('v: ', v)
          setValue(v)
        }}
        label="Текстовый редактор"
      />
    </div>
  )
}

export default App
