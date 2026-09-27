/* Site copy, pictures, drawings, and YouTube URLs. */

window.CADDEX = {
    profile: {
        name: 'Nadine Grace Sibonga',
        greeting: "Hi, I'm Nadine Grace Sibonga.",
        role: 'Licensed Mechanical Engineer | CAD Enthusiast',
        photo: 'static/about/profile.jpg',
        formEndpoint: 'https://formspree.io/f/mjyvoyqw'
    },

    titles: {
        home: 'Nadine Grace Sibonga | CADDex — CAD Modeling Portfolio',
        about: 'About Nadine Grace Sibonga | CADDex',
        projects: 'CAD Projects | CADDex — Nadine Grace Sibonga',
        skills: 'CAD & Engineering Skills | CADDex',
        contact: 'Contact Nadine Grace Sibonga | CADDex'
    },

    home: {
        intro: [
            'Welcome to CADDex, the personal CAD portfolio of Nadine Grace Sibonga. The portfolio showcases projects in SOLIDWORKS and AutoCAD, ranging from 3D component and assembly modeling to 2D drafting, technical drawings, CAD documentation, and animations.'
        ]
    },

    about: {
        me: [
            'I am a Licensed Mechanical Engineer and a graduate of Technological Institute of the Philippines – Manila. During my undergraduate studies, I was a Megaworld Foundation Scholar, receiving support throughout my college years that helped me pursue and complete my Mechanical Engineering education. The experience became an important part of my academic journey and gave me an early connection to Megaworld Corporation.',
            'My interest in CAD began during my engineering studies, where I developed experience creating 3D parts, assemblies, and technical drawings using SOLIDWORKS.',
            'After graduating, I began my professional career as a Building Technical Auditor at Megaworld Corporation. My role involved conducting technical inspections and audits across various Megaworld properties in different parts of the country, preparing technical documentation and reports, ensuring compliance, and coordinating with different teams. Working across multiple locations and collaborating with various teams strengthened my attention to detail, organization, communication, and ability to approach technical work systematically.',
            'I later transitioned into independent financial advisory, where I developed additional experience in communication, relationship management, organization, and working independently.',
            'Today, I am focusing on further developing my SOLIDWORKS and CAD skills through self-directed projects and hands-on practice. I am pursuing opportunities where I can apply my engineering background and growing CAD skills in a CAD-focused role, particularly in remote work environments.'
        ],
        whyCad: [
            'My interest in CAD developed during my Mechanical Engineering studies, particularly through hands-on work with SOLIDWORKS. I enjoy the process of taking an object or concept, breaking it down into individual components, modeling those components, and bringing them together into a complete assembly.',
            'As I continue developing my skills, I have also expanded my experience into AutoCAD for 2D drafting, drawing layouts, elevations, annotations, and CAD documentation.',
            'I created CADDex as a way to document my CAD projects, continue developing my skills, and showcase my progress.'
        ],
        whyCadFocusLabel: 'My current focus includes:',
        whyCadFocus: [
            '3D Part Modeling',
            'Assembly Modeling',
            'Assembly Mates',
            'Technical Drawings',
            '2D CAD Drafting',
            'CAD Documentation',
            'Component Modeling',
            'Exploded/Collapse Animations'
        ],
        fromObjectsKicker: 'From Real Objects to CAD',
        fromObjectsTitle: 'Turning a Real Object into a CAD Model',
        fromObjects: [
            'Some of my projects begin with objects that already exist in the real world.',
            'My 4-Door Cabinet project was based on a cabinet I have at home. I took measurements from the physical cabinet and recreated its components in SOLIDWORKS.',
            'The model includes the cabinet structure, four doors, four drawers, eight handles, eight hinges, and other supporting components.',
            'The project allowed me to practice translating a physical object into a structured digital CAD model—from measuring and modeling individual components to assembling them and producing technical drawings and animation.'
        ],
        approachTitle: 'Project Approach',
        approach: [
            'Physical Object',
            'Measurements',
            'Individual Parts',
            'Assembly',
            'Technical Drawings',
            'Animation'
        ],
        workingTowardTitle: "What I'm Working Toward",
        workingToward: [
            'I am continuing to develop my SOLIDWORKS and CAD skills through personal projects and hands-on practice.',
            'My goal is to build on my engineering background and technical experience while growing into CAD-focused work involving 3D modeling, assemblies, technical drawings, drafting, and related engineering support.'
        ],
        ctaTitle: 'Interested in my work?',
        ctaProjects: 'View My Projects',
        ctaContact: 'Get In Touch'
    },

    skills: [
        {
            title: 'CAD & Design',
            groups: [
                {
                    title: 'SOLIDWORKS',
                    items: [
                        '3D Part Modeling',
                        'Assembly Modeling',
                        'Assembly Mates',
                        'Component Modeling',
                        'Technical Drawings',
                        'Exploded/Collapse Animations',
                        'Parametric Modeling'
                    ]
                },
                {
                    title: 'AutoCAD',
                    items: [
                        '2D/3D CAD',
                        'Technical Drafting',
                        'Floor Plan & Elevation Drafting',
                        'CAD Blocks',
                        'Layer Organization',
                        'Construction Lines',
                        'Dimensioning & Annotation',
                        'Drawing Layouts & PDF Output'
                    ]
                }
            ]
        },
        {
            title: 'Engineering & Technical',
            items: [
                'Technical Documentation',
                'Inspection & Auditing',
                'Compliance Documentation',
                'Technical Reporting',
                'Measurement & Observation',
                'Engineering Fundamentals'
            ]
        },
        {
            title: 'Professional',
            items: [
                'Documentation & Organization',
                'Coordination',
                'Communication',
                'Attention to Detail',
                'Problem Solving',
                'Client Relations'
            ]
        }
    ],

    contact: {
        heading: "Let's Connect",
        intro: [
            "Interested in my work or have an opportunity you'd like to discuss?",
            'I am open to opportunities involving CAD, SOLIDWORKS, technical drafting, engineering support, and related remote roles.',
            'Use the form below to get in touch. Personal contact details are not listed on this site.'
        ]
    },

    projects: [
        {
            name: 'Hinge',
            slug: 'hinge',
            number: '01',
            homeLabel: 'Mechanical Component Modeling',
            pageTitle: 'Hinge Assembly',
            category: 'CAD Part & Assembly',
            software: 'SOLIDWORKS',
            year: '2026',
            featured: true,
            summary: 'A CAD modeling project focused on a typical hinge mechanism. Individual components were modeled in SOLIDWORKS and assembled using appropriate mates. The project includes technical drawings and a collapse animation demonstrating the relationship between the components.',
            cover: 'static/projects/hinge/covers/hinge.png',
            skillsDemonstrated: [
                'SOLIDWORKS',
                'Part Modeling',
                'Assembly',
                'Mates',
                'Technical Drawings',
                'CAD Animation'
            ],
            sections: [
                {
                    id: 'animation',
                    title: 'Assembly and Animation',
                    text: 'Use Next to move through each animation in the same player.',
                    videos: [
                        { url: 'https://youtu.be/T2Lyj7SmErE', caption: 'Hinge Assembly — Collapse Animation', cover: 'static/projects/hinge/covers/hinge.png' },
                        { url: 'https://youtu.be/WyfNacNfsy8', caption: 'Hinge Assembly — Rotation Animation', cover: 'static/projects/hinge/covers/hinge.png' }
                    ]
                },
                {
                    id: 'parts',
                    title: 'Parts',
                    text: 'Select a part to view the model, then use Next for its drawings.',
                    parts: [
                        {
                            title: 'Hinge',
                            picture: 'static/projects/hinge/covers/hinge.png',
                            drawings: [
                                'static/projects/hinge/drawings/drawing_hinge-front.png',
                                'static/projects/hinge/drawings/drawing_hinge-top.png'
                            ]
                        }
                    ]
                },
                {
                    id: 'drawing',
                    title: 'Drawings',
                    text: 'Click a drawing set to review it. Use Next to move through each view.',
                    drawingGroups: [
                        {
                            title: 'Hinge',
                            items: [
                                'static/projects/hinge/drawings/drawing_hinge-front.png',
                                'static/projects/hinge/drawings/drawing_hinge-top.png'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: '4-Door Cabinet',
            slug: 'cabinet',
            number: '02',
            homeLabel: 'Real-World CAD Recreation',
            pageTitle: '4-Door Cabinet — CAD Recreation',
            category: 'Real-World CAD Recreation',
            software: 'SOLIDWORKS',
            year: '2026',
            featured: true,
            summary: [
                'A detailed CAD recreation of a physical cabinet at home. The project began by taking measurements from the actual cabinet and translating its components into individual SOLIDWORKS models.',
                'The complete assembly consists of four doors, four drawers, eight handles, eight hinges, and other supporting components.',
                'The project demonstrates the process of converting a real-world object into a structured CAD assembly, including individual part modeling, assembly relationships, technical drawings, and collapse animation.'
            ],
            cover: 'static/projects/cabinet/covers/cabinet.png',
            skillsDemonstrated: [
                'SOLIDWORKS',
                'Part Modeling',
                'Assembly',
                'Mates',
                'Real-World CAD Recreation',
                'Component Modeling',
                'Technical Drawings',
                'CAD Animation'
            ],
            sections: [
                {
                    id: 'animation',
                    title: 'Assembly and Animation',
                    text: 'Use Next to move through each animation in the same player.',
                    videos: [
                        { url: 'https://youtu.be/1JY37y2zL-s', caption: 'Cabinet Assembly — Closed Configuration', cover: 'static/projects/cabinet/covers/cabinet.png' },
                        { url: 'https://youtu.be/7xdO7dpRmZE', caption: 'Cabinet Assembly — Open Configuration', cover: 'static/projects/cabinet/covers/cabinet-open.png' },
                        { url: 'https://youtu.be/y9y-pi3Eb_Q', caption: 'Cabinet Frame — Rotation Animation', cover: 'static/projects/cabinet/covers/cabinet-frame.png' },
                        { url: 'https://youtu.be/PvJDUhJuufw', caption: 'Cabinet Door Assembly — Collapse & Rotation', cover: 'static/projects/cabinet/covers/cabinet-door.png' },
                        { url: 'https://youtu.be/vaJnySxXrsA', caption: 'Cabinet Drawer Assembly — Collapse & Rotation', cover: 'static/projects/cabinet/covers/drawer.png' }
                    ]
                },
                {
                    id: 'parts',
                    title: 'Parts',
                    text: 'Select a part to view the model, then use Next for its drawings.',
                    parts: [
                        {
                            title: 'Cabinet Handle',
                            picture: 'static/projects/cabinet/covers/cabinet-handle.png',
                            drawings: [
                                'static/projects/cabinet/drawings/drawing_handle-front.png',
                                'static/projects/cabinet/drawings/drawing_handle-right.png'
                            ]
                        },
                        {
                            title: 'Cabinet Drawer',
                            picture: 'static/projects/cabinet/covers/drawer.png',
                            drawings: [
                                'static/projects/cabinet/drawings/drawing_drawer-1-front.png',
                                'static/projects/cabinet/drawings/drawing_drawer-1-right.png',
                                'static/projects/cabinet/drawings/drawing_drawer-1-top.png',
                                'static/projects/cabinet/drawings/drawing_drawer-2-front.png',
                                'static/projects/cabinet/drawings/drawing_drawer-2-right.png',
                                'static/projects/cabinet/drawings/drawing_drawer-2-top.png'
                            ]
                        },
                        {
                            title: 'Cabinet Door',
                            picture: 'static/projects/cabinet/covers/cabinet-door.png',
                            drawings: [
                                'static/projects/cabinet/drawings/drawing_door-1.png',
                                'static/projects/cabinet/drawings/drawing_door-2.png'
                            ]
                        },
                        {
                            title: 'Cabinet Frame',
                            picture: 'static/projects/cabinet/covers/cabinet-frame.png',
                            drawings: [
                                'static/projects/cabinet/drawings/drawing_frame-front.png',
                                'static/projects/cabinet/drawings/drawing_frame-bottom.png'
                            ]
                        },
                        {
                            title: 'Whole Cabinet',
                            picture: 'static/projects/cabinet/covers/cabinet.png',
                            drawings: [
                                'static/projects/cabinet/drawings/drawing_cabinet-front.png',
                                'static/projects/cabinet/drawings/drawing_cabinet-bottom.png'
                            ]
                        }
                    ]
                },
                {
                    id: 'drawing',
                    title: 'Drawings',
                    text: 'Click a drawing set to review it. Use Next to move through each view.',
                    drawingGroups: [
                        {
                            title: 'Cabinet Handle',
                            items: [
                                'static/projects/cabinet/drawings/drawing_handle-front.png',
                                'static/projects/cabinet/drawings/drawing_handle-right.png'
                            ]
                        },
                        {
                            title: 'Cabinet Drawer',
                            items: [
                                'static/projects/cabinet/drawings/drawing_drawer-1-front.png',
                                'static/projects/cabinet/drawings/drawing_drawer-1-right.png',
                                'static/projects/cabinet/drawings/drawing_drawer-1-top.png',
                                'static/projects/cabinet/drawings/drawing_drawer-2-front.png',
                                'static/projects/cabinet/drawings/drawing_drawer-2-right.png',
                                'static/projects/cabinet/drawings/drawing_drawer-2-top.png'
                            ]
                        },
                        {
                            title: 'Cabinet Door',
                            items: [
                                'static/projects/cabinet/drawings/drawing_door-1.png',
                                'static/projects/cabinet/drawings/drawing_door-2.png'
                            ]
                        },
                        {
                            title: 'Cabinet Frame',
                            items: [
                                'static/projects/cabinet/drawings/drawing_frame-front.png',
                                'static/projects/cabinet/drawings/drawing_frame-bottom.png'
                            ]
                        },
                        {
                            title: 'Whole Cabinet',
                            items: [
                                'static/projects/cabinet/drawings/drawing_cabinet-front.png',
                                'static/projects/cabinet/drawings/drawing_cabinet-bottom.png'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: 'Conveyor',
            slug: 'conveyor',
            number: '03',
            homeLabel: 'Mechanical Assembly Modeling',
            pageTitle: 'Conveyor Assembly',
            category: 'CAD Assembly',
            software: 'SOLIDWORKS',
            year: '2026',
            featured: true,
            summary: 'A SOLIDWORKS CAD modeling project featuring a conveyor assembly consisting of a structural frame, rolling pin, and belt. The project focuses on individual part modeling, assembly integration, technical drawings, and assembly animation.',
            cover: 'static/projects/conveyor/covers/conveyor-final.png',
            skillsDemonstrated: [
                'SOLIDWORKS',
                'Part Modeling',
                'Assembly',
                'Mates',
                'Technical Drawings',
                'CAD Animation'
            ],
            sections: [
                {
                    id: 'animation',
                    title: 'Assembly and Animation',
                    text: 'Use Next to move through each animation in the same player.',
                    videos: [
                        { url: 'https://youtu.be/YhO4_KThREE', caption: 'Conveyor Assembly — Movement Animation', cover: 'static/projects/conveyor/covers/conveyor-final.png' },
                        { url: 'https://youtu.be/Pj8hOn9B9GI', caption: 'Conveyor Frame & Pin — Collapse Animation', cover: 'static/projects/conveyor/covers/conveyor-frame-pin.png' },
                        { url: 'https://youtu.be/QYvWG1DBnTE', caption: 'Conveyor Roller Pin — Rotation Animation', cover: 'static/projects/conveyor/covers/conveyor-pin.png' }
                    ]
                },
                {
                    id: 'parts',
                    title: 'Parts',
                    text: 'Select a part to view the model, then use Next for its drawings.',
                    parts: [
                        {
                            title: 'Roller Pin',
                            picture: 'static/projects/conveyor/covers/conveyor-pin.png',
                            drawings: []
                        },
                        {
                            title: 'Conveyor Frame',
                            picture: 'static/projects/conveyor/covers/conveyor-frame.png',
                            drawings: []
                        },
                        {
                            title: 'Frame & Pin',
                            picture: 'static/projects/conveyor/covers/conveyor-frame-pin.png',
                            drawings: []
                        },
                        {
                            title: 'Conveyor Assembly',
                            picture: 'static/projects/conveyor/covers/conveyor-final.png',
                            drawings: [
                                'static/projects/conveyor/drawings/drawing_conveyor-right.png',
                                'static/projects/conveyor/drawings/drawing_conveyor-top.png'
                            ]
                        }
                    ]
                },
                {
                    id: 'drawing',
                    title: 'Drawings',
                    text: 'Click a drawing set to review it. Use Next to move through each view.',
                    drawingGroups: [
                        {
                            title: 'Conveyor Assembly',
                            items: [
                                'static/projects/conveyor/drawings/drawing_conveyor-right.png',
                                'static/projects/conveyor/drawings/drawing_conveyor-top.png'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: 'Residential Floor Plan',
            slug: 'floor-plan',
            number: '04',
            homeLabel: 'AutoCAD Drafting & Elevation',
            pageTitle: 'AutoCAD Drafting & Elevation',
            category: 'AutoCAD Drafting',
            software: 'AutoCAD',
            year: '2026',
            featured: true,
            listingSummary: 'An AutoCAD drafting project for a single-story residence. The work includes a dimensioned floor plan and front elevation, with modifications to the layout, dimensions, and elevation details. The project also demonstrates the use of CAD blocks, layers, construction lines, and drawing layouts.',
            summary: 'A 2D AutoCAD drafting project focused on creating and modifying a residential floor plan and front elevation. The project was developed using a SourceCAD practice drawing as a reference, with modifications made to the floor-plan layout and selected dimensions. The front elevation was also modified by changing the viewing orientation and architectural details. The project incorporates CAD blocks, organized layers, construction lines, dimensioning, annotations, and drawing layouts prepared for PDF output.',
            cover: 'static/projects/floor-plan/covers/floor-plan.png',
            skillsDemonstrated: [
                '2D AutoCAD Drafting',
                'Floor Plan Creation & Modification',
                'Elevation Drawing',
                'CAD Blocks',
                'Layer Organization',
                'Construction Lines',
                'Dimensioning',
                'Annotation',
                'Technical Drawing Layout',
                'CAD Documentation',
                'Drawing Organization'
            ],
            sections: [
                {
                    id: 'documentation',
                    title: 'Drafting & Documentation',
                    text: 'Use Next to move through each animation in the same player.',
                    videos: [
                        { url: 'https://youtu.be/pzf-nVp05cQ', caption: 'Floor Plan — Layout, Layers, & PDF Output', cover: 'static/projects/floor-plan/covers/floor-plan-layout.png' },
                        { url: 'https://youtu.be/SEJmHq8ePSk', caption: 'Floor Plan — Layer Organization', cover: 'static/projects/floor-plan/covers/floor-plan-layers.png' },
                        { url: 'https://youtu.be/QqNPOoNt3Is', caption: 'Front Elevation — Construction Lines', cover: 'static/projects/floor-plan/covers/front-elevation-construction.png' }
                    ]
                },
                {
                    id: 'floor-plan',
                    title: 'Floor Plan',
                    text: 'Click Floor Plan, then use Next to move through each view.',
                    parts: [
                        {
                            title: 'Floor Plan',
                            kind: 'View',
                            picture: 'static/projects/floor-plan/covers/floor-plan-no-dim.png',
                            slides: [
                                { src: 'static/projects/floor-plan/covers/floor-plan-no-dim.png', caption: 'Floor Plan · without dimensions', kind: 'View' },
                                { src: 'static/projects/floor-plan/covers/floor-plan-layers.png', caption: 'Floor Plan · with dimensions', kind: 'View' },
                                { src: 'static/projects/floor-plan/drawings/drawing_floor-plan-layout-no-dim.png', caption: 'Floor Plan Layout · without dimensions', kind: 'View' },
                                { src: 'static/projects/floor-plan/drawings/drawing_floor-plan-layout.png', caption: 'Floor Plan Layout · with dimensions', kind: 'View' }
                            ]
                        }
                    ]
                },
                {
                    id: 'elevation',
                    title: 'Elevation',
                    text: 'Click Front Elevation, then use Next to move through each view.',
                    parts: [
                        {
                            title: 'Front Elevation',
                            kind: 'View',
                            picture: 'static/projects/floor-plan/covers/elevation-no-dim.png',
                            slides: [
                                { src: 'static/projects/floor-plan/covers/elevation-no-dim.png', caption: 'Front Elevation · without dimensions', kind: 'View' },
                                { src: 'static/projects/floor-plan/covers/front-elevation-construction.png', caption: 'Front Elevation · construction lines', kind: 'View' },
                                { src: 'static/projects/floor-plan/drawings/drawing_elevation-layout-no-dim.png', caption: 'Front Elevation Layout · without dimensions', kind: 'View' },
                                { src: 'static/projects/floor-plan/drawings/drawing_elevation-layout-with-dim.png', caption: 'Front Elevation Layout · with dimensions', kind: 'View' }
                            ]
                        }
                    ]
                },
                {
                    id: 'layouts',
                    title: 'Drawing Layouts',
                    text: 'Click a layout, then use Next to move through each view.',
                    drawingGroups: [
                        {
                            title: 'Floor Plan Layout',
                            kind: 'Layout',
                            countLabel: 'view',
                            items: [
                                { src: 'static/projects/floor-plan/drawings/drawing_floor-plan-layout-no-dim.png', caption: 'Floor Plan Layout · without dimensions', kind: 'Layout' },
                                { src: 'static/projects/floor-plan/drawings/drawing_floor-plan-layout.png', caption: 'Floor Plan Layout · with dimensions', kind: 'Layout' }
                            ]
                        },
                        {
                            title: 'Front Elevation Layout',
                            kind: 'Layout',
                            countLabel: 'view',
                            items: [
                                { src: 'static/projects/floor-plan/drawings/drawing_elevation-layout-no-dim.png', caption: 'Front Elevation Layout · without dimensions', kind: 'Layout' },
                                { src: 'static/projects/floor-plan/drawings/drawing_elevation-layout-with-dim.png', caption: 'Front Elevation Layout · with dimensions', kind: 'Layout' }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
