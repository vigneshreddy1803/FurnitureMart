import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { api } from "../utils/api";
import "../styles/AiAssistant.css";

const CATEGORIES = ["Sofa", "Chair", "Table", "Bed", "Wardrobe", "Storage"];

// Keywords/synonyms that map to a real product category
const CATEGORY_SYNONYMS = {
  Sofa: ["sofa", "couch", "recliner", "settee"],
  Chair: ["chair", "seat", "stool"],
  Table: ["table", "desk"],
  Bed: ["bed", "cot", "bunk"],
  Wardrobe: ["wardrobe", "closet", "almirah"],
  Storage: ["storage", "cabinet", "shelf", "bookshelf", "dresser", "rack"],
};

function detectCategory(text) {
  const lower = text.toLowerCase();
  for (const cat of CATEGORIES) {
    const words = CATEGORY_SYNONYMS[cat];
    if (words.some((w) => lower.includes(w))) return cat;
  }
  return null;
}

function detectBudget(text) {
  const lower = text.toLowerCase().replace(/,/g, "");
  // matches "20k" / "20 k"
  const kMatch = lower.match(/(\d+(?:\.\d+)?)\s*k\b/);
  if (kMatch) return Math.round(parseFloat(kMatch[1]) * 1000);
  // matches "under 25000", "budget 25000", "25000 rupees", plain "25000"
  const numMatch = lower.match(/(\d{3,7})/);
  if (numMatch) return parseInt(numMatch[1], 10);
  return null;
}

function AiAssistant() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text:
        "Hi! I'm your FurnitureMart AI Assistant 🛋️ Tell me a furniture type and your budget, e.g. \"Sofa under 25000\" or \"Bed within 20k\", and I'll find matches for you.",
    },
  ]);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (open && products.length === 0) {
      api
        .get("/products")
        .then((res) => setProducts(res.data))
        .catch(() => setProducts([]));
    }
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, open]);

  const respond = (text) => {
    const category = detectCategory(text);
    const budget = detectBudget(text);

    if (!category && !budget) {
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text:
            "I can help you find furniture! Please mention a type (Sofa, Chair, Table, Bed, Wardrobe, Storage) and/or a budget, like \"Chair under 10000\".",
        },
      ]);
      return;
    }

    let matches = products;
    if (category) matches = matches.filter((p) => p.category === category);
    if (budget) matches = matches.filter((p) => p.price <= budget);
    matches = matches.slice().sort((a, b) => a.price - b.price).slice(0, 4);

    const parts = [];
    if (category) parts.push(category);
    if (budget) parts.push(`under ₹${budget.toLocaleString("en-IN")}`);
    const label = parts.join(" ");

    if (matches.length === 0) {
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: `I couldn't find any ${label || "matching"} items. Try a higher budget or a different category.`,
        },
      ]);
      return;
    }

    setMessages((m) => [
      ...m,
      { from: "bot", text: `Here are some great picks for ${label}:`, products: matches },
    ]);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTimeout(() => respond(text), 300);
  };

  const handleChip = (category) => {
    const text = `Show me ${category}`;
    setMessages((m) => [...m, { from: "user", text }]);
    setTimeout(() => respond(text), 300);
  };

  return (
    <div className="ai-assistant">
      {open && (
        <div className="ai-panel">
          <div className="ai-header">
            <span>🛋️ FurnitureMart AI Assistant</span>
            <button className="ai-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="ai-chips">
            {CATEGORIES.map((c) => (
              <button key={c} className="ai-chip" onClick={() => handleChip(c)}>
                {c}
              </button>
            ))}
          </div>

          <div className="ai-body" ref={bodyRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`ai-msg ai-msg-${msg.from}`}>
                <p>{msg.text}</p>
                {msg.products && (
                  <div className="ai-product-list">
                    {msg.products.map((p) => (
                      <div key={p.id} className="ai-product-card">
                        <img src={`/assets/${p.image}`} alt={p.name} />
                        <div className="ai-product-info">
                          <strong>{p.name}</strong>
                          <span>{p.category}</span>
                          <span className="ai-price">₹{p.price.toLocaleString("en-IN")}</span>
                          <div className="ai-product-actions">
                            <Link to={`/products/${p.id}`} onClick={() => setOpen(false)}>
                              View
                            </Link>
                            <button onClick={() => dispatch(addToCart(p))}>Add to Cart</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="ai-input-row">
            <input
              type="text"
              placeholder="e.g. Sofa under 25000"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}

      <button className="ai-toggle" onClick={() => setOpen((o) => !o)}>
        {open ? "✕" : "🛋️ AI Assistant"}
      </button>
    </div>
  );
}

export default AiAssistant;
