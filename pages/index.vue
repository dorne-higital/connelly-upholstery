<template>
    <div>
        <hero-main />

        <text-image-split :content="aboutUsContent" />

        <text-1-col 
            :content='{
                "theme": "dark",
                "align": "centre",
                "label": "",
                "heading": "","subheading": "Whatever your Domestic or Business Upholstery projects, large or small, we can offer a solution. With many fabrics and trimmings to choose from, we can cater your unique style and taste.",
                "description": "",
                "button": {
                    "text": "",
                    "url": "/"
                },
            }'
        />

        <text-image-icons-split :content="whatWeOfferContent" />

        <quote-carousel
            :content='{
                "theme": "color-1",
                "label": "Dont take our word for it",
                "heading": "Read what our customers have to say",
                "quotes": [
                    { 
                        text: "Absolutely fantastic service from Antonia and Michael, my couch and chair look fabulous just what I wanted and the workmanship that has gone into recovering them is amazing they look like they have just come from a furniture store. I can’t thank you enough once again absolutely fantastic. They even picked it up and then dropped it back off again, they removed their shoes and I didn’t even have to ask them I can’t praise them enough. Thank you so very very much", 
                        name: "Gillian H" 
                    },
                    { 
                        text: "Thank you so much for the amazing job you have done on my furniture it looks fabulous. You are lovely people to do business with and actually care about customer satsfaction. You were considerate to me from start to finish nothing was too much trouble for you and my furniture looks and feels like new. Thankyou so much.", 
                        name: "Jane F" 
                    },
                    { 
                        text: "Excellent and efficient service from Mike and his team. Would highly recommend.", 
                        name: "Dom R" 
                    },
                ]
            }'
        />

    </div>
</template>
  
<script>
    import buildingImage from '@/assets/images/building.jpg';
    import businessBooths from '@/assets/images/business-booths.jpeg';

    export default {
        data() {
            return {
                aboutUsContent: {
                    theme: "",
                    order: "image-text",
                    label: "Who we are",
                    heading: "Get to know us",
                    subheading: "",
                    description: "Connelly Upholstery is a family run business. The owner Michael has over 40 years experience in Upholstery. Time served in both Domestic and Business Upholstery including furniture repairs and Interiors, Michael has worked in several Upholstery businesses and also some large sofa chain stores gaining a raft of experience along the way",
                    button: {
                        text: "Learn more",
                        url: "/about"
                    },
                    image: {
                        src: buildingImage, // Use the imported image path
                        alt: "Image of the front of business"
                    }
                },
                whatWeOfferContent: {
                    theme: "",
                    order: "text-image",
                    label: "What we offer",
                    heading: "Some of what we provide",
                    subheading: "",
                    image: {
                        src: businessBooths, // Use the imported image path
                        alt: "Image of upholstered booths"
                    },
                    cards: [
                        {
                            icon: "icon-home",
                            title: "Domestic Upholstery",
                            description: "",
                        },
                        {
                            icon: "icon-business",
                            title: "Business Upholstery",
                            description: "",
                        },
                        {
                            icon: "icon-repair",
                            title: "Repairs",
                            description: "",
                        },
                        {
                            icon: "icon-chair",
                            title: "Foam Interiors",
                            description: "",
                        }
                    ],
                }
            }
        }
    }
</script>
  