import styled from 'styled-components'
import HolidayUniIcon from './HolidayUniIcon'
import { style } from 'd3'

// ESLint reports `fill` is missing, whereas it exists on an SVGProps type
export type SVGProps = React.SVGProps<SVGSVGElement> & {
  fill?: string
  height?: string | number
  width?: string | number
  gradientId?: string
  clickable?: boolean
}

export const UniIcon = ({ clickable, ...props }: SVGProps) => {
  if(props.style){
    props.style.verticalAlign = 'middle';
  }
  return (
  <Container clickable={clickable}>
    {HolidayUniIcon(props) !== null ? (
      <HolidayUniIcon {...props} />
    ) : (
      <svg {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
        <image width={props.width} height={props.height} href="/images/logo.png" />
      </svg>
    )}
  </Container>
  )
}

export const AiIcon = ({ clickable, ...props }: SVGProps) => {
  if(props.style){
    props.style.verticalAlign = 'middle';
  }
  return (
  <Container clickable={clickable}>
    {HolidayUniIcon(props) !== null ? (
      <HolidayUniIcon {...props} />
    ) : (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.5 110.5">
        <path
            d="M56.13,1.25a55,55,0,1,0,55,55A55,55,0,0,0,56.13,1.25Zm0,103.45a48.45,48.45,0,1,1,48.44-48.45A48.45,48.45,0,0,1,56.13,104.7Z"
            transform="translate(-0.88 -1)" style={{fill:"#ffffff",stroke:"#231f20",strokeMiterlimit: 10,strokeWidth: 0.5}} />
        <path
            d="M56.13,14.32A41.94,41.94,0,1,0,98.06,56.25,41.93,41.93,0,0,0,56.13,14.32ZM56.5,93A35.93,35.93,0,1,1,92.43,57.1,35.94,35.94,0,0,1,56.5,93Z"
            transform="translate(-0.88 -1)" style={{fill:"#fafbfb",stroke:"#231f20",strokeMiterlimit: 10,strokeWidth:  0.5}} />
        <path
            d="M33.88,38.67a2,2,0,0,1-1.48-3.34A32.6,32.6,0,0,1,51.24,25.05,2,2,0,0,1,51.88,29a28.54,28.54,0,0,0-16.51,9A2,2,0,0,1,33.88,38.67Z"
            transform="translate(-0.88 -1)" style={{fill:"#fafbfb",stroke:"#231f20",strokeMiterlimit: 10,strokeWidth: 0.5}} />
        <path
            d="M71.57,65a7.94,7.94,0,1,1,7.94-7.94A7.95,7.95,0,0,1,71.57,65Zm0-12.88a4.94,4.94,0,1,0,4.94,4.94A5,5,0,0,0,71.57,52.16Z"
            transform="translate(-0.88 -1)" style={{fill:"#43a08d"}} />
        <path
            d="M40.33,65a7.94,7.94,0,1,1,7.93-7.94A7.95,7.95,0,0,1,40.33,65Zm0-12.88a4.94,4.94,0,1,0,4.93,4.94A4.94,4.94,0,0,0,40.33,52.16Z"
            transform="translate(-0.88 -1)" style={{fill:"#43a08d"}} />
    </svg>

    )}
  </Container>
  )
}



const Container = styled.div<{ clickable?: boolean }>`
  position: relative;

  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'auto')};
`
