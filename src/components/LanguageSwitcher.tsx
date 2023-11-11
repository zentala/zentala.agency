import React from 'react'
import { useIntl, changeLocale } from 'gatsby-plugin-intl'
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { createUseStyles } from 'react-jss'
import EmojiIcon from './EmojiIcon'

const useStyles = createUseStyles({
  languageSwitcher: {
    background: '#eee',
    borderRadius: 4,
    border: '1px solid #ccc',
    color: '#555',
    '&:hover': {
      background: '#ddd',
      color: '#333',
      cursor: 'pointer',
    },
  },
})

const LanguageSwitcher = () => {
  const intl = useIntl()
  const currentLocale = intl.locale
  const classes = useStyles()

  const languageMap: { [key: string]: string } = {
    en: '🇬🇧',
    pl: '🇵🇱',
  }

  const menu = (
    <Menu>
      {Object.keys(languageMap).map(
        lang =>
          lang !== currentLocale && (
            <Menu.Item key={lang} onClick={() => changeLocale(lang)}>
              <EmojiIcon emoji={languageMap[lang]} label={lang} /> {lang.toUpperCase()}
            </Menu.Item>
          )
      )}
    </Menu>
  )

  return (
    <Dropdown overlay={menu} className={classes.languageSwitcher}>
      <button>
        <EmojiIcon emoji={languageMap[currentLocale]} label={currentLocale} /> <DownOutlined />
      </button>
    </Dropdown>
  )
}

export default LanguageSwitcher
