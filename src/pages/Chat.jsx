import { useState } from 'react';
import { messages } from '../data/mockData';
import { Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Chat = () => {
  const { colors } = useTheme();
  const [msgList, setMsgList] = useState(messages);
  const [text, setText] = useState('');
  const [role] = useState('manager');

  const handleSend = () => {
    if (!text.trim()) return;
    const newMsg = {
      id: msgList.length + 1,
      sender: role,
      senderName: role === 'manager' ? 'Manager' : 'Staff',
      text: text.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString().split('T')[0],
    };
    setMsgList([...msgList, newMsg]);
    setText('');
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ color: colors.text, fontSize: '1.5rem', fontWeight: 700 }}>Fleet Chat</h1>
        <p style={{ color: colors.textMuted, fontSize: '0.875rem' }}>Communication between manager and staff</p>
      </div>

      <div style={{
        background: colors.cardBg,
        borderRadius: '12px',
        border: `1px solid ${colors.border}`,
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column', height: '70vh',
      }}>
        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {msgList.map(msg => {
            const isMe = msg.sender === role;
            return (
              <div key={msg.id} style={{
                display: 'flex', flexDirection: 'column',
                alignItems: isMe ? 'flex-end' : 'flex-start',
              }}>
                <div style={{ color: colors.textMuted, fontSize: '0.72rem', marginBottom: '0.25rem', paddingLeft: isMe ? 0 : '0.5rem', paddingRight: isMe ? '0.5rem' : 0 }}>
                  {msg.senderName} · {msg.time}
                </div>
                <div style={{
                  maxWidth: '75%', padding: '0.75rem 1rem',
                  borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: isMe ? 'linear-gradient(135deg, #1d4ed8, #3b82f6)' : colors.cardBg2,
                  color: isMe ? 'white' : colors.text,
                  fontSize: '0.875rem', lineHeight: 1.5,
                  border: isMe ? 'none' : `1px solid ${colors.border}`,
                }}>
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div style={{
          borderTop: `1px solid ${colors.border}`, padding: '1rem 1.5rem',
          display: 'flex', gap: '0.75rem', alignItems: 'center',
          background: colors.cardBg,
        }}>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            style={{
              flex: 1, padding: '0.65rem 1rem',
              background: colors.input, border: `1px solid ${colors.inputBorder}`,
              borderRadius: '8px', color: colors.text, fontSize: '0.875rem', outline: 'none',
            }}
          />
          <button
            onClick={handleSend}
            style={{
              width: '42px', height: '42px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Send size={18} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;