var TABS = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
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

function youtubeEmbeds(items) {
    return (items || []).map(function (item) {
        var id = youtubeId(item.url);
        if (!id) return null;
        return {
            caption: item.caption || 'Video',
            embedUrl: 'https://www.youtube.com/embed/' + id,
            thumbUrl: item.cover || 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg'
        };
    }).filter(Boolean);
}

function fileCaption(path) {
    var name = path.split('/').pop().replace(/\.[^.]+$/, '');
    return name.replace(/drawing_/g, '').replace(/[-_]/g, ' ');
}

function viewLabel(path) {
    var name = path.split('/').pop().replace(/\.[^.]+$/, '').replace(/^drawing_/, '');
    var parts = name.split(/[-_]/);
    var last = (parts[parts.length - 1] || '').toLowerCase();
    var views = { front: 1, top: 1, right: 1, left: 1, bottom: 1, back: 1, isometric: 1, iso: 1 };
    if (views[last]) {
        return (last === 'iso' ? 'isometric' : last) + ' view';
    }
    if (/^\d+$/.test(last)) return 'view ' + last;
    return fileCaption(path);
}

function modelViewCaption(model, path) {
    return model + '  ·  ' + viewLabel(path);
}

function firstVideoThumb(project) {
    var sections = project.sections || [];
    for (var i = 0; i < sections.length; i++) {
        var clips = youtubeEmbeds(sections[i].videos);
        if (clips.length) return clips[0].thumbUrl;
    }
    return '';
}

function paragraphsHtml(items) {
    return (items || []).map(function (text) {
        return '<p>' + text + '</p>';
    }).join('');
}

function textHtml(text) {
    if (Array.isArray(text)) return paragraphsHtml(text);
    if (!text) return '';
    return '<p>' + text + '</p>';
}

function numberedTitle(project) {
    return (project.number ? project.number + ' — ' : '') + project.name;
}

function coverHtml(project, allowPlaceholder) {
    if (project.cover) {
        return '<div class="card-media"><img src="' + project.cover + '" alt="' + project.name + '"></div>';
    }
    var thumb = firstVideoThumb(project);
    if (thumb) {
        return '<div class="card-media cover-thumb"><img src="' + thumb + '" alt="' + project.name + '"><span class="play-badge">▶</span></div>';
    }
    if (allowPlaceholder) {
        return '<div class="card-media cover-placeholder">' + project.name + '</div>';
    }
    return '';
}

function drawingPartKey(path) {
    var name = path.split('/').pop().replace(/\.[^.]+$/, '').replace(/^drawing_/, '');
    return name.split(/[-_]/)[0].toLowerCase();
}

function drawingGroupTitle(key) {
    var titles = {
        door: 'Doors',
        drawer: 'Drawers',
        frame: 'Frame',
        handle: 'Handles',
        hinge: 'Hinges'
    };
    if (titles[key]) return titles[key];
    return key.charAt(0).toUpperCase() + key.slice(1);
}

function groupDrawings(paths) {
    var order = ['frame', 'door', 'drawer', 'handle', 'hinge'];
    var groups = {};
    (paths || []).forEach(function (path) {
        var key = drawingPartKey(path);
        if (!groups[key]) groups[key] = [];
        groups[key].push(path);
    });
    return Object.keys(groups).sort(function (a, b) {
        var ia = order.indexOf(a);
        var ib = order.indexOf(b);
        if (ia === -1 && ib === -1) return a.localeCompare(b);
        if (ia === -1) return 1;
        if (ib === -1) return -1;
        return ia - ib;
    }).map(function (key) {
        return { title: drawingGroupTitle(key), items: groups[key] };
    });
}

function pictureCard(path) {
    return '<div class="gallery-item"><div class="media-frame"><img src="' + path + '" alt="' + fileCaption(path) + '" class="zoomable"></div><p>' + fileCaption(path) + '</p></div>';
}

function partSlides(part) {
    var slides = [{
        src: part.picture,
        caption: part.title,
        kind: 'Part'
    }];
    (part.drawings || []).forEach(function (path) {
        slides.push({
            src: path,
            caption: modelViewCaption(part.title, path),
            kind: 'Drawing'
        });
    });
    return slides;
}

function partsViewerHtml(section) {
    var parts = section.parts || [];
    var picker = parts.map(function (part, index) {
        return '<button type="button" class="gallery-item part-pick' + (index === 0 ? ' active' : '') + '" data-part="' + index + '">' +
            '<div class="media-frame media-frame-drawing"><img src="' + part.picture + '" alt="' + part.title + '"></div>' +
            '<p>' + part.title + '</p>' +
            '</button>';
    }).join('');
    return '<div class="part-viewer">' +
        '<div class="gallery-grid parts-grid">' + picker + '</div>' +
        '<div class="part-showcase">' +
            '<button type="button" class="part-nav part-nav-prev" aria-label="Previous">‹</button>' +
            '<div class="part-frame media-frame"><img class="zoomable" alt=""></div>' +
            '<button type="button" class="part-nav part-nav-next" aria-label="Next">›</button>' +
        '</div>' +
        '<p class="part-kind"></p>' +
        '<p class="part-caption"></p>' +
        '<p class="part-counter"></p>' +
        '</div>';
}

function setupPartViewer(root, parts) {
    if (!root || !parts || !parts.length) return;
    var partIndex = 0;
    var slideIndex = 0;
    var img = root.querySelector('.part-frame img');
    var frame = root.querySelector('.part-frame');
    var kind = root.querySelector('.part-kind');
    var caption = root.querySelector('.part-caption');
    var counter = root.querySelector('.part-counter');
    var prev = root.querySelector('.part-nav-prev');
    var next = root.querySelector('.part-nav-next');
    var picks = root.querySelectorAll('.part-pick');

    function show() {
        var slides = partSlides(parts[partIndex]);
        if (slideIndex < 0) slideIndex = slides.length - 1;
        if (slideIndex >= slides.length) slideIndex = 0;
        var item = slides[slideIndex];
        img.src = item.src;
        img.alt = item.caption;
        frame.classList.add('media-frame-drawing');
        kind.textContent = item.kind;
        caption.textContent = item.caption;
        var many = slides.length > 1;
        counter.hidden = !many;
        counter.textContent = many ? ((slideIndex + 1) + ' / ' + slides.length) : '';
        prev.hidden = !many;
        next.hidden = !many;
        prev.disabled = !many;
        next.disabled = !many;
        root.classList.toggle('single-slide', !many);
        picks.forEach(function (btn, i) {
            btn.classList.toggle('active', i === partIndex);
        });
        root.getSlides = function () { return slides; };
        root.getSlideIndex = function () { return slideIndex; };
    }

    picks.forEach(function (btn) {
        btn.addEventListener('click', function () {
            partIndex = Number(btn.getAttribute('data-part'));
            slideIndex = 0;
            show();
        });
    });
    prev.addEventListener('click', function () {
        slideIndex -= 1;
        show();
    });
    next.addEventListener('click', function () {
        slideIndex += 1;
        show();
    });
    document.addEventListener('keydown', function (event) {
        if (document.getElementById('lightbox') && document.getElementById('lightbox').classList.contains('open')) return;
        var total = partSlides(parts[partIndex]).length;
        if (total < 2) return;
        if (event.key === 'ArrowLeft') {
            slideIndex -= 1;
            show();
        }
        if (event.key === 'ArrowRight') {
            slideIndex += 1;
            show();
        }
    });
    show();
}

function sectionDrawingGroups(section) {
    var drawingGroups = section.drawingGroups;
    if (!drawingGroups || !drawingGroups.length) {
        drawingGroups = groupDrawings(section.drawings);
    }
    return (drawingGroups || []).filter(function (group) {
        return group.items && group.items.length;
    });
}

function drawingPreviewCard(group, index) {
    var count = group.items.length;
    return '<button type="button" class="gallery-item part-pick drawing-pick' + (index === 0 ? ' active' : '') + '" data-drawing-group="' + index + '">' +
        '<div class="media-frame media-frame-drawing"><img src="' + group.items[0] + '" alt="' + group.title + '"></div>' +
        '<p>' + group.title + '</p>' +
        '<p class="count-meta">' + count + (count === 1 ? ' drawing' : ' drawings') + '</p>' +
        '</button>';
}

function drawingsViewerHtml(groups) {
    var picker = groups.map(drawingPreviewCard).join('');
    return '<div class="part-viewer drawing-viewer">' +
        '<div class="gallery-grid parts-grid">' + picker + '</div>' +
        '<div class="part-showcase">' +
            '<button type="button" class="part-nav drawing-nav-prev" aria-label="Previous">‹</button>' +
            '<div class="part-frame media-frame"><img class="zoomable" alt=""></div>' +
            '<button type="button" class="part-nav drawing-nav-next" aria-label="Next">›</button>' +
        '</div>' +
        '<p class="part-kind">Drawing</p>' +
        '<p class="part-caption"></p>' +
        '<p class="part-counter"></p>' +
        '</div>';
}

function drawingSlides(group) {
    return (group.items || []).map(function (path) {
        return { src: path, caption: modelViewCaption(group.title, path) };
    });
}

function cardSummary(project) {
    if (Array.isArray(project.summary)) return project.summary[0] || '';
    return project.summary || '';
}

function cardHtml(project, compact) {
    var firstSection = (project.sections && project.sections[0]) ? project.sections[0].id : 'overview';
    var subtitle = compact ? (project.homeLabel || project.category || '') : (project.pageTitle || project.category || '');
    var summary = compact ? '' : cardSummary(project);
    return '<article class="card">' +
        '<a class="card-link" href="project.html?slug=' + encodeURIComponent(project.slug) + '#' + firstSection + '">' +
        coverHtml(project, true) +
        '<div class="card-body">' +
        '<p class="project-index">' + numberedTitle(project) + '</p>' +
        '<h2>' + subtitle + '</h2>' +
        (summary ? '<p class="card-summary">' + summary + '</p>' : '') +
        '</div></a></article>';
}

function queryValue(name) {
    var params = new URLSearchParams(window.location.search);
    return (params.get(name) || '').trim();
}

function renderNav(activeTab) {
    var nav = document.getElementById('site-nav');
    if (!nav) return;
    nav.innerHTML = TABS.map(function (tab, index) {
        var href = 'index.html' + (tab.id === 'home' ? '' : '?tab=' + tab.id);
        var cls = tab.id === activeTab ? 'tab active' : 'tab';
        var link = '<a class="' + cls + '" href="' + href + '">' + tab.label + '</a>';
        if (index === TABS.length - 1) return link;
        return link + '<span class="nav-dot" aria-hidden="true">·</span>';
    }).join('');
}

function tabTitle(page) {
    var titles = CADDEX.titles || {};
    if (page && titles[page]) return titles[page];
    return titles.home || 'Nadine Grace Sibonga | CADDex — CAD Modeling Portfolio';
}

function projectTabTitle(project) {
    if (project.tabTitle) return project.tabTitle;
    if (project.homeLabel) return project.name + ' — ' + project.homeLabel + ' | CADDex';
    return project.name + ' | CADDex';
}

function renderFooter() {
    var footer = document.getElementById('site-footer');
    if (!footer) return;
    footer.innerHTML = '<p>Nadine Grace Sibonga | CADDex — CAD Modeling Portfolio</p>';
}

function hidePanels() {
    ['home-panel', 'about-panel', 'projects-panel', 'skills-panel', 'contact-panel'].forEach(function (id) {
        var panel = document.getElementById(id);
        if (panel) panel.hidden = true;
    });
}

function renderHomepage() {
    var tab = (queryValue('tab') || 'home').toLowerCase();
    if (!TABS.some(function (item) { return item.id === tab; })) tab = 'home';
    renderNav(tab);
    renderFooter();
    hidePanels();

    if (tab === 'about') {
        document.title = tabTitle('about');
        document.getElementById('about-panel').hidden = false;
        renderAbout();
        return;
    }
    if (tab === 'projects') {
        document.title = tabTitle('projects');
        document.getElementById('projects-panel').hidden = false;
        renderProjects();
        return;
    }
    if (tab === 'skills') {
        document.title = tabTitle('skills');
        document.getElementById('skills-panel').hidden = false;
        renderSkills();
        return;
    }
    if (tab === 'contact') {
        document.title = tabTitle('contact');
        document.getElementById('contact-panel').hidden = false;
        renderContact();
        return;
    }

    document.title = tabTitle('home');
    document.getElementById('home-panel').hidden = false;
    renderHome();
}

function renderHome() {
    var featured = CADDEX.projects.filter(function (p) { return p.featured; });
    document.getElementById('home-intro').innerHTML = paragraphsHtml((CADDEX.home && CADDEX.home.intro) || []);
    document.getElementById('featured-grid').innerHTML = featured.map(function (project) {
        return cardHtml(project, true);
    }).join('');
}

function renderAbout() {
    var profile = CADDEX.profile || {};
    var about = CADDEX.about || {};
    var wrap = document.getElementById('about-photo-wrap');
    var frame = wrap ? wrap.querySelector('.photo-frame') : null;
    var img = document.getElementById('about-photo');

    document.getElementById('about-greeting').textContent = profile.greeting || profile.name || '';
    document.getElementById('about-role').textContent = profile.role || '';
    document.getElementById('about-me').innerHTML = paragraphsHtml(about.me);
    document.getElementById('about-why').innerHTML = paragraphsHtml(about.whyCad);
    document.getElementById('about-focus-label').textContent = about.whyCadFocusLabel || '';
    document.getElementById('about-focus').innerHTML = (about.whyCadFocus || []).map(function (item) {
        return '<li>' + item + '</li>';
    }).join('');
    document.getElementById('about-objects-kicker').textContent = about.fromObjectsKicker || '';
    document.getElementById('about-objects-title').textContent = about.fromObjectsTitle || 'Turning a Real Object into a CAD Model';
    document.getElementById('about-objects').innerHTML = paragraphsHtml(about.fromObjects);
    document.getElementById('about-approach-title').textContent = about.approachTitle || 'Project Approach';
    document.getElementById('about-approach').innerHTML = (about.approach || []).map(function (step) {
        return '<li>' + step + '</li>';
    }).join('');
    document.getElementById('about-working-title').textContent = about.workingTowardTitle || "What I'm Working Toward";
    document.getElementById('about-working').innerHTML = paragraphsHtml(about.workingToward);
    document.getElementById('about-cta-title').textContent = about.ctaTitle || 'Interested in my work?';
    document.getElementById('about-cta-projects').textContent = about.ctaProjects || 'View My Projects';
    document.getElementById('about-cta-contact').textContent = about.ctaContact || 'Get In Touch';

    function hidePhoto() {
        if (wrap) wrap.hidden = true;
    }

    function showPhoto() {
        if (wrap) wrap.hidden = false;
    }

    if (!profile.photo) {
        hidePhoto();
        return;
    }
    img.alt = profile.name || 'Profile photo';
    img.onerror = hidePhoto;
    img.onload = showPhoto;
    img.src = profile.photo;
}

function renderProjects() {
    document.getElementById('project-grid').innerHTML = CADDEX.projects.map(function (project) {
        return cardHtml(project, false);
    }).join('');
}

function renderSkills() {
    var box = document.getElementById('skills-groups');
    if (!box) return;
    box.innerHTML = (CADDEX.skills || []).map(function (group) {
        var html = '<section class="skill-group"><h3>' + group.title + '</h3>';
        if (group.groups) {
            html += group.groups.map(function (nested) {
                var items = (nested.items || []).map(function (skill) {
                    return '<li>' + skill + '</li>';
                }).join('');
                return '<div class="skill-subgroup"><h4>' + nested.title + '</h4><ul>' + items + '</ul></div>';
            }).join('');
        } else {
            html += '<ul>' + (group.items || []).map(function (skill) {
                return '<li>' + skill + '</li>';
            }).join('') + '</ul>';
        }
        return html + '</section>';
    }).join('');
}

function renderContact() {
    var profile = CADDEX.profile || {};
    var contact = CADDEX.contact || {};
    var heading = document.getElementById('contact-heading');
    if (heading) heading.textContent = contact.heading || 'Contact';
    document.getElementById('contact-intro').innerHTML = paragraphsHtml(contact.intro);

    var formWrap = document.getElementById('contact-form-wrap');
    var form = document.getElementById('contact-form');
    var note = document.getElementById('contact-form-note');
    var endpoint = (profile.formEndpoint || '').trim();
    if (formWrap) formWrap.hidden = false;
    if (!form) return;

    form.onsubmit = function (event) {
        event.preventDefault();
        if (document.getElementById('contact-gotcha') && document.getElementById('contact-gotcha').value) {
            return;
        }
        if (!endpoint) {
            if (note) note.textContent = 'The form is not connected yet.';
            return;
        }
        var name = document.getElementById('contact-name').value.trim();
        var from = document.getElementById('contact-email').value.trim();
        var message = document.getElementById('contact-message').value.trim();
        var body = new FormData();
        body.append('name', name);
        body.append('email', from);
        body.append('message', message);
        body.append('_subject', 'CADDex message from ' + (name || 'website visitor'));
        fetch(endpoint, {
            method: 'POST',
            body: body,
            headers: { Accept: 'application/json' }
        }).then(function (response) {
            if (!response.ok) throw new Error('Send failed');
            form.reset();
            if (note) note.textContent = 'Message sent. Thank you.';
        }).catch(function () {
            if (note) note.textContent = 'The message could not be sent. Please try again later.';
        });
    };
}

function sectionHasContent(section) {
    if (section.parts && section.parts.length) return true;
    if (section.pictures && section.pictures.length) return true;
    if (sectionDrawingGroups(section).length) return true;
    if (youtubeEmbeds(section.videos).length) return true;
    return false;
}

function mediaHtml(section) {
    var html = '';
    if (section.parts && section.parts.length) {
        html += partsViewerHtml(section);
    }
    if (section.pictures && section.pictures.length) {
        html += '<div class="gallery-grid">' + section.pictures.map(pictureCard).join('') + '</div>';
    }
    var drawingGroups = sectionDrawingGroups(section);
    if (drawingGroups.length) {
        html += drawingsViewerHtml(drawingGroups);
    }
    var clips = youtubeEmbeds(section.videos);
    if (clips.length) {
        html += videoViewerHtml(clips);
    }
    return html;
}

function videoViewerHtml(clips) {
    var first = clips[0];
    var picker = clips.map(function (clip, index) {
        return '<button type="button" class="gallery-item video-pick' + (index === 0 ? ' active' : '') + '" data-video="' + index + '">' +
            '<div class="media-frame media-frame-video"><img src="' + clip.thumbUrl + '" alt=""></div>' +
            '<p>' + clip.caption + '</p>' +
            '</button>';
    }).join('');
    return '<div class="video-viewer">' +
        '<div class="video-showcase">' +
            '<button type="button" class="part-nav video-nav-prev" aria-label="Previous">‹</button>' +
            '<div class="media-frame media-frame-video video-stage"><div class="youtube-wrap"><iframe src="' + first.embedUrl + '" title="' + first.caption.replace(/"/g, '&quot;') + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div></div>' +
            '<button type="button" class="part-nav video-nav-next" aria-label="Next">›</button>' +
        '</div>' +
        '<p class="part-caption">' + first.caption + '</p>' +
        '<p class="part-counter">1 / ' + clips.length + '</p>' +
        (clips.length > 1 ? '<div class="gallery-grid parts-grid video-picks">' + picker + '</div>' : '') +
        '</div>';
}

function renderProject() {
    var slug = queryValue('slug');
    var project = CADDEX.projects.filter(function (item) { return item.slug === slug; })[0];
    if (!project) {
        window.location.href = 'index.html?tab=projects';
        return;
    }

    renderNav('projects');
    renderFooter();
    document.title = projectTabTitle(project);

    var coverBox = document.getElementById('project-cover');
    coverBox.innerHTML = coverHtml(project, false);
    coverBox.hidden = !coverBox.innerHTML;
    document.getElementById('project-number').textContent = numberedTitle(project);
    document.getElementById('project-name').textContent = project.pageTitle || project.name;
    document.getElementById('project-software').textContent = project.software;
    document.getElementById('project-summary').innerHTML = textHtml(project.summary);

    var sections = (project.sections || []).filter(sectionHasContent);
    var contentsTitle = document.getElementById('project-contents-title');
    var subnav = document.getElementById('project-subnav');
    if (contentsTitle) contentsTitle.hidden = !sections.length;
    if (subnav) {
        subnav.hidden = !sections.length;
        subnav.innerHTML = sections.map(function (section) {
            return '<a class="filter-chip" href="#' + section.id + '">' + section.title + '</a>';
        }).join('');
    }

    document.getElementById('project-sections').innerHTML = sections.map(function (section) {
        var help = section.text ? '<div class="media-help">' + textHtml(section.text) + '</div>' : '';
        return '<section class="media-section" id="' + section.id + '">' +
            '<h2>' + section.title + '</h2>' +
            help +
            mediaHtml(section) +
            '</section>';
    }).join('');

    var skillsBlock = document.getElementById('project-skills-block');
    var skillsBox = document.getElementById('project-skills');
    if (skillsBlock && skillsBox && project.skillsDemonstrated && project.skillsDemonstrated.length) {
        skillsBlock.hidden = false;
        skillsBox.innerHTML = project.skillsDemonstrated.map(function (skill) {
            return '<span class="skill-chip">' + skill + '</span>';
        }).join('');
    } else if (skillsBlock) {
        skillsBlock.hidden = true;
    }

    var coverImg = document.querySelector('#project-cover img');
    if (coverImg && project.cover) coverImg.classList.add('zoomable');

    sections.forEach(function (section) {
        if (section.parts && section.parts.length) {
            var viewer = document.querySelector('#' + section.id + ' .part-viewer');
            setupPartViewer(viewer, section.parts);
        }
        var groups = sectionDrawingGroups(section);
        if (groups.length) {
            setupDrawingViewer(document.querySelector('#' + section.id + ' .drawing-viewer'), groups);
        }
        if (youtubeEmbeds(section.videos).length) {
            setupVideoViewer(document.querySelector('#' + section.id + ' .video-viewer'), youtubeEmbeds(section.videos));
        }
    });
    setupLightbox();
}

function setupVideoViewer(root, clips) {
    if (!root || !clips || !clips.length) return;
    var index = 0;
    var frame = root.querySelector('.video-stage iframe');
    var caption = root.querySelector('.part-caption');
    var counter = root.querySelector('.part-counter');
    var prev = root.querySelector('.video-nav-prev');
    var next = root.querySelector('.video-nav-next');
    var picks = root.querySelectorAll('.video-pick');

    function show() {
        if (index < 0) index = clips.length - 1;
        if (index >= clips.length) index = 0;
        var clip = clips[index];
        frame.src = clip.embedUrl;
        frame.title = clip.caption;
        if (caption) caption.textContent = clip.caption;
        if (counter) counter.textContent = (index + 1) + ' / ' + clips.length;
        picks.forEach(function (btn, i) {
            btn.classList.toggle('active', i === index);
        });
        var many = clips.length > 1;
        if (prev) prev.disabled = !many;
        if (next) next.disabled = !many;
    }

    if (prev) prev.addEventListener('click', function () {
        index -= 1;
        show();
    });
    if (next) next.addEventListener('click', function () {
        index += 1;
        show();
    });
    picks.forEach(function (btn) {
        btn.addEventListener('click', function () {
            index = Number(btn.getAttribute('data-video'));
            show();
        });
    });
    show();
}

function setupDrawingViewer(root, groups) {
    if (!root || !groups || !groups.length) return;
    var groupIndex = 0;
    var slideIndex = 0;
    var img = root.querySelector('.part-frame img');
    var frame = root.querySelector('.part-frame');
    var caption = root.querySelector('.part-caption');
    var counter = root.querySelector('.part-counter');
    var prev = root.querySelector('.drawing-nav-prev');
    var next = root.querySelector('.drawing-nav-next');
    var picks = root.querySelectorAll('.drawing-pick');

    function show() {
        var slides = drawingSlides(groups[groupIndex]);
        if (!slides.length) return;
        if (slideIndex < 0) slideIndex = slides.length - 1;
        if (slideIndex >= slides.length) slideIndex = 0;
        var item = slides[slideIndex];
        img.src = item.src;
        img.alt = item.caption;
        frame.classList.add('media-frame-drawing');
        caption.textContent = item.caption;
        var many = slides.length > 1;
        counter.hidden = !many;
        counter.textContent = many ? ((slideIndex + 1) + ' / ' + slides.length) : '';
        prev.hidden = !many;
        next.hidden = !many;
        prev.disabled = !many;
        next.disabled = !many;
        root.classList.toggle('single-slide', !many);
        picks.forEach(function (btn, i) {
            btn.classList.toggle('active', i === groupIndex);
        });
        root.getSlides = function () { return slides; };
        root.getSlideIndex = function () { return slideIndex; };
    }

    picks.forEach(function (btn) {
        btn.addEventListener('click', function () {
            groupIndex = Number(btn.getAttribute('data-drawing-group'));
            slideIndex = 0;
            show();
        });
    });
    prev.addEventListener('click', function () {
        slideIndex -= 1;
        show();
    });
    next.addEventListener('click', function () {
        slideIndex += 1;
        show();
    });
    show();
}

function setupLightbox() {
    var lightbox = document.getElementById('lightbox');
    var lightboxImage = document.getElementById('lightbox-image');
    var caption = document.getElementById('lightbox-caption');
    var prev = document.getElementById('lightbox-prev');
    var next = document.getElementById('lightbox-next');
    if (!lightbox || !lightboxImage) return;

    var slides = [];
    var index = 0;

    function showSlide() {
        if (!slides.length) return;
        lightboxImage.src = slides[index].src;
        lightboxImage.alt = slides[index].caption || '';
        if (caption) caption.textContent = slides[index].caption || '';
        var many = slides.length > 1;
        if (prev) prev.hidden = !many;
        if (next) next.hidden = !many;
    }

    function openFrom(img) {
        var viewer = img.closest('.part-viewer');
        if (viewer && typeof viewer.getSlides === 'function') {
            slides = viewer.getSlides().map(function (item) {
                return { src: item.src, caption: item.caption };
            });
            index = typeof viewer.getSlideIndex === 'function' ? viewer.getSlideIndex() : 0;
        } else {
            var group = img.closest('.gallery-grid, .gallery-group, #project-cover');
            var images = group ? group.querySelectorAll('img.zoomable') : [img];
            slides = Array.prototype.map.call(images, function (item) {
                return { src: item.src, caption: item.alt || '' };
            });
            index = Math.max(0, Array.prototype.indexOf.call(images, img));
        }
        showSlide();
        lightbox.classList.add('open');
    }

    window.openCaddexLightbox = function (slideList, start) {
        slides = slideList || [];
        index = start || 0;
        showSlide();
        lightbox.classList.add('open');
    };

    document.querySelectorAll('.zoomable').forEach(function (img) {
        img.addEventListener('click', function (event) {
            event.stopPropagation();
            openFrom(img);
        });
    });
    if (prev) {
        prev.addEventListener('click', function (event) {
            event.stopPropagation();
            index = (index - 1 + slides.length) % slides.length;
            showSlide();
        });
    }
    if (next) {
        next.addEventListener('click', function (event) {
            event.stopPropagation();
            index = (index + 1) % slides.length;
            showSlide();
        });
    }
    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox || event.target.classList.contains('lightbox-close')) {
            lightbox.classList.remove('open');
            lightboxImage.src = '';
        }
    });
    document.addEventListener('keydown', function (event) {
        if (!lightbox.classList.contains('open')) return;
        if (event.key === 'Escape') {
            lightbox.classList.remove('open');
            lightboxImage.src = '';
        }
        if (slides.length < 2) return;
        if (event.key === 'ArrowLeft') {
            index = (index - 1 + slides.length) % slides.length;
            showSlide();
        }
        if (event.key === 'ArrowRight') {
            index = (index + 1) % slides.length;
            showSlide();
        }
    });
}

function setupBackToTop() {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    button.textContent = '↑';
    document.body.appendChild(button);

    function update() {
        button.classList.toggle('visible', window.scrollY > 400);
    }

    button.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', update, { passive: true });
    update();
}

document.addEventListener('DOMContentLoaded', function () {
    var page = document.body.getAttribute('data-page');
    if (page === 'home') renderHomepage();
    if (page === 'project') renderProject();
    setupBackToTop();
});
