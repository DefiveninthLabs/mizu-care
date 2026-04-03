'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category?: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  products?: Product[];
}

const SYSTEM_PROMPT = `You are a helpful shopping assistant. You have access to a product catalog.
When users ask about products, search queries, or want recommendations, you MUST respond with a JSON block in this exact format alongside your text:
<products>["product name 1", "product name 2"]</products>

Only include the <products> tag when the user is asking about specific products, wants to see items, or is browsing.
When listing prices, use the currency as given. Be concise and friendly.
If user asks general questions not related to products, just answer normally without the <products> tag.`;

function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={`/api/products/${product.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="product-card"
    >
      <div className="product-info">
        <span className="product-name">{product.name}</span>
        {product.category && <span className="product-category">{product.category}</span>}
        {product.price != null && (
          <span className="product-price">₸{Number(product.price).toFixed(2)}</span>
        )}
        {product.description && (
          <span className="product-desc">{product.description.slice(0, 72)}{product.description.length > 72 ? "…" : ""}</span>
        )}
      </div>
      <div className="product-arrow">→</div>
    </a>
  );
}

function TypingDots() {
  return (
    <div className="typing-dots">
      <span /><span /><span />
    </div>
  );
}

function AiChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your shopping assistant. Ask me anything about our products — I can help you find what you're looking for.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data : data.products ?? []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function matchProducts(names: string[]): Product[] {
    if (!names.length || !products.length) return [];
    return names
      .flatMap((name) => {
        const lower = name.toLowerCase();
        return products.filter(
          (p) =>
            p.name?.toLowerCase().includes(lower) ||
            p.category?.toLowerCase().includes(lower) ||
            p.description?.toLowerCase().includes(lower)
        );
      })
      .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
      .slice(0, 6);
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const productContext =
      products.length > 0
        ? `\n\nAvailable products:\n${products
            .map((p) => `- ${p.name} (id:${p.id}, price:₸${p.price}${p.category ? ", category:" + p.category : ""}${p.description ? ", desc:" + p.description.slice(0, 80) : ""})`)
            .join("\n")}`
        : "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: SYSTEM_PROMPT + productContext,
          message: text,
        }),
      });

      const data = await res.json();
      const raw: string = data.content ?? "";

      // Parse optional <products> tag
      const productMatch = raw.match(/<products>([\s\S]*?)<\/products>/);
      let matchedProducts: Product[] = [];
      let cleanContent = raw.replace(/<products>[\s\S]*?<\/products>/g, "").trim();

      if (productMatch) {
        try {
          const names: string[] = JSON.parse(productMatch[1]);
          matchedProducts = matchProducts(names);
        } catch {
          // ignore parse errors
        }
      }

      // Also try to infer products from message if keywords match
      if (!matchedProducts.length) {
        const lower = text.toLowerCase();
        const keywordMatched = products.filter(
          (p) =>
            lower.includes(p.name?.toLowerCase()) ||
            (p.category && lower.includes(p.category.toLowerCase()))
        ).slice(0, 6);
        if (keywordMatched.length) matchedProducts = keywordMatched;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: cleanContent,
          products: matchedProducts.length ? matchedProducts : undefined,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't reach the AI. Please check your API connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #f0f4ff;
          --surface: #ffffff;
          --surface2: #e8eeff;
          --border: #d4deff;
          --accent: #3b5bff;
          --accent2: #6b8aff;
          --accent-light: #ebefff;
          --text: #1a1f3a;
          --muted: #8892bb;
          --user-bg: #3b5bff;
          --bot-bg: #ffffff;
          --radius: 16px;
        }

        body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; }

        .chat-root {
          display: flex;
          flex-direction: column;
          height: 100vh;
          max-width: 820px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 0 16px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }

        .chat-header-icon {
          width: 38px; height: 38px;
          background: var(--accent);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: #ffffff;
          font-size: 18px;
        }

        .chat-header h1 {
          font-family: 'Syne', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--text);
        }

        .chat-header p {
          font-size: 0.78rem;
          color: var(--muted);
          margin-top: 1px;
        }

        .chat-header .pill {
          margin-left: auto;
          font-size: 0.7rem;
          background: #ebefff;
          color: var(--accent);
          border: 1px solid #c5ceff;
          padding: 3px 10px;
          border-radius: 20px;
          font-family: 'Syne', sans-serif;
          letter-spacing: 0.05em;
        }

        .messages {
          flex: 1;
          overflow-y: auto;
          padding: 24px 0 12px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          scrollbar-width: thin;
          scrollbar-color: var(--border) transparent;
        }

        .msg-row {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          animation: fadeUp 0.25s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .msg-row.user { flex-direction: row-reverse; }

        .avatar {
          width: 32px; height: 32px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; flex-shrink: 0; margin-top: 2px;
        }

        .avatar.bot { background: var(--accent-light); border: 1px solid var(--border); color: var(--accent); }
        .avatar.user { background: var(--accent); color: white; font-family: 'Syne', sans-serif; font-weight: 700; }

        .bubble-wrap { display: flex; flex-direction: column; gap: 10px; max-width: 86%; }

        .bubble {
          padding: 13px 16px;
          border-radius: var(--radius);
          font-size: 0.92rem;
          line-height: 1.65;
          white-space: pre-wrap;
        }

        .msg-row.bot .bubble {
          background: var(--bot-bg);
          border: 1px solid var(--border);
          border-top-left-radius: 4px;
          color: var(--text);
          box-shadow: 0 2px 12px rgba(59,91,255,0.06);
        }

        .msg-row.user .bubble {
          background: var(--user-bg);
          border: 1px solid transparent;
          border-top-right-radius: 4px;
          color: #ffffff;
          text-align: right;
          box-shadow: 0 4px 16px rgba(59,91,255,0.25);
        }

        /* Product cards */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px;
          width: 100%;
        }

        .product-card {
          display: flex;
          flex-direction: column;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          color: var(--text);
          transition: border-color 0.18s, transform 0.18s, box-shadow 0.18s;
          position: relative;
        }

        .product-card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(59,91,255,0.12);
        }

        .product-img {
          height: 110px;
          background: var(--surface2);
          overflow: hidden;
        }

        .product-img img { width: 100%; height: 100%; object-fit: cover; }

        .product-img-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          color: var(--muted);
        }

        .product-info {
          padding: 10px 12px 12px;
          display: flex;
          flex-direction: column;
          gap: 3px;
          flex: 1;
        }

        .product-name {
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text);
          line-height: 1.3;
        }

        .product-category {
          font-size: 0.7rem;
          color: var(--accent2);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .product-price {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--accent);
          margin-top: 4px;
          font-family: 'Syne', sans-serif;
        }

        .product-desc {
          font-size: 0.73rem;
          color: var(--muted);
          line-height: 1.4;
          margin-top: 3px;
        }

        .product-arrow {
          position: absolute;
          top: 10px; right: 12px;
          font-size: 0.85rem;
          color: var(--muted);
          transition: color 0.18s, transform 0.18s;
        }

        .product-card:hover .product-arrow {
          color: var(--accent);
          transform: translateX(3px);
        }

        /* Typing dots */
        .typing-dots {
          display: flex; align-items: center; gap: 5px;
          padding: 14px 18px;
          background: var(--bot-bg);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          border-top-left-radius: 4px;
          width: fit-content;
          box-shadow: 0 2px 12px rgba(59,91,255,0.06);
        }

        .typing-dots span {
          width: 7px; height: 7px;
          background: var(--accent2);
          border-radius: 50%;
          animation: bounce 1.2s infinite;
        }
        .typing-dots span:nth-child(2) { animation-delay: 0.18s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.36s; }

        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }

        /* Input area */
        .input-area {
          padding: 14px 0 20px;
          flex-shrink: 0;
          border-top: 1px solid var(--border);
        }

        .input-row {
          display: flex;
          gap: 10px;
          align-items: flex-end;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 10px 10px 10px 16px;
          transition: border-color 0.18s, box-shadow 0.18s;
          box-shadow: 0 2px 12px rgba(59,91,255,0.06);
        }

        .input-row:focus-within {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(59,91,255,0.1);
        }

        .input-row textarea {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          line-height: 1.5;
          resize: none;
          max-height: 140px;
          min-height: 24px;
          padding: 2px 0;
        }

        .input-row textarea::placeholder { color: var(--muted); }

        .send-btn {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: var(--accent);
          border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #ffffff;
          flex-shrink: 0;
          transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
        }

        .send-btn:hover:not(:disabled) {
          opacity: 0.88;
          transform: scale(1.05);
          box-shadow: 0 4px 14px rgba(59,91,255,0.35);
        }
        .send-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        .hint {
          text-align: center;
          font-size: 0.7rem;
          color: var(--muted);
          margin-top: 8px;
        }
      `}</style>

      <div className="chat-root">
        <header className="chat-header">
          <Link href="/" className="">
            <Image alt='' src={'/icon-black.png'} height={40} width={40} />
          </Link>
          <div>
            <h1>Shop Assistant</h1>
            <p>Powered by Claude Haiku</p>
          </div>
          <span className="pill">● LIVE</span>
        </header>

        <div className="messages">
          {messages.map((msg, i) => (
            <div key={i} className={`msg-row ${msg.role === "user" ? "user" : "bot"}`}>
              <div className={`avatar ${msg.role === "user" ? "user" : "bot"}`}>
                {msg.role === "user" ? "U" : "✦"}
              </div>
              <div className="bubble-wrap">
                <div className="bubble">{msg.content}</div>
                {msg.products && msg.products.length > 0 && (
                  <div className="products-grid">
                    {msg.products.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="msg-row bot">
              <div className="avatar bot">✦</div>
              <div className="bubble-wrap">
                <TypingDots />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="input-area">
          <div className="input-row">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
              }}
              onKeyDown={handleKey}
              placeholder="Ask about products, prices, categories…"
              disabled={loading}
            />
            <button className="send-btn" onClick={sendMessage} disabled={!input.trim() || loading}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" /><path d="M22 2L15 22 11 13 2 9l20-7z" />
              </svg>
            </button>
          </div>
          <p className="hint">Enter to send · Shift+Enter for new line</p>
        </div>
      </div>
    </>
  );
}

export default AiChatPage;