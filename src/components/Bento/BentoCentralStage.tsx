import React, { useState, useEffect } from 'react'
import { BENTO_STATES, type BentoState } from './bento-config'

export const BentoCentralStage: React.FC = () => {
  const [activeState, setActiveState] = useState<string>('default')

  useEffect(() => {
    // Listen for custom events from Astro cards
    const handleHover = (e: any) => {
      if (e.detail?.state) {
        setActiveState(e.detail.state)
      }
    }

    const handleLeave = () => {
      setActiveState('default')
    }

    window.addEventListener('bento-hover', handleHover)
    window.addEventListener('bento-leave', handleLeave)

    return () => {
      window.removeEventListener('bento-hover', handleHover)
      window.removeEventListener('bento-leave', handleLeave)
    }
  }, [])

  const state = BENTO_STATES[activeState] || null

  return (
    <div className="interactive-container relative h-full w-full overflow-hidden bg-black">
      {/* Default State: Sygnet */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          activeState === 'default'
            ? 'scale-100 opacity-100'
            : 'pointer-events-none scale-90 opacity-0'
        }`}
      >
        <div className="sygnet-placeholder text-white opacity-20">
          {/* Logo Sygnet logic moved here or passed via slot */}
          <div id="react-sygnet-portal"></div>
        </div>
      </div>

      {/* Dynamic States */}
      {Object.values(BENTO_STATES).map((s) => (
        <div
          key={s.id}
          className={`absolute inset-0 flex items-center p-12 transition-all duration-700 ${
            activeState === s.id
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-4 opacity-0'
          } ${s.theme === 'light' ? 'bg-white text-black' : 'bg-zinc-900 text-white'}`}
        >
          <div className="w-full">
            {s.image && activeState === s.id && (
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 h-full w-full object-cover opacity-20 grayscale"
              />
            )}
            <div className="relative z-10">
              <h3 className="mb-4 text-4xl font-light">{s.title}</h3>
              <p className="max-w-xl text-xl leading-relaxed opacity-80">
                {s.description}
              </p>
              {s.tags && (
                <div className="mt-6 flex gap-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-current px-2 py-1 text-[10px] uppercase tracking-widest opacity-50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
