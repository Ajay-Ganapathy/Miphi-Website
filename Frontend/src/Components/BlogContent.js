import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

// Function to add IDs to <strong> tags and return HTML with IDs and an array of IDs
const addIdToParagraphs = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const strongTags = tempDiv.querySelectorAll('strong');
    const ids = [];

    strongTags.forEach((strong, index) => {
        const id = `strong-${index}`;
        strong.id = id;
        ids.push({
            id: id,
            content: strong.textContent
        });
    });

    return { html: tempDiv.innerHTML, ids };
};

const BlogContent = ({ blogContent }) => {
    const { html: modifiedHtmlContent, ids } = addIdToParagraphs(blogContent);
    const sanitizedHtmlContent = DOMPurify.sanitize(modifiedHtmlContent);

    const [highlightedId, setHighlightedId] = useState(null);

    useEffect(() => {
        // Add scroll event listener to highlight the paragraph in view
        const handleScroll = () => {
            const paragraphs = ids.map(({ id }) => document.getElementById(id));
            const inView = paragraphs.find(p => {
                if (!p) return false;
                const rect = p.getBoundingClientRect();
                return rect.top >= 0 && rect.bottom <= window.innerHeight;
            });
            setHighlightedId(inView ? inView.id : null);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, [ids]);

    return (
        <div className="flex">
            {/* Main Content */}
            <div className="flex-1 px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md ml-32 text-lg leading-relaxed">
                <div
                    dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
                ></div>
            </div>

            {/* Fixed Highlights */}
            <nav className="fixed top-24 right-4 w-60 mt-12">
                <h3>Highlights</h3>
                <ul className="space-y-2">
                    {ids.map(({ id, content }) => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                className={`transition-colors duration-300 ease-in-out ${highlightedId === id ? 'text-purple-900 font-bold' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                {content}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default BlogContent;
