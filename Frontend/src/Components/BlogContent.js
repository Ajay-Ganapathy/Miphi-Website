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
            <div className="flex-1 px-4 lg:px-0 mt-12 mb-12 text-gray-700 max-w-screen-md text-lg leading-relaxed lg:mr-40">
                <div
                    dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
                ></div>
            </div>

            {/* Fixed Highlights and Author Section */}
            <div className="flex flex-col lg:fixed lg:top-24 lg:right-16 w-full lg:w-60 mt-8 mb-4 lg:mt-4 h-[80vh]">
                <nav className="flex-1 overflow-y-auto pr-2 scrollbar-hidden">
                    {/* Sticky Heading */}
                    <strong className="text-2xl mb-8 block text-center lg:text-left top-0  z-10">Highlights</strong>
                    {/* Scrollable Content */}
                    <ul className="mt-4 space-y-2 text-center lg:text-left">
                        {ids.map(({ id, content }) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    className={`transition-colors duration-500 ease-in-out ${highlightedId === id ? 'text-purple-900 font-bold' : 'text-gray-600'}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                                        setHighlightedId(id);
                                    }}
                                >
                                    {content}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Author Info at the Bottom */}
                <div className="mt-4 mb-4 text-center lg:text-left">
                    <hr className="my-4" />
                    <h4 className="text-lg font-semibold">Author</h4>
                    <h3 className="text-md">{author_name}</h3>
                </div>
            </div>
        </div>
    );
};

export default BlogContent;
