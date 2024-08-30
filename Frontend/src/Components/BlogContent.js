import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

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

const BlogContent = ({ blogContent, author_name }) => {
    const { html: modifiedHtmlContent, ids } = addIdToParagraphs(blogContent);
    const sanitizedHtmlContent = DOMPurify.sanitize(modifiedHtmlContent);

    const [highlightedId, setHighlightedId] = useState(null);

    useEffect(() => {
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
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [ids]);

    return (
        <div className="flex flex-col lg:flex-row lg:justify-start">
            {/* Main Content */}
            <div className="flex-1 px-4 lg:px-0 mt-12 mb-12 text-gray-700 max-w-screen-md text-lg leading-relaxed lg:mr-16">
                <div
                    dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
                ></div>
            </div>

            {/* Fixed Highlights */}
            <nav className="lg:fixed lg:top-24 lg:right-16 w-full lg:w-60 mt-8 lg:mt-4">
                <strong className="text-2xl mb-8 block text-center lg:text-left">Highlights</strong>
                <ul className="mt-4 space-y-2 text-center lg:text-left">
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
                    <br />
                    <hr />

                    <h4 className="mt-4">Author</h4>
                    <h3>{author_name}</h3>
                </ul>
            </nav>
        </div>
    );
};

export default BlogContent;
