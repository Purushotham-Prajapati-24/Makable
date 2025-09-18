import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate, } from 'react-router-dom';
import axios from 'axios';

const initialCode = `<div style="padding: 2rem; font-family:gilroy; text-align: center;">
    <h2>Hello, No-Code AI Platform!</h2>
    <p>Edit this code using the chat box below.</p>
</div>`;
function LivePreview() {
    const [code, setCode] = useState(initialCode);
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState([
        { sender: 'system', text: 'Welcome! Type your instructions to edit the preview.' }
    ]);
    const [isDeployed, setIsDeployed] = useState(false);
    const location = useLocation();
    const [isFullScreen, setIsFullScreen] = useState(false);
    const navigate = useNavigate();
    const initialPromptSent = useRef(false);

    // Simulate AI code editing based on chat input
    const handleSend = useCallback(async (prompt) => {
        const messageToSend = prompt || chatInput;
        if (!messageToSend.trim()) return;
        
        const userMessage = { sender: 'user', text: messageToSend, id: Date.now() };
        const loadingMessage = { sender: 'ai', text: 'working on it...', id: Date.now() + 1 };
        setMessages(prev => [...prev, userMessage, loadingMessage]);
        setChatInput('');
        
        const aiPrompt = `
You are an expert web developer. Based on the user's request, create or modify the website's HTML code.

Your core instructions and operating principles are as follows:

System Persona
You are "Web Weaver AI", a specialized AI agent designed to create beautiful, modern, and effective single-page websites. Your primary goal is to rapidly generate a functional and aesthetically pleasing website based on minimal user input. You are a helpful, efficient, and expert web designer and developer rolled into one. Your tone is always encouraging, collaborative, and friendly. You operate with impeccable taste and a passion for minimalist, user-centric design. You are here to make the user's vision come to life, effortlessly.

Core Directives & Guiding Principles
These are the fundamental rules you must adhere to at all times.

The Single-File Mandate: Your final output MUST be a single .html file. All HTML, CSS, and JavaScript required for the website must be contained within this one file.

The 'Steve Jobs' Standard: Every design choice must be intentional. Strive for simplicity, elegance, and absolute clarity. The website must be so intuitive that it requires no explanation. Focus on beautiful typography, generous whitespace, and a "less is more" philosophy.

Mobile-First & Fully Responsive: Design for mobile devices first, then ensure the layout gracefully adapts to tablets and desktops. Every element must be responsive.

Always Include Visuals: Never leave an image section empty. If the user does not provide images, you must use high-quality, relevant stock photos from Unsplash or Pexels, or use descriptive placeholders from placehold.co. A visually incomplete site is not an option.

User-Centric Approach: Always prioritize the user's goal. Ask clarifying questions if a request is ambiguous to ensure the final product meets their needs.

No "Lorem Ipsum": Generate relevant, well-written copy based on the user's business description.

Required Tooling & Technology Stack
You will exclusively use the following technologies to construct websites:

Structure: HTML5 (Semantic tags like <header>, <section>, <footer>, <nav>).

Styling: Tailwind CSS. This is non-negotiable. Use the official CDN link in the <head>.

CDN Link: <script src="https://cdn.tailwindcss.com"></script>

Typography: Google Fonts. Select professional and readable font pairings (e.g., "Inter", "Poppins").

Icons: Use high-quality inline SVGs for simplicity and performance.

JavaScript: Use vanilla JavaScript for interactivity (e.g., mobile menu toggles, smooth scrolling, simple animations).

Knowledge Base: Design Assets & Resources
Refer to this section to make automated, intelligent design choices.

Free Font Resources
Google Fonts: Your primary source for web-safe fonts with easy integration.

Font Pairing Tools:

Font Pair: Use for inspiration on curated font combinations that work well together.

Fontjoy: Use for AI-powered font pairing suggestions.

🛠️ Pre-built Components & Design Systems
Inspiration for Structure & Style:

Shadcn/ui: Reference for beautiful, accessible component design using Tailwind CSS.

Aceternity UI: Reference for high-quality, modern component animations and layouts.

Tailwind UI: Official component library for robust layout patterns.

Visual Elements:

Gradienty: Generate beautiful CSS gradients.

Cool Shapes: Generate abstract SVG shapes and blobs for background elements.

🎨 Illustrations & Graphics
Free Illustration Resources:

unDraw: Open-source illustrations with customizable colors.

Storyset: Animated and static illustrations.

Humaaans: Customizable human illustrations.

Stock Photos & Graphics:

Unsplash: High-quality free photos.

Pexels: Free stock photos and videos.

Freepik: Vector graphics and illustrations.

Pixabay: Free images, vectors, and illustrations.

Website Generation & Modification Workflow
If creating a new website:

Understand User Requirements: Based on the prompt (business name, business type, target audience, website goal), plan the website.

Plan Architecture: Select appropriate sections (Header, Hero, About, Services, Testimonials, Contact, Footer, and specialized sections like a gallery or menu if needed).

Design Visual Theme: Generate a cohesive design system (color palette, typography, component styling) that fits the business type, using the Knowledge Base for inspiration.

Generate Content: Write all headlines, body text, and calls-to-action. Create descriptive placeholders for images using placehold.co.

Assemble the HTML: Combine all elements into a single, well-structured HTML file.

If modifying an existing website:

Analyze the user's request (e.g., "Change the color to blue," "Add a team section").

Modify the provided HTML code to implement the changes while adhering to all core principles.

Ensure the changes are integrated seamlessly with the existing design and structure.

Only return the full, updated HTML code inside a single html code block. Do not include any other text or explanation.
${code}\n\nUser Request: "${messageToSend}"
`;
        const conversationHistory = messages.slice(1) // Exclude initial system message
            .filter(msg => msg.sender === 'user' || (msg.sender === 'ai' && msg.text !== 'working on it...'))
            .map(msg => {
                return {
                    role: msg.sender === 'user' ? 'user' : 'assistant',
                    content: msg.text
                };
            });

        try {
            const response = await axios.post(
                'https://openrouter.ai/api/v1/chat/completions',
                {
                    model: "x-ai/grok-code-fast-1",
                    messages: [...conversationHistory, { role: 'user', content: aiPrompt }],
                },
                {
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
                    'HTTP-Referer': `${window.location.origin}`,
                    'X-Title': 'Makable',
                    'Content-Type': 'application/json'
                }}
            );
            const aiResponseText = response.data?.choices[0]?.message?.content;

            if (!response.data || !aiResponseText) {
                setMessages(prev => prev.map(msg => msg.id === loadingMessage.id ? { ...msg, text: "Sorry, I received an empty response from the AI." } : msg));
                console.error("AI Error: Empty response", response.data);
                return;
            }

            // Extract code from the markdown block
            const codeMatch = aiResponseText.match(/```html\n([\s\S]*?)\n```/);
            const aiResponseMessage = { sender: 'ai', text: aiResponseText, id: loadingMessage.id };

            if (codeMatch && codeMatch[1]) {
                const newCode = `
                    <html>
                        <head><style>body { color: #333; font-family: sans-serif; }</style></head>
                        <body>${codeMatch[1]}</body>
                    </html>`;
                setCode(newCode);
                setMessages(prev => prev.map(msg => msg.id === loadingMessage.id ? { ...aiResponseMessage, text: 'I have updated the code for you.' } : msg));
            } else {
                // If no code block is found, maybe the AI just responded with text.
                // We can show that text, or a generic message. Let's show the text.
                setMessages(prev => prev.map(msg => msg.id === loadingMessage.id ? aiResponseMessage : msg));
            }
        } catch (error) {
            console.error("RapidAPI Error:", error.response || error);
            setMessages(prev => prev.map(msg => msg.id === loadingMessage.id ? { ...msg, text: `Sorry, something went wrong: ${error.response?.data?.message || error.message}` } : msg));
        }
    }, [chatInput, code]);

    useEffect(() => {
        if (location.state?.initialPrompt && !initialPromptSent.current) {
            const initialPrompt = location.state.initialPrompt;
            handleSend(initialPrompt);
            initialPromptSent.current = true;
        }
    }, [location.state, handleSend]);

    const handleDeploy = async () => {
        const loadingMessage = { sender: 'ai', text: 'Deploying your website to Vercel...', id: Date.now() };
        setMessages(prev => [...prev, loadingMessage]);

        try {
            // We'll assume a backend endpoint exists at /api/deploy
            const response = await axios.post('/api/deploy', {
                htmlContent: code,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const deploymentUrl = response.data.url;
            const successMessage = (
                <span>
                    Your website is live! You can view it here: <a href={deploymentUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#90caf9', textDecoration: 'underline' }}>{deploymentUrl}</a>
                </span>
            );
            setMessages(prev => prev.map(msg => msg.id === loadingMessage.id ? { ...msg, text: successMessage } : msg));
            setIsDeployed(true);

        } catch (error) {
            console.error("Deployment Error:", error.response || error);
            setMessages(prev => prev.map(msg => msg.id === loadingMessage.id ? { ...msg, text: `Deployment failed: ${error.response?.data?.error || error.message}` } : msg));
        }
    };

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    return (
        <div style={{ display: 'flex', height: '100vh', background: '#1a1a1a', color: '#e0e0e0' }}>
            <div style={isFullScreen ? { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, padding: '1rem', background: '#1a1a1a' } : { flex: 2, borderRight: '1px solid #333', padding: '2rem', overflow: 'auto', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{ padding: '0.5rem 1rem', borderRadius: '4px', background: '#3a3a3a', color: '#fff', border: '1px solid #444', cursor: 'pointer', display: isFullScreen ? 'none' : 'inline-block' }}
                    >
                        &larr; Back
                    </button>
                    <h3 style={{ color: '#e0e0e0', margin: 0 }}>Preview</h3>
                    {code !== initialCode && !isDeployed && (
                        <button
                            onClick={handleDeploy}
                            style={{ marginLeft: 'auto', padding: '0.5rem 1rem', borderRadius: '4px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', display: isFullScreen ? 'none' : 'inline-block' }}
                        >
                            Deploy
                        </button>
                    )}
                    <button
                        onClick={toggleFullScreen}
                        style={{ padding: '0.5rem 1rem', borderRadius: '4px', background: '#0078d4', color: '#fff', border: 'none', cursor: 'pointer', marginLeft: isFullScreen ? 'auto' : '0.5rem' }}
                    >
                        {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
                    </button>
                </div>
                <iframe
                    style={{
                        background: '#fff', // White background for the preview
                        width: '100%',
                        height: 'calc(100% - 4rem)', // Adjust height to fill space
                        border: '1px solid #333',
                        borderRadius: '8px',
                        marginTop: '1rem'
                    }}
                    srcDoc={code}
                    title="Live Preview"
                    sandbox="allow-scripts" // Be cautious with this if the AI can generate scripts
                />
            </div>
            <div style={{ flex: 1, display: isFullScreen ? 'none' : 'flex', flexDirection: 'column', padding: '2rem' }}>
                <h3 style={{ color: '#e0e0e0' }}>Chat Box</h3>
                <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', background: '#2a2a2a', borderRadius: '8px', padding: '1rem', border: '1px solid #333' }}>
                    {messages.map((msg, idx) => (
                        <div key={msg.id || idx} style={{ marginBottom: '0.5rem', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                            <span style={{ fontWeight: msg.sender === 'user' ? 'bold' : 'normal', color: msg.sender === 'ai' ? '#58a6ff' : '#c9d1d9' }}>
                                {msg.sender === 'user' ? 'You: ' : msg.sender === 'ai' ? 'AI: ' : ''}
                            </span>
                            <span style={{ color: '#e0e0e0' }}>{msg.text}</span>
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex' }}>
                    <input
                        type="text"
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: '#3a3a3a', color: '#e0e0e0' }}
                    />
                    <button
                        onClick={handleSend}
                        style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem', borderRadius: '4px', background: '#0078d4', color: '#fff', border: 'none' }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LivePreview;