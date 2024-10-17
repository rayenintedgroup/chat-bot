import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'

type Message = {
    id: number;
    sender: 'user' | 'bot';
    text: string;
    time: string;
}

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { slug } = useParams();

    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: 'bot', text: 'Bienvenue, c\'est bien noté. Je suis à votre écoute 😊', time: '5:28 PM' },])
    const [inputText, setInputText] = useState('')
    const chatBoxRef = useRef<HTMLDivElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    const toggleChat = () => {
        setIsOpen(!isOpen)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (inputText.trim()) {
            const newMessage: Message = {
                id: messages.length + 1,
                sender: 'user',
                text: inputText,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
            setMessages([...messages, newMessage])
            setInputText('')
        }
    }

    useEffect(() => {
        if (isOpen && chatBoxRef.current) {
            chatBoxRef.current.style.display = 'flex'
            setTimeout(() => {
                if (chatBoxRef.current) {
                    chatBoxRef.current.style.opacity = '1'
                    chatBoxRef.current.style.transform = 'scale(1) translateY(0)'
                }
            }, 50)
        } else if (!isOpen && chatBoxRef.current) {
            chatBoxRef.current.style.opacity = '0'
            chatBoxRef.current.style.transform = 'scale(0.95) translateY(10px)'
            setTimeout(() => {
                if (chatBoxRef.current) {
                    chatBoxRef.current.style.display = 'none'
                }
            }, 300)
        }
    }, [isOpen])

    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollHeight = scrollAreaRef.current.scrollHeight
            const height = scrollAreaRef.current.clientHeight
            const maxScrollTop = scrollHeight - height
            scrollAreaRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
        }
    }, [messages])

    return (
        <div className="fixed bottom-4 right-4">
            <button
                onClick={toggleChat}
                className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg hover:bg-blue-600 transition-colors duration-200"
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                <span className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                    {isOpen ? '×' : '💬'}
                </span>
            </button>
            <div
                ref={chatBoxRef}
                className={`absolute bottom-20 right-0 w-80 h-[32rem] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden flex-col
                    transition-all duration-300 ease-out
                    opacity-0 scale-95 translate-y-4`}
                style={{ display: 'none' }}
            >
                <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-transparent border flex items-center justify-center mr-3">
                            <img src='src/assets/logo.png' />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{slug}</h2>
                            <p className="text-sm flex items-center">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                Online
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={toggleChat}
                        className="text-white hover:text-gray-200 transition-colors duration-200"
                        aria-label="Close chat"
                    >
                        ×
                    </button>
                </div>
                <div
                    ref={scrollAreaRef}
                    className="flex-grow overflow-y-auto p-4 space-y-4"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#CBD5E0 #EDF2F7',
                    }}
                >
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                <p>{message.text}</p>
                                <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 flex items-center">
                    <input
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder="Write a message..."
                        className="flex-grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="ml-2 text-blue-500 hover:text-blue-600 transition-colors duration-200"
                        aria-label="Send message"
                    >
                        <Send size={24} />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatBot
