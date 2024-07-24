<template>
    <div>
      <hero-main />
  
      <text-image-split :content="aboutUsContent" />
    </div>
  </template>
  
  <script>
    import buildingImage from '@/assets/images/building.jpg'; // Adjust the path as necessary
    
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
                        alt: ""
                    }
                }
            }
        }
    }
  </script>
  