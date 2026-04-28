// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/portfolio/";
    },
  },{id: "nav-projects",
          title: "projects",
          description: "Things I&#39;ve built -- from autonomous robots to AI music composers.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/portfolio/projects/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "My research publications in peer-reviewed conferences and journals.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/portfolio/publications/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "My education, professional experience, publications, skills, and certifications.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/portfolio/cv/";
          },
        },{id: "news-8th-place-nationally-in-dd-robocon-2024-out-of-120-teams-as-systems-programming-amp-amp-ce-division-lead-my-team-built-an-autonomous-robot-with-yolov5-perception-7k-labeled-images-ros2-based-ai-decision-engine-mecanum-drive-inverse-kinematics-and-can-bus-networking",
          title: '8th place nationally in DD ROBOCON 2024 out of 120+ teams. As Systems...',
          description: "",
          section: "News",},{id: "news-published-and-presented-emotion-detection-in-multimodal-communication-through-audio-visual-gesture-analysis-at-ieee-conecct-2024-iisc-bangalore-the-paper-describes-our-ecapa-tdnn-audio-model-97-accuracy-and-lstm-gesture-pipeline-fused-via-fuzzy-logic-87-robustness-research-conducted-at-samsung-r-amp-amp-d-institute",
          title: 'Published and presented “Emotion Detection in Multimodal Communication through Audio-Visual Gesture Analysis” at...',
          description: "",
          section: "News",},{id: "news-earned-oracle-cloud-infrastructure-2024-certified-foundations-associate-covering-oci-compute-networking-storage-identity-and-database-services",
          title: 'Earned Oracle Cloud Infrastructure 2024 Certified Foundations Associate – covering OCI compute, networking,...',
          description: "",
          section: "News",},{id: "news-top-30-out-of-260-innovations-at-the-northern-command-inno-yodha-competition-2025-26-led-an-8-member-team-to-design-and-field-test-a-semi-autonomous-ugv-for-anti-tank-mine-laying-in-collaboration-with-the-19-engineer-regiment-indian-army-field-tested-in-ladakh-rajasthan-and-punjab",
          title: 'Top 30 out of 260+ innovations at the Northern Command Inno Yodha Competition...',
          description: "",
          section: "News",},{id: "news-joined-optum-as-a-technology-development-program-associate-in-bangalore-working-on-healthcare-rules-engines-blaze-migration-pocs-and-enterprise-automation-using-react-spring-boot-kubernetes-and-terraform",
          title: 'Joined Optum as a Technology Development Program Associate in Bangalore. Working on healthcare...',
          description: "",
          section: "News",},{id: "news-joined-youkti-ai-as-ai-engineer-sep-2025-apr-2026-designed-and-deployed-multi-agent-llm-pipelines-parsing-microsoft-teams-messages-at-scale-on-aws-lambda-reducing-pipeline-latency-by-5-6s-under-strict-sla-constraints-extended-cdc-workflows-with-multimodal-image-ingestion-via-pinecone-and-s3",
          title: 'Joined Youkti AI as AI Engineer (Sep 2025 – Apr 2026). Designed and...',
          description: "",
          section: "News",},{id: "news-completed-ai-dojo-generative-ai-certification-from-optum-with-an-excellent-grade-covering-llm-fine-tuning-prompt-engineering-rag-architectures-and-enterprise-ai-deployment-patterns",
          title: 'Completed AI Dojo Generative AI Certification from Optum with an excellent grade, covering...',
          description: "",
          section: "News",},{id: "projects-eva-enhanced-visitor-assistant-robot",
          title: 'EVA - Enhanced Visitor Assistant Robot',
          description: "A fully autonomous campus robot combining ROS2, SLAM, LLM-powered conversation, face recognition, and an animatronic face for human-like interaction.",
          section: "Projects",handler: () => {
              window.location.href = "/portfolio/projects/eva_robot/";
            },},{id: "projects-llm-application-deployment-tool",
          title: 'LLM Application Deployment Tool',
          description: "An end-to-end scaffolding tool that auto-generates a polished interactive frontend for any LLM backend and deploys it as a live public web app via GitHub Pages.",
          section: "Projects",handler: () => {
              window.location.href = "/portfolio/projects/llm_deploy_tool/";
            },},{id: "projects-muse-ai-music-generation",
          title: 'Muse - AI Music Generation',
          description: "A three-model deep-learning pipeline (LSTM, VAE, GAN) trained on 100K+ MIDI files to compose original, genre-aware music from scratch.",
          section: "Projects",handler: () => {
              window.location.href = "/portfolio/projects/muse_music/";
            },},{id: "projects-notepro-adaptive-notes-generator",
          title: 'NotePro - Adaptive Notes Generator',
          description: "An end-to-end NLP pipeline that converts raw lecture audio into structured, hierarchical study notes using speech-to-text, NER, topic modeling, and BART summarization.",
          section: "Projects",handler: () => {
              window.location.href = "/portfolio/projects/notepro/";
            },},{id: "projects-dd-robocon-autonomous-competition-robots",
          title: 'DD ROBOCON - Autonomous Competition Robots',
          description: "Two years leading the Systems Programming division for India&#39;s premier robotics competition. 8th nationally in 2024, 11th in 2023.",
          section: "Projects",handler: () => {
              window.location.href = "/portfolio/projects/robocon/";
            },},{id: "projects-ugv-anti-tank-mine-laying-system",
          title: 'UGV Anti-Tank Mine Laying System',
          description: "A semi-autonomous Unmanned Ground Vehicle designed and field-tested in collaboration with the Indian Army for automated anti-tank mine laying operations. Top 30 out of 260+ innovations at Northern Command Inno Yodha 2025-26.",
          section: "Projects",handler: () => {
              window.location.href = "/portfolio/projects/ugv_mine_layer/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%64%70%33%33%32%31%31%32%30%33@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/dp291203", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/divya-aamuktha", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/portfolio/feed.xml", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
