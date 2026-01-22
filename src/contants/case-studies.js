import churassco_laptop from "@/assets/case-studies/churassco-laptop.webp";
import fabusiness_laptop from "@/assets/case-studies/fa-business-laptop.webp";
import royal_safari_laptop from "@/assets/case-studies/royal-safari-laptop.webp";
export const caseStudies = [
  {
    id: 1,
    slug: "churassco",
    banner: churassco_laptop,
    summary:
      "The project involved creating a dynamic online presence for Churrasco BD that reflects the restaurant's lively dining atmosphere and culinary heritage. The design strategy focused on utilizing sensory-driven visuals to create an immediate emotional connection with hungry potential customers. By blending rustic aesthetics with modern functionality, the website serves as a digital extension of the physical dining experience.",
    goal: "The primary goal was to increase table reservations and private event bookings by providing an enticing preview of the menu and venue. The design aimed to simplify the user journey from discovery to action, removing friction often found in restaurant websites. Ultimately, the website serves as a powerful marketing tool to drive foot traffic and grow the brand.",
    design_process: [
      {
        id: 1,
        name: "Understand",
        desc: "The design process focused on capturing the vibrant atmosphere of a Brazilian steakhouse to entice local diners and event planners. The team needed to convey the authenticity of the churrasco experience while highlighting the venue's suitability for large groups and special celebrations. Understanding that the target audience craves a visual feast, the strategy prioritized high-impact imagery and an energetic, warm digital tone.",
      },
      {
        id: 2,
        name: "Competitor Analysis",
        desc: "Analysis of local dining competitors revealed that many restaurant websites suffer from cluttered menus and difficult reservation systems. The team identified an opportunity to stand out by streamlining the user journey and placing visual appetites above technical details. This insight led to a layout that minimizes text blocks in favor of large photos and clear calls-to-action for bookings. ",
      },
      {
        id: 3,
        name: "Inspiration & Moodboard",
        desc: "The moodboard drew inspiration from the rustic warmth of Brazilian gaucho culture and the sizzling heat of open-flame cooking. A color palette of deep charcoal, flame oranges, and rich wood tones was selected to evoke the sensory experience of a barbecue. Typography choices balanced bold, impactful headlines with elegant scripts to reflect both the hearty food and the dining sophistication. ",
      },
      {
        id: 4,
        name: "Wireframe",
        desc: "The wireframe structure centered on a visual-first approach, placing a full-screen hero image at the top to immediately grab attention. Navigation was simplified to separate essential information like the menu and location from promotional content like events and catering. This skeletal layout ensured that users could easily find key information without being overwhelmed by the abundance of rich media. ",
      },

      {
        id: 5,
        name: "Final UI",
        desc: "The final interface delivers a sumptuous visual experience with parallax scrolling and high-resolution galleries that make the food look irresistible. Interactive elements, such as smooth hover effects on menu items, enhance user engagement and encourage exploration of the dining options. The responsive design ensures that the vibrant aesthetic and functionality remain consistent across mobile and desktop devices. ",
      },
    ],
    colors: {
      primary: ["#E8822D", "#801818", "#FBE7B2"],
      secondary: ["#483C32", "#8A3324"],
    },
    typography: [
      {
        id: 1,
        name: "Heading 01",
        size: "64",
      },
      {
        id: 2,
        name: "Heading 02",
        size: "40",
      },
      {
        id: 3,
        name: "Heading 03",
        size: "32",
      },
      {
        id: 4,
        name: "Heading 04",
        size: "24",
      },
      {
        id: 5,
        name: "Paragraph 01",
        size: "18",
      },
      {
        id: 6,
        name: "Paragraph 02",
        size: "16",
      },
    ],
    buttons: [
      {
        name: "READ MORE",
        type: "outline",
        bg: "",
        color: "white",
        border: "white",
      },
      {
        name: "",
        type: "arrow",
        bg: "",
        color: "white",
        border: "",
      },
    ],
    components: [
      "/images/case-studies/churassco/component-1.png",
      "/images/case-studies/churassco/component-2.png",
      "/images/case-studies/churassco/component-3.png",
      "/images/case-studies/churassco/component-4.png",
    ],
    sitemap: "/images/case-studies/churassco/churassco-sitemap.png",
    wireframe: "/images/case-studies/churassco/churassco-wireframe.png",
    website: "/images/case-studies/churassco/churassco-website.png",
  },
  {
    id: 2,
    slug: "royal-safari",
    banner: royal_safari_laptop,
    summary:
      "The project involved developing a visually rich digital platform that showcases Royal Safari's unique tour offerings and establishes them as a premium travel provider. The design strategy focused on creating an emotional connection with potential travelers through stunning visuals and an intuitive user interface. By combining adventurous elements with functional design, the website effectively bridges the gap between dreaming and booking.",
    goal: "The primary objective was to increase direct tour bookings by providing a user-friendly platform that highlights the beauty and exclusivity of the safaris. The design aimed to build credibility and trust through clear communication of itineraries and professional presentation of the safari guides. Ultimately, the site serves to convert visitors into customers by offering a glimpse into the adventure.",
    design_process: [
      {
        id: 1,
        name: "Understand",
        desc: "The design process focused on capturing the thrill and wonder of the African safari to attract international travelers and adventure seekers. The team needed to convey the raw beauty of wildlife and the exclusivity of the tour packages available. Understanding that the target audience seeks trust and excitement, the strategy prioritized immersive storytelling and a secure, professional booking environment.",
      },
      {
        id: 2,
        name: "Competitor Analysis",
        desc: "Analysis of the safari tourism market revealed that competitors often use cluttered layouts with generic stock photography that fails to evoke genuine emotion. The team identified a gap to differentiate by showcasing unique, high-quality authentic imagery and streamlining the itinerary browsing process. This insight led to a cleaner design that focuses on the experience rather than overwhelming the user with dense text.",
      },
      {
        id: 3,
        name: "Inspiration & Moodboard",
        desc: "The moodboard drew heavily from the golden hues of the African savanna at sunset, utilizing earthy tones like ochre, sienna, and deep greens. Visual cues included raw textures, topographic map lines, and bold typography reminiscent of vintage travel posters to evoke adventure. The aesthetic direction aimed to blend the ruggedness of the wild with a luxury travel feel that appeals to high-end explorers.",
      },
      {
        id: 4,
        name: "Wireframe",
        desc: "The wireframe structure centered on a full-screen visual experience, placing a captivating hero image at the forefront to immediately transport the user. The layout organized tour packages into clear card-based grids, allowing for easy comparison of itineraries, prices, and durations. This skeletal framework ensured that essential information like booking forms and contact details remained accessible without disrupting the visual flow.",
      },

      {
        id: 5,
        name: "Final UI",
        desc: "The final interface delivers an immersive experience with smooth transitions and parallax scrolling that simulates movement through the landscape. High-resolution galleries and interactive map elements allow users to explore destinations virtually before making a commitment. The responsive design maintains the exotic aesthetic across all devices, ensuring a seamless journey from inspiration to the final booking page.",
      },
    ],
    colors: {
      primary: ["#2CB775", "#EFEBDB", "#FBE7B2"],
      secondary: ["#FFFFFF", "#000000"],
    },
    typography: [
      {
        id: 1,
        name: "Heading 01",
        size: "64",
      },
      {
        id: 2,
        name: "Heading 02",
        size: "40",
      },
      {
        id: 3,
        name: "Heading 03",
        size: "32",
      },
      {
        id: 4,
        name: "Heading 04",
        size: "24",
      },
      {
        id: 5,
        name: "Paragraph 01",
        size: "18",
      },
      {
        id: 6,
        name: "Paragraph 02",
        size: "16",
      },
    ],
    buttons: [
      {
        name: "READ MORE",
        type: "outline",
        bg: "",
        color: "white",
        border: "white",
      },
      {
        name: "",
        type: "arrow",
        bg: "",
        color: "white",
        border: "",
      },
    ],
    components: [
      "/images/case-studies/royal-safari/component-1.png",
      "/images/case-studies/royal-safari/component-2.png",
      "/images/case-studies/royal-safari/component-3.png",
      "/images/case-studies/royal-safari/component-4.png",
    ],
    sitemap: "/images/case-studies/royal-safari/royal-safari-sitemap.png",
    wireframe: "/images/case-studies/royal-safari/royal-safari-wireframe.png",
    website: "/images/case-studies/royal-safari/royal-safari-website.png",
  },
  {
    id: 3,
    slug: "fabusiness",
    banner: fabusiness_laptop,
    summary:
      "The project focused on developing a professional digital platform for faaccountant.com to enhance the firm's online presence and credibility. The primary objective was to create a clean, user-friendly interface that effectively communicates complex accounting services to potential business clients. By prioritizing intuitive navigation and a trustworthy visual aesthetic, the design establishes a strong foundation for client engagement and lead generation.",
    goal: "The main goal was to build a responsive website that instills immediate trust and encourages visitors to initiate contact for financial consultation. The design team aimed to differentiate the firm from competitors by simplifying information architecture and emphasizing visual clarity. Ultimately, the project sought to convert site traffic into tangible business opportunities through a seamless, professional user experience.",
    design_process: [
      {
        id: 1,
        name: "Understand",
        desc: "The design phase started by identifying the client's need to project absolute reliability and professional authority to a business audience. The team focused on defining a brand identity that balances traditional financial stability with a modern, approachable digital presence. This foundational step ensured that every subsequent design decision would prioritize user trust and clear communication of complex accounting services effectively.",
      },
      {
        id: 2,
        name: "Competitor Analysis",
        desc: "The analysis revealed that many rival accounting websites suffer from dense layouts, confusing navigation, and an overload of technical jargon. The team identified a significant opportunity to differentiate by simplifying the user experience and prioritizing clarity over information density. This strategic insight allowed the designers to structure a site that offers intuitive navigation and a cleaner visual hierarchy compared to the market standard. ",
      },
      {
        id: 3,
        name: "Inspiration & Moodboard",
        desc: "Visual direction was established through a moodboard featuring deep navy blue tones to evoke security and gold accents for a touch of premium quality. Typography pairings were selected to mix classic serif headings with clean sans-serif body text, ensuring readability while maintaining a sophisticated air. The imagery strategy focused on abstract geometric shapes and professional office environments to create a mood of competence and modern efficiency. ",
      },
      {
        id: 4,
        name: "Wireframe",
        desc: "The structural layout was planned using low-fidelity wireframes to map out a clear user journey from the hero section to the contact form. Focus was placed on organizing the service grid and ensuring that navigation elements were positioned for maximum accessibility and logical flow. This blueprint phase stripped away color and style to verify that the fundamental user interface structure supported the site’s primary business goals effectively. ",
      },

      {
        id: 5,
        name: "Final UI",
        desc: "The high-fidelity design brings the concept to life with a polished interface featuring responsive grids and interactive hover states for better engagement. Generous white space is utilized throughout the layout to prevent visual clutter, ensuring the content remains the focal point. The final product is a seamless, professional website that functions smoothly across devices and successfully reinforces the firm's reputable brand image.",
      },
    ],
    colors: {
      primary: ["#BF954A", "#1C3557"],
      secondary: ["#6495ED", "#FFFFFF","#000000"],
    },
    typography: [
      {
        id: 1,
        name: "Heading 01",
        size: "64",
      },
      {
        id: 2,
        name: "Heading 02",
        size: "40",
      },
      {
        id: 3,
        name: "Heading 03",
        size: "32",
      },
      {
        id: 4,
        name: "Heading 04",
        size: "24",
      },
      {
        id: 5,
        name: "Paragraph 01",
        size: "18",
      },
      {
        id: 6,
        name: "Paragraph 02",
        size: "16",
      },
    ],
    buttons: [
      {
        name: "Contact Us",
        type: "fill",
        bg: "#BF954A",
        color: "white",
        border: "",
      },
      {
        name: "Know More",
        type: "outline",
        bg: "",
        color: "white",
        border: "white",
      },
    ],
    components: [
      "/images/case-studies/fabusiness/component-1.png",
      "/images/case-studies/fabusiness/component-2.png",
      "/images/case-studies/fabusiness/component-3.png",
      "/images/case-studies/fabusiness/component-4.png",
    ],
    sitemap: "/images/case-studies/fabusiness/fabusiness-sitemap.png",
    wireframe: "/images/case-studies/fabusiness/fabusiness-wireframe.png",
    website: "/images/case-studies/fabusiness/fabusiness-website.png",
  },
  
];
