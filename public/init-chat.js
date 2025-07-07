console.log('✅ init-chat.js loaded')

import Chatbot from '/chat.js'

Chatbot.init({
  chatflowid: 'da2375f4-1ceb-4207-a23c-71caf273778a',
  apiHost: 'https://flowise.zentala.agency',
  theme: {
    button: {
      backgroundColor: '#374151',
      right: 20,
      bottom: 20,
      size: 48,
      dragAndDrop: true,
      iconColor: 'white',
      customIconSrc: '/chat.svg',
    },
    chatWindow: {
      welcomeMessage:
        'Hi! I am here to help you with your questions about Paul Zentala and his services. How can I assist you?',
      backgroundColor: '#111827',
      height: 700,
      width: 400,
      fontSize: 16,
      botMessage: {
        backgroundColor: '#1f2937',
        textColor: '#f3f4f6',
        showAvatar: false,
        avatarSrc:
          'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png',
      },
      userMessage: {
        backgroundColor: '#374151',
        textColor: '#ffffff',
        showAvatar: false,
        avatarSrc:
          'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png',
      },
      textInput: {
        placeholder: 'Write a message...',
        backgroundColor: '#1f2937',
        textColor: '#f3f4f6',
        sendButtonColor: '#374151',
      },
    },
  },
})
