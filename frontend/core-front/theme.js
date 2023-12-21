import { extendTheme, withDefaultProps } from "@chakra-ui/react";
import "@fontsource/lexend"
import "@fontsource/lalezar"


const theme = extendTheme({
    fonts: {
        body: "Lexend",
        heading: "Lexend"
    },
    colors: {
        brand: '#2860e2',
        brandInactive: '#6085db',
        neutral: '#EFF1EE',
        darkerNeutral: '#666666',
        gray: '#CBD5E0',
        blackAlpha: 'RGBA(0, 0, 0, 0.24)',
        whiteAlpha: 'RGBA(255, 255, 255, 0.16)',
        hoverWhiteAlpha: 'RGBA(255, 255, 255, 0.36)'
    },
    styles: {
        global: {
            body: {
                minWidth: '300px', 
                overflowX: 'hidden'
            },
            section: {
                maxW: '1400px',
                m: 'auto',
                px: 2
            },

        }
    },
    components: {
        Heading: {
            baseStyle: {
                textTransform: 'capitalize'
            }
        },
        Text: {
            baseStyle: {
                textTransform: 'capitalize'
            }
        },
    }
})

export default theme