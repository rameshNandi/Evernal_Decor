export interface Product {
  id: number
  name: string
  image: string
  price: string
  link: string
}

export interface TransformationDetail {
  id: number
  title: string
  beforeImage: string
  afterImage: string
  challenge: string
  result: string
  client: string
  rating: number
  floorPlan: string
  moodboard: string
  finalDesign: string
  productList: Product[]
}

export const transformations: TransformationDetail[] = [

  
{
  id: 1,
  title: "Modern Coastal Living Room and Bedroom Makeover",
  beforeImage: "/beforeafter/sections1/before_1.webp",
  afterImage: "/beforeafter/sections1/after_1.webp",
  challenge: "After moving into our new flat, we quickly realized the bedroom didn’t feel restful. It was either too empty or too sterile. We craved a calm, minimal space to sleep, but one that still had a sense of warmth and personality.",
  result: `"The design nailed our aesthetic completely. It brought in soft textures, warm tones, and subtle lighting that added comfort in a way we never thought possible. Now, it’s the first room we go to when we need to recharge."`,
  client: "Rohit",
  rating: 4,

  finalDesignBedroom: [
    "/beforeafter/sections2/before_1.webp",
    "/beforeafter/sections5/before_1.webp",
    "/beforeafter/sections2/before_1.webp"
  ],
  finalDesignDining: [
    "/beforeafter/sections1/dining_final1.png",
    "/beforeafter/sections1/dining_final2.png",
    "/beforeafter/sections1/dining_final3.png"
  ],

  questionnaire: {
    overallBudget: "Moderate",
    rooms: [
      {
        roomLabel: "Master Bedroom",
        roomType: "Bedroom",
        wantsToFocusOn: "Want the room to feel more serene/modern/warm/coastal",
        likedInspoImages: "Neutral",
        currentDislikes: "Other side of the cabinetry should be covered. Not clean and not fitting with rest of the room.",
        openToChangeLayout: "Yes",
        flooringPreference: "No preference",
        carpetChange: "No, wood",
        additionalComments: "Bed should be centered on that wall. I'd like a small chair or bench. Maybe a corner ceiling light in window area. Would love art. Mirrors ok."
      },
      {
        roomLabel: "Living/Dining Room",
        roomType: "Living/Dining",
        wantsToFocusOn: "Living Room to feel more serene/modern/warm/coastal",
        likedInspoImages: "Other",
        currentDislikes: "The sideboard is too dark and the wood tone is improper. It and maybe the layout need to be changed.",
        openToChangeLayout: "Yes",
        flooringPreference: "No preference",
        carpetChange: "No, wood",
        additionalComments: `We want the overall styling to feel light/serene/warm, but still feel grounded/structured, not shiny and sterile.
The room is tricky because it's open concept, and we need the living and dining zones to be defined. But we also want to keep things visually open.
We would like to keep the doors in all rooms and the glass doors in dry store.`
      }
    ]
  },

  finalPackageFloorplan: {
    title: "Master Bedroom Floorplan",
    image: "/images/Online-Designer-Bedroom-Floorplan.webp",
    legend: [
      "King Platform Bed (Panel and Nightstands)",
      "Enhanced Wood Flooring",
      "Cozy Abstract Area Rug",
      "BLACK CIRCLE SCONES",
      "NIGHTSTAND LAMPS",
      "Tufted Storage Bench",
      "Wallpaper Accent Wall",
      "Wall Mounted Sconces",
      "Framed Coastal Wall Art Decor",
      "Indoor Potted Palm Tree",
      "Rattan Woven Storage Basket Set",
      "Modern Tufted Lounge Chair",
      "Accent Throw Pillows + Woven Throw Blanket",
      "Black Framed Art 24\" x 27\" Wide with Mat",
      "Woven Blanket Storage Basket",
      "Storage Cabinet with Glass Doors",
      "Fold-Down Stack Closet Line - Left",
      "Fold-Down Stack Closet Line - Right",
      "Full Height Shelf Closet Line",
      "Integrated Storage Peg-In Cubbie Shelf"
    ]
  },

  // New floorplan section added
  livingDiningFloorplanWithLegend: {
    title: "Living/Dining Room Floorplan",
    image: "/images/Online-Designer-Combined-LivingDining-Floorplan.webp", // You should upload and replace this with actual path
    legend: [
      "Heine Modular Sofa",
      "Tharo Side Table",
      "Altus Wood Floor Lamp",
      "Hanging Rattan Chair",
      "Solid Linen Pouf 24\" x 24\" x 13\"",
      "Durtan Pouf 16\" x 16\"",
      "Nest Round Indoor Chair With Cushion",
      "Roca & Rattan® Layered Rachelong Drum",
      "Fairwike Reclaimed Wood Coffee Table",
      "Summit II Rug 8' x 10'",
      "Chord Woven Bark Dining Chair",
      "Sleek Oak Dining Table",
      "Cultivo Geometric Wood Wall Art",
      "Two-Tiered Embrik Metal Baskets (Set of 3)",
      "Handwoven Block Wall Art - Set of 4",
      "Print: “Planet Fits the Moon”",
      "Helena Pillow 16\" x 20\" Down",
      "Tov Pillow 20\" x 20\" Down",
      "Breece Block 7'L x 7'W Wallpaper Roll",
      "Khadi Hand Woven Accent Pillow"
    ]
  },

  masterBedroomIdeas1: {
    title: "Master Bedroom Interior Design Ideas",
    mainImage: "/images/master-bedroom-ideas-collage.webp",
    thumbnails: []
  },

  livingDining3DModel1: {
    title: "Master Bedroom interior Design ideas",
    mainImage: "/images/Online-Designer-Bedroom-Interior-Design-Ideas.webp"
  },

  livingDining3DModel2: {
    title: "Living/Dining Room Interior Design - 3D Model",
    mainImage: "/images/Online-Designer-Combined-LivingDining-3D-Model-3.webp",
    thumbnails: [
      "/images/Online-Designer-Combined-LivingDining-3D-Model-3.webp",
      "/beforeafter/sections2/after_1.webp",
      "/images/Online-Designer-Combined-LivingDining-3D-Model-3.webp"
    ]
  }
},




  {
    id: 2,
    title: "Glamorous and Elegant Home Interior Design",
    beforeImage: "/beforeafter/sections2/before_1.webp",
    afterImage: "/beforeafter/sections2/after_1.webp",
    challenge: "Our living room was always crowded with mismatched furniture and lacked natural light. I wanted it to feel fresh, open, and modern without losing that cozy, lived-in charm that makes a house feel like home.",
    result: `"Now, it feels like we’re walking into a Pinterest board—airy, bright, and beautifully styled. It’s become our favorite hangout spot, and guests often compliment how welcoming the space feels."`,
    client: "Riya",
    rating: 5,
    floorPlan: "/beforeafter/sections2/floorplan.png",
    moodboard: "/beforeafter/sections2/moodboard.png",
    finalDesign: "/beforeafter/sections2/finaldesign.png",
    productList: []
  },

  {
    id: 3,
    title: "Blue & White Kitchen & Rustic Home Design",
    beforeImage: "/beforeafter/sections3/before_1.webp",
    afterImage: "/beforeafter/sections3/after_1.webp",
    challenge: "We are currently building our new home and have a blank slate. I need help visualizing and mixing our different styles into one cohesive design.",
    result: `"I'm truly amazed how my 3D renderings turned out! Each room combines all of our tastes and makes the house feel like a home."`,
    client: "Jaklyn",
    rating: 3,
    floorPlan: "/beforeafter/sections3/floorplan.png",
    moodboard: "/beforeafter/sections3/moodboard.png",
    finalDesign: "/beforeafter/sections3/finaldesign.png",
    productList: []
  },

  {
    id: 4,
    title: "Eclectic Formal Living Room Interior Design",
    beforeImage: "/beforeafter/sections4/before_1.webp",
    afterImage: "/beforeafter/sections4/after_1.webp",
    challenge: "I had recently started working remotely and needed a home office setup. But I didn’t want it to feel too corporate or detached from the rest of my home’s style.",
    result: `"The new design gave me a workspace that inspires creativity. It blends perfectly with my home’s vibe while giving me all the practicality I need to stay productive."`,
    client: "Neha",
    rating: 4,
    floorPlan: "/beforeafter/sections4/floorplan.png",
    moodboard: "/beforeafter/sections4/moodboard.png",
    finalDesign: "/beforeafter/sections4/finaldesign.png",
    productList: []
  },

  {
    id: 5,
    title: "Spa-Inspired Master Bathroom Design",
    beforeImage: "/beforeafter/sections5/before_1.webp",
    afterImage: "/beforeafter/sections5/after_1.webp",
    challenge:  "Our kitchen hadn’t been renovated in over 20 years. It was cramped, outdated, and lacked any real functionality. We wanted something modern but with a timeless feel.",
    result: `"The end result was better than anything we imagined. Clean lines, clever storage, and a calming color palette gave our kitchen new life. Cooking feels effortless now."`,
    client: "Kabir",
    rating: 3,
    floorPlan: "/beforeafter/sections5/floorplan.png",
    moodboard: "/beforeafter/sections5/moodboard.png",
    finalDesign: "/beforeafter/sections5/finaldesign.png",
    productList: []
  },

  {
    id: 6,
    title: "His and Hers Home Office Design",
    beforeImage: "/beforeafter/sections6/before_1.webp",
    afterImage: "/beforeafter/sections6/after_1.webp",
    challenge: "I’ve always loved traditional Indian decor, but I also admire minimalist aesthetics. I didn’t know how to combine both without the space feeling confused.",
    result: `"What we ended up with was a perfect blend—elegant wood textures and soft neutral tones accented with handcrafted pieces. The home feels rooted yet refreshingly modern"`,
    client: "Ishita",
    rating: 5,
    floorPlan: "/beforeafter/sections6/floorplan.png",
    moodboard: "/beforeafter/sections6/moodboard.png",
    finalDesign: "/beforeafter/sections6/finaldesign.png",
    productList: []
  },

  {
    id: 7,
    title: "Black and White Living/Dining & Kitchen Design",
    beforeImage: "/beforeafter/sections7/before_1.webp",
    afterImage: "/beforeafter/sections7/after_1.webp",
    challenge: "We had a spare room that we never used. My parents were visiting from Delhi soon, and I wanted to turn it into a proper guest room—something cozy, functional, and peaceful.",
    result: `"Now it’s the most serene space in the house. My parents absolutely loved it, and we often find ourselves lounging there with a book. It’s no longer a forgotten room."`,
    client: " Aarav",
    rating: 4,
    floorPlan: "/beforeafter/sections7/floorplan.png",
    moodboard: "/beforeafter/sections7/moodboard.png",
    finalDesign: "/beforeafter/sections7/finaldesign.png",
    productList: []
  },

  {
    id: 8,
    title: "Sleek & Warm Apartment Design",
    beforeImage: "/beforeafter/sections8/before_1.webp",
    afterImage: "/beforeafter/sections8/after_1.webp",
    challenge: "Our house felt too plain. It didn’t reflect who we were as a family. I wanted to inject more personality into the space—something bold, yet tasteful.",
    result: `"Now, each room has a distinct story. From curated art to personalized shelves, everything feels intentional. It finally feels like our home, not just a rental."`,
    client: "Meera",
    rating: 5,
    floorPlan: "/beforeafter/sections8/floorplan.png",
    moodboard: "/beforeafter/sections8/moodboard.png",
    finalDesign: "/beforeafter/sections8/finaldesign.png",
    productList: []
  },

  {
    id: 9,
    title: "New Build Modern Home Design",
    beforeImage: "/beforeafter/sections9/before_1.webp",
    afterImage: "/beforeafter/sections9/after_1.webp",
    challenge: "With our first baby on the way, we wanted to prepare a nursery. But we didn’t want the space to look overly childish or temporary—it needed to evolve with time",
    result: `"TThe design is playful yet elegant. With calming tones, safe furniture, and thoughtful lighting, it’s perfect for a baby now and still adaptable as she grows older."`,
    client: "Pijush",
    rating: 4,
    floorPlan: "/beforeafter/sections9/floorplan.png",
    moodboard: "/beforeafter/sections9/moodboard.png",
    finalDesign: "/beforeafter/sections9/finaldesign.png",
    productList: []
  },

  {
    id: 10,
    title: "Natural Eclectic Cosmetic Store Interior",
    beforeImage: "/beforeafter/sections10/before_1.webp",
    afterImage: "/beforeafter/sections10/after_1.webp",
    challenge: "We were on a tight budget after buying our first home. Still, we didn’t want to settle for generic or low-quality design. We hoped someone could create magic within our means.",
    result: `"What we got looked anything but budget-friendly. The space feels luxurious thanks to smart material choices and creative styling. Every rupee was put to good use—and it shows."`,
    client: "Dev",
    rating: 3,
    floorPlan: "/beforeafter/sections10/floorplan.png",
    moodboard: "/beforeafter/sections10/moodboard.png",
    finalDesign: "/beforeafter/sections10/finaldesign.png",
    productList: []
  }
]
