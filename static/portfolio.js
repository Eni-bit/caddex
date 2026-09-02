var TABS = [
    { id: 'all', label: 'All Projects' },
    { id: 'parts', label: 'Parts' },
    { id: 'drawings', label: 'Drawings' },
    { id: 'assemblies', label: 'Assemblies' },
    { id: 'animation', label: 'Animation' },
    { id: 'about', label: 'About Me' },
    { id: 'contact', label: 'Contact' }
];

function youtubeId(url) {
    if (!url) return null;
    url = String(url).trim();
    if (/^[A-Za-z0-9_-]{11}$/.test(url) && /[A-Za-z]/.test(url) && /\d/.test(url)) {
        return url;
    }
    var match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/);
    if (match) return match[1];
    match = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
    return match ? match[1] : null;
}

function youtubeVideos(project) {
    return (project.videos || []).map(function (item) {
        var id = youtubeId(item.url);
        if (!id) return null;
        return {
            caption: item.caption || 'Video',
            videoId: id,
            embedUrl: 'https://www.youtube.com/embed/' + id,
            thumbUrl: 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg'
        };
    }).filter(Boolean);
}

function fileCaption(path) {
    var name = path.split('/').pop().replace(/\.[^.]+$/, '');
    return name.replace(/[-_]/g, ' ');
}

function fileExt(path) {
    var parts = path.split('.');
    return parts.length > 1 ? '.' + parts.pop().toLowerCase() : '';
}

function sortedProjects() {
    return CADDEX.projects.slice().sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });
}

function queryValue(name) {
    var params = new URLSearchParams(window.location.search);
    return (params.get(name) || '').trim();
}

function categoryTags(project) {
    return project.category.split('/').map(function (tag) {
        return tag.trim().toLowerCase();
    });
}

function matchesTab(project, tab) {
    var tags = categoryTags(project);
    if (tab === 'parts') return tags.indexOf('part') !== -1;
    if (tab === 'assemblies') return tags.indexOf('assembly') !== -1;
    if (tab === 'animation') return tags.indexOf('animation') !== -1;
    if (tab === 'drawings') {
        return tags.indexOf('drawing') !== -1 || (project.drawings || []).length > 0;
    }
    return true;
}

function coverHtml(project) {
    var videos = youtubeVideos(project);
    if (project.cover) {
        return '<img src="' + project.cover + '" alt="' + project.name + '">';
    }
    if (videos.length) {
        return '<div class="cover-thumb">' +
            '<img src="' + videos[0].thumbUrl + '" alt="' + project.name + '">' +
            '<span class="play-badge">▶</span></div>';
    }
    return '<div class="cover-placeholder">' + project.name + '</div>';
}

function cardHtml(project) {
    return '<article class="card">' +
        '<a class="card-link" href="project.html?slug=' + encodeURIComponent(project.slug) + '">' +
        coverHtml(project) +
        '<div class="card-body">' +
        '<p class="chip">' + project.category + '</p>' +
        '<h2>' + project.name + '</h2>' +
        '<p class="card-meta">' + project.software + ' · ' + project.year + '</p>' +
        '</div></a></article>';
}

function renderNav(activeTab) {
    var nav = document.getElementById('site-nav');
    if (!nav) return;
    nav.innerHTML = TABS.map(function (tab) {
        var href = 'index.html' + (tab.id === 'all' ? '' : '?tab=' + tab.id);
        var cls = tab.id === activeTab ? 'tab active' : 'tab';
        return '<a class="' + cls + '" href="' + href + '">' + tab.label + '</a>';
    }).join('');
}

function tabTitle(tab) {
    var found = TABS.filter(function (item) { return item.id === tab; })[0];
    return found ? found.label : 'All Projects';
}

function renderHomepage() {
    var tab = (queryValue('tab') || 'all').toLowerCase();
    if (!TABS.some(function (item) { return item.id === tab; })) tab = 'all';
    renderNav(tab);

    var projectsPanel = document.getElementById('projects-panel');
    var aboutPanel = document.getElementById('about-panel');
    var contactPanel = document.getElementById('contact-panel');

    projectsPanel.hidden = tab === 'about' || tab === 'contact';
    aboutPanel.hidden = tab !== 'about';
    contactPanel.hidden = tab !== 'contact';

    if (tab === 'about') {
        document.title = 'About Me · CADDex';
        renderAbout();
        return;
    }
    if (tab === 'contact') {
        document.title = 'Contact · CADDex';
        renderContact();
        return;
    }

    document.title = tabTitle(tab) + ' · CADDex';
    document.getElementById('panel-title').textContent = tabTitle(tab);

    var filtered = sortedProjects().filter(function (project) {
        return matchesTab(project, tab);
    });
    var content = document.getElementById('project-grid');
    if (!filtered.length) {
        content.innerHTML = '<p class="empty-state">No ' + tabTitle(tab).toLowerCase() + ' uploaded yet.</p>';
    } else {
        content.innerHTML = filtered.map(cardHtml).join('');
    }

    var showreelBox = document.getElementById('showreel');
    if (!showreelBox) return;
    var showreel = CADDEX.projects.filter(function (p) { return p.slug === 'showreel'; })[0];
    var clips = showreel ? youtubeVideos(showreel) : [];
    if (clips.length && (tab === 'all' || tab === 'animation')) {
        showreelBox.innerHTML =
            '<h2>Animation Showreel</h2>' +
            '<p>SolidWorks modeling and assembly motion, compiled in one clip.</p>' +
            '<div class="youtube-wrap youtube-wrap-wide">' +
            '<iframe src="' + clips[0].embedUrl + '" title="' + clips[0].caption + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>' +
            '</div>';
        showreelBox.hidden = false;
    } else {
        showreelBox.hidden = true;
        showreelBox.innerHTML = '';
    }
}

function renderAbout() {
    var profile = CADDEX.profile || {};
    var frame = document.querySelector('.photo-frame');
    var img = document.getElementById('about-photo');
    var grid = document.querySelector('.about-grid');

    document.getElementById('about-name').textContent = profile.name || '';
    document.getElementById('about-role').textContent = profile.role || '';
    document.getElementById('about-text').textContent = profile.about || '';

    function hidePhoto() {
        if (frame) frame.hidden = true;
        if (grid) grid.classList.add('no-photo');
    }

    if (!profile.photo) {
        hidePhoto();
        return;
    }

    img.alt = profile.name || 'Profile photo';
    img.onerror = hidePhoto;
    img.onload = function () {
        if (frame) frame.hidden = false;
        if (grid) grid.classList.remove('no-photo');
    };
    img.src = profile.photo;
}

function renderContact() {
    var profile = CADDEX.profile || {};
    var list = document.getElementById('contact-list');
    var items = [];
    if (profile.email) {
        items.push('<a class="contact-card" href="mailto:' + profile.email + '"><span>Email</span><strong>' + profile.email + '</strong></a>');
    }
    if (profile.github) {
        items.push('<a class="contact-card" href="' + profile.github + '" target="_blank" rel="noopener"><span>GitHub</span><strong>' + profile.github.replace('https://', '') + '</strong></a>');
    }
    if (!items.length) {
        list.innerHTML = '<p class="empty-state">Contact links coming soon.</p>';
        return;
    }
    list.innerHTML = items.join('');
}

function renderProject() {
    var slug = queryValue('slug');
    var project = CADDEX.projects.filter(function (item) { return item.slug === slug; })[0];
    if (!project) {
        window.location.href = 'index.html';
        return;
    }

    var tags = categoryTags(project);
    var active = 'all';
    if (tags.indexOf('part') !== -1) active = 'parts';
    else if (tags.indexOf('drawing') !== -1) active = 'drawings';
    else if (tags.indexOf('assembly') !== -1) active = 'assemblies';
    else if (tags.indexOf('animation') !== -1) active = 'animation';
    renderNav(active);

    document.title = project.name + ' · CADDex';
    document.getElementById('project-cover').innerHTML = coverHtml(project);
    document.getElementById('project-name').textContent = project.name;
    document.getElementById('project-category').textContent = project.category;
    document.getElementById('project-software').textContent = project.software;
    document.getElementById('project-year').textContent = project.year;
    document.getElementById('project-description').textContent = project.description;

    renderMediaSection('pictures-section', 'pictures-grid', project.pictures || [], function (path) {
        return '<div class="gallery-item"><img src="' + path + '" alt="' + fileCaption(path) + '" class="zoomable"><p>' + fileCaption(path) + '</p></div>';
    });

    renderMediaSection('drawings-section', 'drawings-grid', project.drawings || [], function (path) {
        if (fileExt(path) === '.pdf') {
            return '<div class="gallery-item"><a class="pdf-link" href="' + path + '" target="_blank">Open PDF: ' + fileCaption(path) + '</a></div>';
        }
        return '<div class="gallery-item"><div class="drawing-frame"><img src="' + path + '" alt="' + fileCaption(path) + '" class="zoomable"></div><p>' + fileCaption(path) + '</p></div>';
    });

    var clips = youtubeVideos(project);
    renderMediaSection('videos-section', 'videos-grid', clips, function (item) {
        return '<div class="gallery-item"><div class="youtube-wrap">' +
            '<iframe src="' + item.embedUrl + '" title="' + item.caption + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>' +
            '</div><p>' + item.caption + '</p></div>';
    });

    var coverImg = document.querySelector('#project-cover img');
    if (coverImg && project.cover) coverImg.classList.add('zoomable');
    setupLightbox();
}

function renderMediaSection(sectionId, gridId, items, htmlFn) {
    var section = document.getElementById(sectionId);
    var grid = document.getElementById(gridId);
    if (!items.length) {
        section.hidden = true;
        return;
    }
    section.hidden = false;
    grid.innerHTML = items.map(htmlFn).join('');
}

function setupLightbox() {
    var lightbox = document.getElementById('lightbox');
    var lightboxImage = document.getElementById('lightbox-image');
    if (!lightbox) return;

    document.querySelectorAll('.zoomable').forEach(function (img) {
        img.addEventListener('click', function () {
            lightboxImage.src = img.src;
            lightbox.classList.add('open');
        });
    });
    lightbox.addEventListener('click', function () {
        lightbox.classList.remove('open');
        lightboxImage.src = '';
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var page = document.body.getAttribute('data-page');
    if (page === 'home') renderHomepage();
    if (page === 'project') renderProject();
});
