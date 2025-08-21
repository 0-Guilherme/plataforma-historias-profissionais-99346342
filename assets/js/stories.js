// Stories page functionality

let currentPage = 1;
const storiesPerPage = 5;

document.addEventListener('DOMContentLoaded', function() {
    loadStories();
});

function loadStories() {
    const storiesContainer = document.getElementById('storiesList');
    if (!storiesContainer) return;
    
    // Get stories from localStorage and merge with default stories
    const savedStories = window.utils.getFromLocalStorage('stories') || [];
    const defaultStories = getDefaultStories();
    const allStories = [...savedStories, ...defaultStories];
    
    // Sort by publication date (newest first)
    allStories.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    
    // Clear container
    storiesContainer.innerHTML = '';
    
    // Display stories
    const start = 0;
    const end = currentPage * storiesPerPage;
    const storiesToShow = allStories.slice(start, end);
    
    storiesToShow.forEach(story => {
        storiesContainer.appendChild(createStoryCard(story));
    });
    
    // Update load more button visibility
    const loadMoreBtn = document.querySelector('.load-more-section button');
    if (loadMoreBtn) {
        if (end >= allStories.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }
}

function createStoryCard(story) {
    const card = document.createElement('article');
    card.className = 'story-card';
    card.onclick = () => openStory(story.id);
    
    card.innerHTML = `
        <header class="story-header">
            <h2 class="story-title">${story.title}</h2>
            <p class="story-excerpt">${story.excerpt}</p>
        </header>
        
        <div class="story-tags">
            ${story.tags.map(tag => `<span class="story-tag">${tag}</span>`).join('')}
        </div>
        
        <footer class="story-meta">
            <div class="story-author-info">
                <div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>${story.author}</span>
                </div>
                <div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                    </svg>
                    <span>${story.readTime} de leitura</span>
                </div>
                <span>${formatDate(story.publishedAt)}</span>
            </div>
            
            <div class="story-stats">
                <div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    <span>${story.likes}</span>
                </div>
                <div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span>${story.comments}</span>
                </div>
            </div>
        </footer>
    `;
    
    return card;
}

function loadMoreStories() {
    currentPage++;
    loadStories();
}

function openStory(storyId) {
    // In a real app, this would navigate to a detailed story page
    window.utils.showToast('Funcionalidade de leitura completa em desenvolvimento');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
        return 'Hoje';
    } else if (diffInDays === 1) {
        return 'Ontem';
    } else if (diffInDays < 7) {
        return `${diffInDays} dias atrás`;
    } else if (diffInDays < 30) {
        const weeks = Math.floor(diffInDays / 7);
        return `${weeks} semana${weeks > 1 ? 's' : ''} atrás`;
    } else {
        return date.toLocaleDateString('pt-BR');
    }
}

function getDefaultStories() {
    return [
        {
            id: 1,
            title: "De desenvolvedor para líder de produto: minha jornada de 5 anos",
            excerpt: "Como a curiosidade sobre o negócio me levou a descobrir uma paixão inesperada pela estratégia de produto...",
            content: "<p>Como a curiosidade sobre o negócio me levou a descobrir uma paixão inesperada pela estratégia de produto...</p>",
            author: "Carlos Silva",
            authorId: "default-1",
            readTime: "8 min",
            tags: ["Transição de Carreira", "Liderança", "Produto"],
            likes: 47,
            comments: 12,
            publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
        },
        {
            id: 2,
            title: "Aos 45, mudei completamente de área e nunca me arrependi",
            excerpt: "Deixei uma carreira consolidada no direito para seguir minha paixão por design. Aqui está o que aprendi...",
            content: "<p>Deixei uma carreira consolidada no direito para seguir minha paixão por design. Aqui está o que aprendi...</p>",
            author: "Ana Santos",
            authorId: "default-2",
            readTime: "12 min",
            tags: ["Mudança de Carreira", "Design", "Coragem"],
            likes: 89,
            comments: 28,
            publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
        },
        {
            id: 3,
            title: "Como o fracasso da minha startup me tornou um empreendedor melhor",
            excerpt: "Perdemos tudo em 18 meses. Mas as lições que aprendi valeram cada momento difícil...",
            content: "<p>Perdemos tudo em 18 meses. Mas as lições que aprendi valeram cada momento difícil...</p>",
            author: "Rafael Costa",
            authorId: "default-3",
            readTime: "10 min",
            tags: ["Empreendedorismo", "Fracasso", "Aprendizado"],
            likes: 156,
            comments: 45,
            publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week ago
        }
    ];
}