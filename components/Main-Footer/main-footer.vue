<template>
    <section class="footer_section">
        <div class="company_info">
            <h5>Where to find us</h5>

            <p>Address line 1</p>

            <p>Address line 2</p>

            <p>Postcode</p>

            <h5>How to reach us</h5>

            <p>Tel: <span>0123456789</span></p>

            <p>Email: <span>email@email.com</span></p>
        </div>

        <div class="quick_links">
            <h5>Useful Links</h5>

            <ul>
                <li>
                    <a href="/about">About</a>
                </li>
                <li>
                    <a href="/galley">Gallery</a>
                </li>
                <li>
                    <a href="/process">Our Process</a>
                </li>
                <li>
                    <a href="/contact">Contact</a>
                </li>
            </ul>
        </div>

        <div class="contact_info">
            <h5>Opening hours</h5>

            <ul class="hours">
                <li>
                    <p>Monday</p>
                    <p>Closed</p>
                </li>
                <li>
                    <p>Tuesday</p>
                    <p>Closed</p>
                </li>
                <li>
                    <p>Wednesday</p>
                    <p>10:00 - 18:00</p>
                </li>
                <li>
                    <p>Thursday</p>
                    <p>10:00 - 18:00</p>
                </li>
                <li>
                    <p>Friday</p>
                    <p>10:00 - 18:00</p>
                </li>
                <li>
                    <p>Saturday</p>
                    <p>10:00 - 18:00</p>
                </li>
                <li>
                    <p>Sunday</p>
                    <p>10:00 - 18:00</p>
                </li>
            </ul>
        </div>

        <div class="legal_info">
            <p>Copyright Connelly Upholstery 2024</p>
        </div>
    </section>
</template>

<script>

export default {
    name: 'mainFooter',
    components: {
    },
    data() {
        return {
        };
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
    @import "~/assets/css/main.scss";
    
    .footer_section {
        background-color: $color-3;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 5rem;
        justify-content: center;
        padding: 4rem 10rem;
        width: 100vw;
        z-index: 99;

        h5 {
            border-bottom: 1px solid $primary-color;
            padding: .5rem 0;
            width: fit-content;

            @media only screen and (max-width: 600px) {
                width: 100%;
            }
        }

        @media only screen and (max-width: 600px) {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem
        }

        .company_info {
            flex: 1;

            p {
                margin-bottom: .5rem;
            }
        }

        .quick_links {
            flex: 1;

            ul {
                @media only screen and (max-width: 600px) {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        width: 50%;
                    }
                }
            }

            li {
                padding: .5rem 0;

                a {
                    font-weight: 400;
                }
            }
        }

        .contact_info {
            flex: 1;

            .hours {
                li {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;

                    p {
                        margin-bottom: .2rem;
                    }
                }
            }
        }

        .legal_info {
            border-top: 1px solid;
            padding: 2rem;
            text-align: center;
            width: 100%;
        }
    }
</style>