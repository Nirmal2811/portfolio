import { useState, useRef, useEffect, useCallback } from 'react'

const BOT_NAME = 'Portfolio Bot'

const KNOWLEDGE_BASE = {
  greeting: {
    patterns: ['hi', 'hello', 'hey', 'howdy', 'greetings', 'good morning', 'good afternoon', 'good evening', 'sup', 'yo'],
    response: "Hey there! 👋 I'm the portfolio assistant. I can tell you about the projects, skills, experience, or help you get in touch. What would you like to know?",
  },
  projects: {
    patterns: ['project', 'work', 'portfolio', 'built', 'made', 'developed', 'showcase', 'case study'],
    response: "Here are some highlighted projects:\n\n• **E-Commerce Platform** — Full-stack shopping app with React, Flask & Postgres.\n• **Ticketing & Attendance System** — Real-time analytics with React, D3.js & Firebase.\n• **HeartLink India** — Non-profit website focused on cardiac care.\n• **Kerala Ayurveda** — Holistic wellness showcase.\n\nWant details on any specific project?",
  },
  skills: {
    patterns: ['skill', 'tech', 'technology', 'stack', 'language', 'framework', 'tool', 'know', 'proficient', 'expertise'],
    response: "Core skills include:\n\n• **Frontend:** React, Next.js, Tailwind CSS, GSAP\n• **Backend:** Node.js, Flask, Express\n• **Database:** PostgreSQL, Firebase, MongoDB\n• **Design:** Figma, Illustrator\n• **Other:** Git, Docker, CI/CD\n\nAnything specific you'd like to know more about?",
  },
  experience: {
    patterns: ['experience', 'work history', 'job', 'career', 'company', 'resume', 'cv', 'background'],
    response: "I have experience building full-stack web applications, designing brand identities, and working with modern JavaScript frameworks. Feel free to scroll to the **About** section for more details, or ask me anything specific!",
  },
  contact: {
    patterns: ['contact', 'email', 'reach', 'hire', 'connect', 'message', 'talk', 'get in touch'],
    response: "You can reach out through the **Contact** section below, or feel free to connect via the social links in the footer. I'd love to hear from you! 🚀",
  },
  about: {
    patterns: ['about', 'who', 'tell me about', 'yourself', 'introduction', 'bio'],
    response: "I'm a creative developer who loves building beautiful, performant web experiences. I focus on clean code, modern design, and seamless user experiences. Check out the **About** section for the full story!",
  },
  services: {
    patterns: ['service', 'offer', 'do you do', 'help with', 'available for', 'freelance', 'consulting'],
    response: "Services I offer:\n\n• Full-stack web development\n• UI/UX design & prototyping\n• Brand identity & visual design\n• Performance optimization\n• Technical consulting\n\nInterested in working together? Head to the **Contact** section!",
  },
  thanks: {
    patterns: ['thank', 'thanks', 'appreciate', 'helpful', 'great', 'awesome', 'cool'],
    response: "You're welcome! 😊 Feel free to ask anything else or explore the portfolio. Happy browsing!",
  },
  bye: {
    patterns: ['bye', 'goodbye', 'see you', 'later', 'cya', 'take care'],
    response: "Goodbye! 👋 Thanks for visiting. Come back anytime!",
  },
}

const QUICK_QUESTIONS = [
  'What projects have you built?',
  'What are your skills?',
  'How can I contact you?',
  'Tell me about yourself',
]

function matchIntent(input) {
  const lower = input.toLowerCase().trim()
  let bestMatch = null
  let bestScore = 0

  for (const [, data] of Object.entries(KNOWLEDGE_BASE)) {
    for (const pattern of data.patterns) {
      if (lower.includes(pattern)) {
        const score = pattern.length
        if (score > bestScore) {
          bestScore = score
          bestMatch = data.response
        }
      }
    }
  }

  return bestMatch
}

function getReply(userMessage) {
  const matched = matchIntent(userMessage)
  if (matched) return matched

  return "That's an interesting question! I'm best at answering questions about the portfolio, skills, projects, and contact info. Try asking about one of those, or use the quick questions below. 😊"
}

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />')
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi! 👋 I'm the portfolio assistant. Ask me anything about the projects, skills, or how to get in touch!",
      time: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const sendMessage = useCallback(
    (text) => {
      const trimmed = (text || input).trim()
      if (!trimmed) return

      const userMsg = {
        id: Date.now(),
        sender: 'user',
        text: trimmed,
        time: new Date(),
      }

      setMessages((prev) => [...prev, userMsg])
      setInput('')
      setIsTyping(true)

      const delay = 400 + Math.random() * 800
      setTimeout(() => {
        const reply = getReply(trimmed)
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: reply,
            time: new Date(),
          },
        ])
        setIsTyping(false)
      }, delay)
    },
    [input]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage()
  }

  const handleQuickQuestion = (q) => {
    sendMessage(q)
  }

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="chatbot-wrapper">
      {/* Toggle button */}
      <button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                <path d="M6 10v1a6 6 0 0 0 12 0v-1" />
                <rect x="9" y="17" width="6" height="4" rx="1" />
                <path d="M4 21h16" />
              </svg>
            </div>
            <div>
              <span className="chatbot-name">{BOT_NAME}</span>
              <span className="chatbot-status">
                <span className="status-dot" /> Online
              </span>
            </div>
          </div>
          <button className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chatbot-msg ${msg.sender}`}>
              <div
                className="chatbot-msg-bubble"
                dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
              />
              <span className="chatbot-msg-time">{formatTime(msg.time)}</span>
            </div>
          ))}
          {isTyping && (
            <div className="chatbot-msg bot">
              <div className="chatbot-msg-bubble typing">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick questions */}
        {messages.length <= 1 && (
          <div className="chatbot-quick">
            {QUICK_QUESTIONS.map((q) => (
              <button key={q} className="quick-btn" onClick={() => handleQuickQuestion(q)}>
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form className="chatbot-input-area" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="chatbot-input"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={500}
          />
          <button type="submit" className="chatbot-send" disabled={!input.trim()} aria-label="Send message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}
