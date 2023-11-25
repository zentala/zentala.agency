import React from 'react'
import { useIntl, changeLocale } from 'gatsby-plugin-intl'
import { Menu, Dropdown } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { createUseStyles } from 'react-jss'
import IconEmoji from './IconEmoji'

const useStyles = createUseStyles({
  languageSwitcher: {
    background: '#eee',
    borderRadius: 4,
    border: '1px solid #ccc',
    color: '#888',
    '&:hover': {
      background: '#fff',
      color: '#333',
      cursor: 'pointer'
    }
  },
  languageList: {
    borderRadius: 4,
    border: '1px solid #ccc',
    scale: 0.7
  }
})

interface LanguageSwitcherProps {
  direction?: 'top' | 'bottom'
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ direction = 'bottom' }) => {
  const intl = useIntl()
  const currentLocale = intl.locale
  const classes = useStyles()

  const languageMap: { [key: string]: string } = {
    en: '🇬🇧',
    pl: '🇵🇱'
  }

  const menu = (
    <Menu className={classes.languageList}>
      {Object.keys(languageMap).map(
        lang =>
          lang !== currentLocale && (
            <Menu.Item key={lang} onClick={() => changeLocale(lang)}>
              <IconEmoji emoji={languageMap[lang]} label={lang} /> {lang.toUpperCase()}
            </Menu.Item>
          )
      )}
    </Menu>
  )

  const dropdownPlacement = direction === 'top' ? 'topCenter' : 'bottomCenter'
  const ArrowIcon = direction === 'top' ? UpOutlined : DownOutlined

  return (
    <Dropdown overlay={menu} placement={dropdownPlacement} className={classes.languageSwitcher}>
      <button>
        <IconEmoji emoji={languageMap[currentLocale]} label={currentLocale} /> <ArrowIcon />
      </button>
    </Dropdown>
  )
}

export default LanguageSwitcher
