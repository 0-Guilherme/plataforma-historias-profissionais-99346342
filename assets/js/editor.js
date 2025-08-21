// Rich text editor functionality

document.addEventListener('DOMContentLoaded', function() {
    const storyForm = document.getElementById('storyForm');
    const contentEditor = document.getElementById('storyContent');
    const toolbarButtons = document.querySelectorAll('.toolbar-btn');
    
    if (storyForm) {
        storyForm.addEventListener('submit', handleStorySubmit);
    }
    
    // Initialize toolbar buttons
    toolbarButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const command = this.dataset.command;
            const value = this.dataset.value;
            
            executeCommand(command, value);
            updateToolbarState();
        });
    });
    
    // Update toolbar state on selection change
    if (contentEditor) {
        contentEditor.addEventListener('selectionchange', updateToolbarState);
        contentEditor.addEventListener('keyup', updateToolbarState);
    }
});

function executeCommand(command, value = null) {
    document.execCommand(command, false, value);
    document.getElementById('storyContent').focus();
}

function updateToolbarState() {
    const toolbarButtons = document.querySelectorAll('.toolbar-btn');
    
    toolbarButtons.forEach(button => {
        const command = button.dataset.command;
        const isActive = document.queryCommandState(command);
        
        if (isActive) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function insertSuggestion(type) {
    const editor = document.getElementById('storyContent');
    const suggestions = {
        'início': {
            title: '## O Início da Jornada\n\n',
            text: 'Conte onde você estava antes da mudança. Qual era sua situação profissional? O que te motivou a buscar algo diferente?\n\n'
        },
        'desafio': {
            title: '## O Desafio que Enfrentei\n\n',
            text: 'Descreva os principais obstáculos que você encontrou. Quais foram as dificuldades? Como você se sentiu durante esse período?\n\n'
        },
        'virada': {
            title: '## O Ponto de Virada\n\n',
            text: 'Qual foi o momento ou decisão que mudou tudo? O que te fez tomar essa atitude? Como foi o processo de mudança?\n\n'
        },
        'aprendizados': {
            title: '## Principais Aprendizados\n\n',
            text: 'O que você aprendeu com essa experiência? Quais conselhos daria para quem está passando por algo similar?\n\n'
        }
    };
    
    const suggestion = suggestions[type];
    if (suggestion && editor) {
        const currentContent = editor.innerHTML;
        const newContent = currentContent + 
            `<h2>${suggestion.title.replace('## ', '').replace('\n\n', '')}</h2>` +
            `<p>${suggestion.text.replace('\n\n', '')}</p>`;
        
        editor.innerHTML = newContent;
        editor.focus();
        
        // Move cursor to end
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(editor);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function addTag(tagName) {
    const tagsInput = document.getElementById('storyTags');
    if (tagsInput) {
        const currentTags = tagsInput.value.trim();
        const tagsArray = currentTags ? currentTags.split(',').map(tag => tag.trim()) : [];
        
        if (!tagsArray.includes(tagName)) {
            tagsArray.push(tagName);
            tagsInput.value = tagsArray.join(', ');
        }
    }
}

async function saveDraft() {
    const title = document.getElementById('storyTitle').value;
    const content = document.getElementById('storyContent').innerHTML;
    const tags = document.getElementById('storyTags').value;
    
    if (!title.trim() && !content.trim()) {
        window.utils.showToast('Não há conteúdo para salvar', 'error');
        return;
    }
    
    const draft = {
        id: Date.now(),
        title: title.trim(),
        content: content,
        tags: tags.trim(),
        savedAt: new Date().toISOString(),
        status: 'draft'
    };
    
    // Save to localStorage (in a real app, this would go to a server)
    const drafts = window.utils.getFromLocalStorage('drafts') || [];
    const existingDraftIndex = drafts.findIndex(d => d.title === draft.title);
    
    if (existingDraftIndex > -1) {
        drafts[existingDraftIndex] = draft;
    } else {
        drafts.push(draft);
    }
    
    window.utils.saveToLocalStorage('drafts', drafts);
    window.utils.showToast('Rascunho salvo com sucesso!');
}

async function handleStorySubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('storyTitle').value.trim();
    const content = document.getElementById('storyContent').innerHTML.trim();
    const tags = document.getElementById('storyTags').value.trim();
    
    // Validate form
    if (!title) {
        window.utils.showToast('Por favor, adicione um título à sua história', 'error');
        return;
    }
    
    if (!content || content === '<br>' || content === '<div><br></div>') {
        window.utils.showToast('Por favor, escreva o conteúdo da sua história', 'error');
        return;
    }
    
    if (!window.auth.isLoggedIn()) {
        window.utils.showToast('Você precisa estar logado para publicar uma história', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return;
    }
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    window.utils.setLoadingState(submitBtn, true, originalText);
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const user = window.auth.getCurrentUser();
        const story = {
            id: Date.now(),
            title: title,
            content: content,
            excerpt: generateExcerpt(content),
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            author: user.name,
            authorId: user.id,
            publishedAt: new Date().toISOString(),
            likes: 0,
            comments: 0,
            readTime: calculateReadTime(content)
        };
        
        // Save story (in a real app, this would go to a server)
        const stories = window.utils.getFromLocalStorage('stories') || [];
        stories.unshift(story);
        window.utils.saveToLocalStorage('stories', stories);
        
        // Remove from drafts if it exists
        const drafts = window.utils.getFromLocalStorage('drafts') || [];
        const updatedDrafts = drafts.filter(d => d.title !== title);
        window.utils.saveToLocalStorage('drafts', updatedDrafts);
        
        window.utils.showToast('História publicada com sucesso!');
        
        // Redirect to stories page
        setTimeout(() => {
            window.location.href = 'historias.html';
        }, 1500);
        
    } catch (error) {
        window.utils.showToast('Erro ao publicar história. Tente novamente.', 'error');
    } finally {
        window.utils.setLoadingState(submitBtn, false, originalText);
    }
}

function generateExcerpt(content) {
    // Remove HTML tags and get first 150 characters
    const textContent = content.replace(/<[^>]*>/g, '');
    return textContent.length > 150 ? textContent.substring(0, 150) + '...' : textContent;
}

function calculateReadTime(content) {
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingSpeed = 200; // words per minute
    const minutes = Math.ceil(words / readingSpeed);
    return `${minutes} min`;
}

// Load draft on page load if available
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const draftId = urlParams.get('draft');
    
    if (draftId) {
        const drafts = window.utils.getFromLocalStorage('drafts') || [];
        const draft = drafts.find(d => d.id.toString() === draftId);
        
        if (draft) {
            document.getElementById('storyTitle').value = draft.title;
            document.getElementById('storyContent').innerHTML = draft.content;
            document.getElementById('storyTags').value = draft.tags;
            
            window.utils.showToast('Rascunho carregado');
        }
    }
});